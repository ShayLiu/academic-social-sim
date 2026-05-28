export type PaymentChannel = 'alipay' | 'wechat'

export type ProductType = 'single_report' | 'pro_monthly' | 'pro_yearly'

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'expired'

export type SubscriptionStatus = 'active' | 'cancelled' | 'expired'

export type SubscriptionTier = 'free' | 'paid' | 'pro'

export interface ProductInfo {
  type: ProductType
  name: string
  description: string
  amountCents: number
  displayPrice: string
}

export const PRODUCTS: Record<ProductType, ProductInfo> = {
  single_report: {
    type: 'single_report',
    name: '完整诊断报告',
    description: '五维雷达图 + 信息差复盘 + 身后评价 + 改进建议 + PDF导出',
    amountCents: 990,
    displayPrice: '¥9.9',
  },
  pro_monthly: {
    type: 'pro_monthly',
    name: 'Pro 月度订阅',
    description: '全部场景无限重玩 + 完整报告 + 角色扮演 + 自定义改名',
    amountCents: 1200,
    displayPrice: '¥12/月',
  },
  pro_yearly: {
    type: 'pro_yearly',
    name: 'Pro 年度订阅',
    description: '全部功能 + 年度优惠（省46元）',
    amountCents: 9800,
    displayPrice: '¥98/年',
  },
}
