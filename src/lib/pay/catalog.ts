import { PLANS, WRITE_PACKS, IMAGE_PACKS } from "@/lib/pricing";
import type { BillingCycle, OrderItem } from "@/lib/pay/types";

/** 由套餐 id + 计费周期生成订单商品 */
export function planToItem(
  planId: string,
  billing: BillingCycle
): OrderItem | null {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return null;
  const price = billing === "yearly" ? plan.yearly : plan.monthly;
  return {
    kind: "plan",
    id: plan.id,
    name: `${plan.name}（${plan.nameEn}）`,
    periodLabel: billing === "yearly" ? "年付 · 付 10 用 12" : "月付 · 随时取消",
    price,
    priceText: price === 0 ? "免费" : `¥${price.toLocaleString()}`,
  };
}

/** 由次数包 id 生成订单商品（写文 / 生图） */
export function packToItem(packId: string): OrderItem | null {
  const write = WRITE_PACKS.find((p) => p.id === packId);
  if (write) {
    return {
      kind: "write-pack",
      id: write.id,
      name: `${write.count} 次写文包`,
      periodLabel: "12 个月有效",
      price: write.price,
      priceText: `¥${write.price}`,
    };
  }
  const image = IMAGE_PACKS.find((p) => p.id === packId);
  if (image) {
    return {
      kind: "image-pack",
      id: image.id,
      name: `${image.count} 张生图包`,
      periodLabel: "12 个月有效",
      price: image.price,
      priceText: `¥${image.price}`,
    };
  }
  return null;
}
