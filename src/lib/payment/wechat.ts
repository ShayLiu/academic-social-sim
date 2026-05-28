import crypto from 'crypto'

// 微信支付需要商户证书等复杂配置，提供基础封装
// 正式接入时需替换为完整的 wechatpay-node-v3 SDK

const MCH_ID = process.env.WECHAT_MCH_ID || ''
const SERIAL_NO = process.env.WECHAT_SERIAL_NO || ''
const PRIVATE_KEY = process.env.WECHAT_PRIVATE_KEY || ''
const API_V3_KEY = process.env.WECHAT_API_V3_KEY || ''

export function isWechatConfigured(): boolean {
  return !!(MCH_ID && SERIAL_NO && PRIVATE_KEY && API_V3_KEY)
}

function generateNonceStr(): string {
  return crypto.randomBytes(16).toString('hex')
}

function generateSignature(method: string, url: string, timestamp: string, nonceStr: string, body: string): string {
  const message = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${body}\n`
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(message)
  return sign.sign(PRIVATE_KEY, 'base64')
}

export async function createWechatOrder(
  orderNo: string,
  amountCents: number,
  description: string,
  notifyUrl: string
): Promise<{ codeUrl: string }> {
  if (!isWechatConfigured()) {
    throw new Error('微信支付未配置')
  }

  const url = '/v3/pay/transactions/native'
  const fullUrl = `https://api.mch.weixin.qq.com${url}`
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const nonceStr = generateNonceStr()

  const body = JSON.stringify({
    appid: process.env.WECHAT_APP_ID || '',
    mchid: MCH_ID,
    description,
    out_trade_no: orderNo,
    notify_url: notifyUrl,
    amount: {
      total: amountCents,
      currency: 'CNY',
    },
  })

  const signature = generateSignature('POST', url, timestamp, nonceStr, body)
  const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${MCH_ID}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${SERIAL_NO}"`

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': authorization,
    },
    body,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`微信支付创建订单失败: ${error}`)
  }

  const result = await response.json()
  return { codeUrl: result.code_url }
}

export async function verifyWechatNotify(
  headers: Record<string, string>,
  body: string
): Promise<{ verified: boolean; result?: any }> {
  if (!isWechatConfigured()) {
    return { verified: false }
  }

  try {
    // 解密回调数据
    const notification = JSON.parse(body)
    const { ciphertext, nonce, associated_data } = notification.resource

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(API_V3_KEY),
      Buffer.from(nonce)
    )
    decipher.setAAD(Buffer.from(associated_data))

    const authTag = Buffer.from(ciphertext, 'base64').slice(-16)
    const encryptedData = Buffer.from(ciphertext, 'base64').slice(0, -16)

    decipher.setAuthTag(authTag)
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ])

    const result = JSON.parse(decrypted.toString('utf8'))
    return { verified: true, result }
  } catch {
    return { verified: false }
  }
}

export async function queryWechatOrder(orderNo: string): Promise<any> {
  if (!isWechatConfigured()) {
    throw new Error('微信支付未配置')
  }

  const url = `/v3/pay/transactions/out-trade-no/${orderNo}?mchid=${MCH_ID}`
  const fullUrl = `https://api.mch.weixin.qq.com${url}`
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const nonceStr = generateNonceStr()

  const signature = generateSignature('GET', url, timestamp, nonceStr, '')
  const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${MCH_ID}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${SERIAL_NO}"`

  const response = await fetch(fullUrl, {
    headers: {
      'Accept': 'application/json',
      'Authorization': authorization,
    },
  })

  return response.json()
}
