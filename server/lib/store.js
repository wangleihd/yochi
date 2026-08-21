/**
 * 订单存储（内存实现，仅供演示 / 联调）
 * 生产环境请替换为数据库（如 MySQL / PostgreSQL / Redis），并在回调中持久化状态。
 */
const orders = new Map();

export function createOrderRecord(order) {
  orders.set(order.orderNo, order);
  return order;
}

export function getOrderRecord(orderNo) {
  return orders.get(orderNo);
}

export function updateOrderStatus(orderNo, status, extra = {}) {
  const order = orders.get(orderNo);
  if (!order) return null;
  Object.assign(order, { status, ...extra });
  return order;
}

export function genOrderNo() {
  const d = new Date();
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  const ts = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `YC${ts}${rand}`;
}
