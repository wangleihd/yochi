/**
 * 支付宝 RSA2 签名 / 验签（Web Crypto 实现，兼容 Node 与 Cloudflare Workers）
 *
 * 私钥格式要求：PKCS8 PEM（-----BEGIN PRIVATE KEY-----）
 * 支付宝公钥格式：SPKI PEM（-----BEGIN PUBLIC KEY-----）
 */

const TE = new TextEncoder();

function pemToBuffer(pem, head, tail) {
  const body = pem
    .replace(head, "")
    .replace(tail, "")
    .replace(/\s+/g, "");
  const bin = atob(body);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

function bufferToBase64(buf) {
  let bin = "";
  const arr = new Uint8Array(buf);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin);
}

function base64ToBuffer(b64) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

async function importPrivateKey(pem) {
  return crypto.subtle.importKey(
    "pkcs8",
    pemToBuffer(pem, "-----BEGIN PRIVATE KEY-----", "-----END PRIVATE KEY-----"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function importPublicKey(pem) {
  return crypto.subtle.importKey(
    "spki",
    pemToBuffer(pem, "-----BEGIN PUBLIC KEY-----", "-----END PUBLIC KEY-----"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
}

/**
 * 组装待签名串：按 key 字典序拼接 key=value&...
 * 支付宝规则：仅排除 sign 参数，sign_type 参与签名（网关按此规则验签）
 */
export function buildSignContent(params) {
  return Object.keys(params)
    .filter((k) => k !== "sign" && params[k] !== undefined && params[k] !== "")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
}

/** RSA2 签名，返回 base64 签名 */
export async function signContent(content, privateKeyPem) {
  const key = await importPrivateKey(privateKeyPem);
  const sig = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    TE.encode(content)
  );
  return bufferToBase64(sig);
}

/** RSA2 验签，返回 boolean */
export async function verifyContent(content, signB64, publicKeyPem) {
  const key = await importPublicKey(publicKeyPem);
  return crypto.subtle.verify(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    base64ToBuffer(signB64),
    TE.encode(content)
  );
}

/** 对参数集签名（自动处理排序），返回 { content, sign } */
export async function signParams(params, privateKeyPem) {
  const content = buildSignContent(params);
  const sign = await signContent(content, privateKeyPem);
  return { content, sign };
}

/** 验签参数集（params 需含 sign） */
export async function verifyParams(params, publicKeyPem) {
  if (!params?.sign) return false;
  const content = buildSignContent(params);
  return verifyContent(content, params.sign, publicKeyPem);
}

/**
 * 生成支付宝网关跳转 URL（alipay.trade.page.pay 电脑网页支付）
 */
export function buildGatewayUrl(params, sign, gateway) {
  const qs = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== "")
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  return `${gateway}?${qs}&sign=${encodeURIComponent(sign)}`;
}
