import { Router } from "express";
import { genOrderNo, createOrderRecord, getOrderRecord } from "../lib/store.js";
import { createAlipayPrecreate } from "../lib/alipay.js";
import { createWechatNative } from "../lib/wechat.js";

const router = Router();

/**
 * POST /api/orders  创建订单
 * body: { item: {kind,id,name,periodLabel,price}, contact: {email,phone}, method: "alipay"|"wechat" }
 */
router.post("/", async (req, res) => {
  try {
    const { item, contact, method } = req.body || {};
    if (!item || !item.price == null || !contact?.email || !["alipay", "wechat"].includes(method)) {
      return res.status(400).json({ message: "参数不完整" });
    }

    const orderNo = genOrderNo();
    const amountYuan = Number(item.price).toFixed(2);
    const amountFen = Math.round(Number(item.price) * 100);
    const subject = `${item.name}（${item.periodLabel}）`;

    const record = {
      orderNo,
      item,
      contact,
      method,
      amount: Number(item.price),
      status: "created",
      createdAt: new Date().toISOString(),
      expiresInMin: 15,
    };

    // 调用支付渠道下单，获取二维码内容
    if (method === "alipay") {
      const qrCode = await createAlipayPrecreate({
        outTradeNo: orderNo,
        totalAmount: amountYuan,
        subject,
      });
      record.payParams = { qrContent: qrCode };
    } else {
      const codeUrl = await createWechatNative({
        outTradeNo: orderNo,
        amountFen,
        description: subject,
      });
      record.payParams = { qrContent: codeUrl };
    }

    createOrderRecord(record);
    return res.json({ order: record });
  } catch (err) {
    console.error("[orders] 创建订单失败:", err.message);
    return res.status(502).json({ message: err.message || "下单失败" });
  }
});

/** GET /api/orders/:orderNo  查询订单 */
router.get("/:orderNo", (req, res) => {
  const order = getOrderRecord(req.params.orderNo);
  if (!order) return res.status(404).json({ message: "订单不存在" });
  return res.json({ orderNo: order.orderNo, status: order.status, amount: order.amount });
});

export default router;
