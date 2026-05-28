'use client'

import { cn } from '@/lib/utils'
import type { ProductInfo } from '@/types/payment'

interface PricingCardProps {
  product: ProductInfo
  isCurrent: boolean
  onSelect: () => void
  features: string[]
}

export function PricingCard({ product, isCurrent, onSelect, features }: PricingCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-5 transition-all',
        isCurrent
          ? 'border-academic-blue bg-academic-blue/5'
          : 'border-surface-lighter bg-surface-light hover:border-surface-lighter/80'
      )}
    >
      <h3 className="text-sm font-medium text-text-primary">{product.name}</h3>
      <p className="text-2xl font-bold text-text-primary mt-2">
        {product.displayPrice}
      </p>
      <p className="text-xs text-text-muted mt-1">{product.description}</p>
      <ul className="mt-4 space-y-1.5">
        {features.map((f) => (
          <li key={f} className="text-xs text-text-secondary flex items-start gap-1.5">
            <span className="text-academic-blue-light mt-0.5">+</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        disabled={isCurrent}
        className={cn(
          'w-full mt-4 py-2 rounded text-sm transition-colors',
          isCurrent
            ? 'bg-surface-lighter text-text-muted cursor-not-allowed'
            : 'bg-academic-blue text-white hover:bg-academic-blue-light'
        )}
      >
        {isCurrent ? '当前方案' : '选择'}
      </button>
    </div>
  )
}
