import crypto from 'crypto'

const XUNHU_API = 'https://api.xunhupay.com/payment/do.html'

function sign(params: Record<string, string>, appSecret: string): string {
  const sorted = Object.keys(params)
    .filter((k) => k !== 'hash' && params[k] !== '')
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return crypto.createHash('md5').update(sorted + appSecret).digest('hex')
}

export function verifyNotify(params: Record<string, string>): boolean {
  const appSecret = process.env.XUNHU_APP_SECRET
  if (!appSecret) return false
  const hash = params.hash
  if (!hash) return false
  const calculated = sign(params, appSecret)
  return calculated === hash
}

export async function createXunhuOrder(opts: {
  orderNo: string
  amountYuan: string
  title: string
  notifyUrl: string
  returnUrl: string
  channel: 'alipay' | 'wechat'
}): Promise<{ url: string }> {
  const appId = process.env.XUNHU_APP_ID
  const appSecret = process.env.XUNHU_APP_SECRET
  if (!appId || !appSecret) {
    throw new Error('虎皮椒未配置')
  }

  const params: Record<string, string> = {
    version: '1.1',
    appid: appId,
    trade_order_id: opts.orderNo,
    total_fee: opts.amountYuan,
    title: opts.title,
    notify_url: opts.notifyUrl,
    return_url: opts.returnUrl,
    type: opts.channel === 'wechat' ? 'WAP' : 'WAP',
    wap_name: '学术社交模拟器',
    nonce_str: crypto.randomBytes(16).toString('hex'),
    time: Math.floor(Date.now() / 1000).toString(),
  }

  params.hash = sign(params, appSecret)

  const formBody = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  const res = await fetch(XUNHU_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody,
  })

  const data = await res.json()

  if (data.errcode !== 0 && data.errmsg) {
    throw new Error(data.errmsg)
  }

  return { url: data.url || data.url_qrcode || data.redirect }
}

export function isXunhuConfigured(): boolean {
  return !!(process.env.XUNHU_APP_ID && process.env.XUNHU_APP_SECRET)
}
