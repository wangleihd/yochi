/**
 * 通用工具：响应格式化、订单号、金额
 */

export function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function genOrderNo() {
  const d = new Date();
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  const ts = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `YC${ts}${rand}`;
}

/** 读取请求 JSON（容错） */
export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
