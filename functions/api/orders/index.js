/**
 * POST /api/orders 创建订单（支付宝电脑网页支付）
 * body: { item: {kind,id,name,periodLabel,price}, contact: {email,phone}, method: "alipay"|"wechat" }
 */
import { json, genOrderNo, readJson } from "../lib/util.js";
import { createPagePay } from "../lib/alipay-service.js";

export async function onRequestPost(context) {
  const body = await readJson(context.request);
  if (!body) return json(400, { message: "请求体不是合法 JSON" });

  const { item, contact, method } = body;
  if (!item || item.price == null || !contact?.email) {
    return json(400, { message: "参数不完整：缺少商品或联系邮箱" });
  }
  if (!["alipay", "wechat"].includes(method)) {
    return json(400, { message: "不支持的支付方式" });
  }

  const orderNo = genOrderNo();
  const subject = `${item.name}（${item.periodLabel}）`;

  if (method === "wechat") {
    return json(501, { message: "微信支付暂未开通，请使用支付宝完成支付" });
  }

  try {
    const redirectUrl = await createPagePay(
      {
        outTradeNo: orderNo,
        totalAmount: Number(item.price).toFixed(2),
        subject,
        // 通过 passback_params 随订单透传，支付回调时用于开通权益
        passbackParams: {
          email: contact.email,
          phone: contact.phone || "",
          itemId: item.id,
          itemKind: item.kind,
          itemName: item.name,
          periodLabel: item.periodLabel,
        },
      },
      context.env
    );

    const order = {
      orderNo,
      item,
      contact,
      method,
      amount: Number(item.price),
      status: "created",
      createdAt: new Date().toISOString(),
      expiresInMin: 15,
      payParams: { redirectUrl },
    };
    return json(200, { order });
  } catch (err) {
    console.error("[orders] 支付宝下单失败:", err.message);
    return json(502, { message: err.message || "下单失败，请稍后重试" });
  }
}
