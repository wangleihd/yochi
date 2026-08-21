import { Router } from "express";
import { verifyAlipayNotify } from "../lib/alipay.js";
import { verifyWechatNotify, decryptWechatResource } from "../lib/wechat.js";
import { getOrderRecord, updateOrderStatus } from "../lib/store.js";

const router = Router();

/** 支付宝异步通知 */
router.post("/alipay/notify", async (req, res) => {
  try {
    const params = req.body ?? {};
    const ok = verifyAlipayNotify(params);
    if (!ok) {
      console.warn("[alipay] 回调验签失败");
      return res.send("failure");
    }
    if (params.trade_status === "TRADE_SUCCESS" || params.trade_status === "TRADE_FINISHED") {
      updateOrderStatus(params.out_trade_no, "paid", {
        tradeNo: params.trade_no,
        paidAt: new Date().toISOString(),
      });
      console.log(`[alipay] 订单 ${params.out_trade_no} 支付成功`);
    }
    // 必须原样返回 success，否则支付宝会重试
    return res.send("success");
  } catch (err) {
    console.error("[alipay] 回调处理失败:", err.message);
    return res.send("failure");
  }
});

/** 微信支付回调（v3） */
router.post("/wechat/notify", async (req, res) => {
  try {
    const bodyStr = req.rawBody ?? JSON.stringify(req.body ?? {});
    const { signature, timestamp, nonce } = req.headers;
    const ok = verifyWechatNotify(bodyStr, { signature, timestamp, nonce });
    if (!ok) {
      console.warn("[wechat] 回调验签失败");
      return res.status(401).json({ code: "FAIL", message: "验签失败" });
    }
    const resource = req.body?.resource;
    if (!resource) return res.status(400).json({ code: "FAIL", message: "缺少 resource" });
    const event = decryptWechatResource(resource);
    // event.event_type: TRANSACTION.SUCCESS 等；event.resource 为解密后的交易数据
    const trade = event.resource ?? event;
    if (event.event_type === "TRANSACTION.SUCCESS" && trade.out_trade_no) {
      updateOrderStatus(trade.out_trade_no, "paid", {
        tradeNo: trade.transaction_id,
        paidAt: new Date().toISOString(),
      });
      console.log(`[wechat] 订单 ${trade.out_trade_no} 支付成功`);
    }
    return res.status(200).json({ code: "SUCCESS", message: "成功" });
  } catch (err) {
    console.error("[wechat] 回调处理失败:", err.message);
    return res.status(500).json({ code: "FAIL", message: "处理失败" });
  }
});

export default router;
