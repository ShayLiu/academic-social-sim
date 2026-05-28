import { NextRequest, NextResponse } from 'next/server'
import { verifyWechatNotify } from '@/lib/payment/wechat'
import { getOrder, updateOrderStatus } from '@/lib/storage/order-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      headers[key] = value
    })

    const { verified, result } = await verifyWechatNotify(headers, body)
    if (!verified || !result) {
      return NextResponse.json(
        { code: 'FAIL', message: '验签失败' },
        { status: 400 }
      )
    }

    const orderNo = result.out_trade_no
    const tradeState = result.trade_state

    if (tradeState !== 'SUCCESS') {
      return NextResponse.json({ code: 'SUCCESS', message: '成功' })
    }

    const order = await getOrder(orderNo)
    if (!order) {
      return NextResponse.json(
        { code: 'FAIL', message: '订单不存在' },
        { status: 400 }
      )
    }

    if (order.status === 'paid') {
      return NextResponse.json({ code: 'SUCCESS', message: '成功' })
    }

    await updateOrderStatus(orderNo, 'paid', result.transaction_id)

    return NextResponse.json({ code: 'SUCCESS', message: '成功' })
  } catch (error) {
    console.error('微信回调处理失败:', error)
    return NextResponse.json(
      { code: 'FAIL', message: '处理失败' },
      { status: 500 }
    )
  }
}
