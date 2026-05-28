import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/storage/order-store'
import { createAlipayOrder, isAlipayConfigured } from '@/lib/payment/alipay'
import { createWechatOrder, isWechatConfigured } from '@/lib/payment/wechat'
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

    const order = await createOrder(
      channel,
      productType,
      product.amountCents,
      sessionId
    )

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const returnUrl = `${appUrl}/payment/success?orderNo=${order.order_no}`

    if (channel === 'alipay') {
      if (!isAlipayConfigured()) {
        return NextResponse.json({ error: '支付宝未配置，请联系管理员' }, { status: 500 })
      }

      const amountYuan = (product.amountCents / 100).toFixed(2)
      const notifyUrl = `${appUrl}/api/payment/alipay-notify`
      const formHtml = await createAlipayOrder(
        order.order_no,
        amountYuan,
        product.name,
        returnUrl,
        notifyUrl
      )

      return NextResponse.json({
        channel: 'alipay',
        orderNo: order.order_no,
        formHtml,
      })
    }

    if (channel === 'wechat') {
      if (!isWechatConfigured()) {
        return NextResponse.json({ error: '微信支付未配置，请联系管理员' }, { status: 500 })
      }

      const notifyUrl = `${appUrl}/api/payment/wechat-notify`
      const { codeUrl } = await createWechatOrder(
        order.order_no,
        product.amountCents,
        product.name,
        notifyUrl
      )

      return NextResponse.json({
        channel: 'wechat',
        orderNo: order.order_no,
        codeUrl,
      })
    }

    return NextResponse.json({ error: '不支持的支付渠道' }, { status: 400 })
  } catch (error: any) {
    console.error('创建支付订单失败:', error)
    return NextResponse.json(
      { error: error.message || '创建订单失败' },
      { status: 500 }
    )
  }
}
