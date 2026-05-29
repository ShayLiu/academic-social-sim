import { NextRequest, NextResponse } from 'next/server'
import { verifyNotify } from '@/lib/payment/xunhupay'
import { getOrder, updateOrderStatus } from '@/lib/storage/order-store'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}
    formData.forEach((value, key) => {
      params[key] = value.toString()
    })

    if (!verifyNotify(params)) {
      return new Response('fail', { status: 400 })
    }

    const orderNo = params.trade_order_id
    const status = params.status

    if (status !== 'OD' && status !== 'complete') {
      return new Response('success', { status: 200 })
    }

    const order = await getOrder(orderNo)
    if (!order) {
      return new Response('fail', { status: 400 })
    }

    if (order.status === 'paid') {
      return new Response('success', { status: 200 })
    }

    await updateOrderStatus(orderNo, 'paid', params.transaction_id)

    return new Response('success', { status: 200 })
  } catch (error) {
    console.error('支付回调处理失败:', error)
    return new Response('fail', { status: 500 })
  }
}
