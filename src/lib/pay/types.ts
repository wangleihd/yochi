/** 支付相关类型定义 */

/** 支付方式 */
export type PayMethod = "alipay" | "wechat";

/** 商品类型 */
export type ItemKind = "plan" | "write-pack" | "image-pack";

/** 计费周期 */
export type BillingCycle = "monthly" | "yearly";

/** 订单商品 */
export type OrderItem = {
  kind: ItemKind;
  /** 商品 id（套餐 id 或次数包 id） */
  id: string;
  /** 商品名称，如「专业版」「100 次写文包」 */
  name: string;
  /** 周期标签，如「月付」「年付」「12 个月有效」 */
  periodLabel: string;
  /** 单价（元） */
  price: number;
  /** 展示用金额字符串 */
  priceText: string;
};

/** 联系信息 */
export type ContactInfo = {
  email: string;
  phone: string;
};

/** 订单 */
export type Order = {
  orderNo: string;
  item: OrderItem;
  contact: ContactInfo;
  method: PayMethod;
  /** 订单金额（元） */
  amount: number;
  /** 创建时间 */
  createdAt: string;
  /** 有效期（分钟） */
  expiresInMin: number;
  /** 真实支付参数（后端下单返回） */
  payParams?: {
    /** 支付二维码内容（微信 NATIVE code_url / 支付宝 precreate qr_code） */
    qrContent?: string;
    /** 跳转收银台地址（支付宝 page.pay） */
    redirectUrl?: string;
  };
};

/** 订单状态 */
export type OrderStatus = "created" | "paid" | "failed" | "cancelled";

/** 支付结果 */
export type PayResult = {
  status: OrderStatus;
  orderNo: string;
  paidAt?: string;
};
