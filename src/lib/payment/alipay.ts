import { AlipaySdk } from 'alipay-sdk'

let _sdk: AlipaySdk | null = null

function getAlipaySdk(): AlipaySdk {
  if (!_sdk) {
    _sdk = new AlipaySdk({
      appId: process.env.ALIPAY_APP_ID!,
      privateKey: process.env.ALIPAY_PRIVATE_KEY!,
      alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!,
      gateway: process.env.ALIPAY_GATEWAY || 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
    })
  }
  return _sdk
}

export async function createAlipayOrder(
  orderNo: string,
  amountYuan: string,
  subject: string,
  returnUrl: string,
  notifyUrl: string
): Promise<string> {
  const result = await getAlipaySdk().pageExec('alipay.trade.page.pay', {
    notify_url: notifyUrl,
    return_url: returnUrl,
    bizContent: {
      out_trade_no: orderNo,
      total_amount: amountYuan,
      subject,
      product_code: 'FAST_INSTANT_TRADE_PAY',
    },
  })
  return result as string
}

export async function verifyAlipayNotify(
  params: Record<string, string>
): Promise<boolean> {
  try {
    const result = getAlipaySdk().checkNotifySign(params)
    return result
  } catch {
    return false
  }
}

export async function queryAlipayOrder(orderNo: string): Promise<any> {
  const result = await getAlipaySdk().exec('alipay.trade.query', {
    bizContent: {
      out_trade_no: orderNo,
    },
  })
  return result
}

export function isAlipayConfigured(): boolean {
  return !!(
    process.env.ALIPAY_APP_ID &&
    process.env.ALIPAY_PRIVATE_KEY &&
    process.env.ALIPAY_PUBLIC_KEY
  )
}
