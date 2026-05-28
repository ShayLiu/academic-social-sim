import { NextRequest, NextResponse } from 'next/server'
import { verifyAlipayNotify } from '@/lib/payment/alipay'
import { getOrder, updateOrderStatus } from '@/lib/storage/order-store'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}
    formData.forEach((value, key) => {
      params[key] = value.toString()
    })

    const verified = await verifyAlipayNotify(params)
    if (!verified) {
      return new Response('fail', { status: 400 })
    }

    const orderNo = params.out_trade_no
    const tradeStatus = params.trade_status

    if (tradeStatus !== 'TRADE_SUCCESS' && tradeStatus !== 'TRADE_FINISHED') {
      return new Response('success', { status: 200 })
    }

    const order = await getOrder(orderNo)
    if (!order) {
      console.error('支付宝回调：订单不存在', orderNo)
      return new Response('fail', { status: 400 })
    }

    if (order.status === 'paid') {
      return new Response('success', { status: 200 })
    }

    await updateOrderStatus(orderNo, 'paid', params.trade_no)

    return new Response('success', { status: 200 })
  } catch (error) {
    console.error('支付宝回调处理失败:', error)
    return new Response('fail', { status: 500 })
  }
}
