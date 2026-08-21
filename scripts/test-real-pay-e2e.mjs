// 真实支付链路端到端验证（CDP 驱动真实 Chrome）
// 流程：pay 页 → 填邮箱 → 提交订单 → 跳转 mock 支付宝收银台 → 支付 → 回跳 → 轮询 → 结果页
const CDP_PORT = 9225;
const START_URL = "http://127.0.0.1:8799/yochi/pay?plan=pro&billing=yearly";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(500);
  }
  throw new Error("CDP 端口未就绪");
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        this.pending.get(msg.id)(msg);
        this.pending.delete(msg.id);
      }
    };
  }
  async open() {
    await new Promise((r) => (this.ws.onopen = r));
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve) => {
      this.pending.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.result?.exceptionDetails) {
      throw new Error("eval 异常: " + JSON.stringify(res.result.exceptionDetails).slice(0, 300));
    }
    return res.result?.result?.value;
  }
}

async function waitUrl(cdp, keyword, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const u = await cdp.eval("location.href");
    if (u && u.includes(keyword)) return u;
    await sleep(700);
  }
  return null;
}

async function waitText(cdp, text, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ok = await cdp.eval(`document.body.textContent.includes(${JSON.stringify(text)})`);
    if (ok) return true;
    await sleep(700);
  }
  return false;
}

async function main() {
  const wsUrl = await getWsUrl();
  const cdp = new CDP(wsUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  const results = [];
  const check = (name, cond, extra = "") => results.push(`${cond ? "✅" : "❌"} ${name}${extra}`);

  // 1. 打开支付页（真实模式）
  await cdp.send("Page.navigate", { url: START_URL });
  await waitText(cdp, "填写联系信息");
  check("支付页加载（真实模式，直达联系信息步）", true);

  // 2. 填邮箱 + 勾协议 + 下一步
  await cdp.eval(`(() => {
    const input = document.getElementById('pay-email');
    if (!input) return false;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, 'e2e@test.com');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  await cdp.eval(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.getAttribute('role')==='checkbox'); if (b) b.click(); return true; })()`);
  await cdp.eval(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes('下一步：确认订单')); if (b) b.click(); return true; })()`);
  await waitText(cdp, "选择支付方式");
  check("进入确认订单步", true);

  // 3. 提交订单（真实支付宝跳转）
  await cdp.eval(`(() => { const b = [...document.querySelectorAll('button')].find(x => x.textContent.includes('提交订单并前往支付宝')); if (b) b.click(); return true; })()`);

  // 4. 应跳转到 mock 支付宝收银台
  const gwUrl = await waitUrl(cdp, "127.0.0.1:8899", 15000);
  check("跳转到支付宝收银台", !!gwUrl, gwUrl ? ` (${gwUrl.slice(0, 60)}...)` : "");
  if (gwUrl) {
    const t = await waitText(cdp, "支付宝收银台");
    check("收银台页面显示", t);
    const amt = await cdp.eval(`document.body.textContent.includes('¥4990.00')`);
    check("收银台金额 ¥4,990", amt);
    const orderNo = await cdp.eval(`(document.body.textContent.match(/订单号：([A-Z0-9]+)/) || [])[1] || ''`);
    check("收银台订单号", /^YC\d{18}$/.test(orderNo), ` (${orderNo})`);

    // 5. 点击模拟支付成功
    await cdp.eval(`(() => { const b = document.getElementById('pay'); if (b) b.click(); return !!b; })()`);
  }

  // 6. 回跳到前端结果页（alipayReturn）
  const backUrl = await waitUrl(cdp, "alipayReturn=1", 15000);
  check("回跳前端结果页", !!backUrl, backUrl ? ` (${decodeURIComponent(backUrl).slice(0, 100)})` : "");

  // 7. 前端轮询后端确认 → 支付成功
  const success = await waitText(cdp, "你的订单已确认", 30000);
  check("结果页显示支付成功", success);
  const emailShown = await cdp.eval(`document.body.textContent.includes('e2e@test.com')`);
  check("结果页显示开通邮箱", emailShown);
  const diag = await cdp.eval(`JSON.stringify({
    hasEmail: document.body.textContent.includes('e2e@test.com'),
    ss: sessionStorage.getItem('yochi_order'),
    body: document.body.textContent.slice(0, 600)
  })`);
  console.log("--- 诊断:", diag);

  console.log(results.join("\n"));
  const failed = results.filter((r) => r.startsWith("❌")).length;
  console.log(failed === 0 ? "\n真实支付链路全部通过 ✅" : `\n${failed} 项失败 ❌`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("测试失败:", e.message);
  process.exit(1);
});
// 诊断：结果页实际内容
