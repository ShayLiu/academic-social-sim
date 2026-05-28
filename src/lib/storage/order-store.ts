import { v4 as uuidv4 } from 'uuid'
import type { PaymentChannel, ProductType, OrderStatus } from '@/types/payment'
import * as fs from 'fs'
import * as path from 'path'

export interface Order {
  id: string
  order_no: string
  channel: PaymentChannel
  product_type: ProductType
  amount_cents: number
  status: OrderStatus
  channel_trade_no?: string
  session_id?: string
  paid_at?: string
  created_at: string
  updated_at: string
}

const orders = new Map<string, Order>()

const DATA_DIR = path.join(process.cwd(), '.data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function loadOrders() {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'))
      for (const order of data) {
        orders.set(order.order_no, order)
      }
    }
  } catch {}
}

function saveOrders() {
  try {
    ensureDataDir()
    const data = Array.from(orders.values())
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
  } catch {}
}

loadOrders()

function generateOrderNo(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `ASS${date}${rand}`
}

export async function createOrder(
  channel: PaymentChannel,
  productType: ProductType,
  amountCents: number,
  sessionId?: string
): Promise<Order> {
  const order: Order = {
    id: uuidv4(),
    order_no: generateOrderNo(),
    channel,
    product_type: productType,
    amount_cents: amountCents,
    status: 'pending',
    session_id: sessionId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  orders.set(order.order_no, order)
  saveOrders()
  return order
}

export async function getOrder(orderNo: string): Promise<Order | null> {
  return orders.get(orderNo) ?? null
}

export async function updateOrderStatus(
  orderNo: string,
  status: OrderStatus,
  channelTradeNo?: string
): Promise<Order | null> {
  const order = orders.get(orderNo)
  if (!order) return null

  order.status = status
  order.updated_at = new Date().toISOString()
  if (channelTradeNo) order.channel_trade_no = channelTradeNo
  if (status === 'paid') order.paid_at = new Date().toISOString()

  orders.set(orderNo, order)
  saveOrders()
  return order
}
