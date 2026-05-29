import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/storage/order-store'
import { createXunhuOrder, isXunhuConfigured } from '@/lib/payment/xunhupay'
import { PRODUCTS } from '@/types/payment'
import type { PaymentChannel, ProductType } from '@/types/payment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { channel, productType, sessionId } = body as {
      channel: PaymentChannel
      productType: ProductType
      sessionId?: string
    }

    if (!channel || !productType) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    const product = PRODUCTS[productType]
    if (!product) {
      return NextResponse.json({ error: '无效的产品类型' }, { status: 400 })
    }

    if (!isXunhuConfigured()) {
      return NextResponse.json({ error: '支付未配置，请联系管理员' }, { status: 500 })
    }

    const order = await createOrder(channel, productType, product.amountCents, sessionId)

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academic-social-sim.vercel.app'
    const notifyUrl = `${appUrl}/api/payment/notify`
    const returnUrl = `${appUrl}/payment/success?orderNo=${order.order_no}`

    const amountYuan = (product.amountCents / 100).toFixed(2)

    const result = await createXunhuOrder({
      orderNo: order.order_no,
      amountYuan,
      title: product.name,
      notifyUrl,
      returnUrl,
      channel,
    })

    return NextResponse.json({
      orderNo: order.order_no,
      payUrl: result.url,
    })
  } catch (error: any) {
    console.error('创建支付订单失败:', error)
    return NextResponse.json(
      { error: error.message || '创建订单失败' },
      { status: 500 }
    )
  }
}
