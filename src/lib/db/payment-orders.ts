import { v4 as uuidv4 } from 'uuid'
import { createServerClient } from '@/lib/supabase/server'
import type { PaymentChannel, ProductType, OrderStatus } from '@/types/payment'

export interface Order {
  id: string
  order_no: string
  user_id: string
  channel: PaymentChannel
  product_type: ProductType
  amount_cents: number
  status: OrderStatus
  channel_trade_no: string | null
  session_id: string | null
  paid_at: string | null
  created_at: string
  updated_at: string
}

function generateOrderNo(): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0')
  return `ASS${timestamp}${random}`
}

export async function createOrder(
  userId: string,
  channel: PaymentChannel,
  productType: ProductType,
  amountCents: number,
  sessionId?: string
): Promise<Order> {
  const supabase = createServerClient()
  const orderNo = generateOrderNo()

  const { data, error } = await supabase
    .from('orders')
    .insert({
      id: uuidv4(),
      order_no: orderNo,
      user_id: userId,
      channel,
      product_type: productType,
      amount_cents: amountCents,
      status: 'pending' as OrderStatus,
      session_id: sessionId ?? null,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create order: ${error.message}`)
  return data as Order
}

export async function getOrder(orderNo: string): Promise<Order | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_no', orderNo)
    .single()

  if (error || !data) return null
  return data as Order
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Order
}

export async function updateOrderStatus(
  orderNo: string,
  status: OrderStatus,
  channelTradeNo?: string
): Promise<void> {
  const supabase = createServerClient()

  const updateData: Record<string, unknown> = { status }
  if (channelTradeNo) {
    updateData.channel_trade_no = channelTradeNo
  }
  if (status === 'paid') {
    updateData.paid_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('order_no', orderNo)

  if (error) throw new Error(`Failed to update order status: ${error.message}`)
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to get user orders: ${error.message}`)
  return (data ?? []) as Order[]
}

export async function isOrderPaid(orderNo: string): Promise<boolean> {
  const order = await getOrder(orderNo)
  if (!order) return false
  return order.status === 'paid'
}
