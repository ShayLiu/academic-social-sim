import { NextRequest, NextResponse } from 'next/server'
import { getOrder } from '@/lib/storage/order-store'

export async function GET(request: NextRequest) {
  try {
    const orderNo = request.nextUrl.searchParams.get('orderNo')
    if (!orderNo) {
      return NextResponse.json({ error: '缺少订单号' }, { status: 400 })
    }

    const order = await getOrder(orderNo)
    if (!order) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 })
    }

    return NextResponse.json({
      orderNo: order.order_no,
      status: order.status,
      productType: order.product_type,
      channel: order.channel,
      amountCents: order.amount_cents,
      paidAt: order.paid_at,
      createdAt: order.created_at,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
