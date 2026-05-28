'use client'

import { cn } from '@/lib/utils'
import type { CharacterAttitude } from '@/types/game'

interface CharacterAvatarProps {
  name: string
  avatar: string
  attitude: CharacterAttitude
  isSpeaking?: boolean
  isWaiting?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const attitudeColors: Record<CharacterAttitude, string> = {
  friendly: 'ring-emerald-400',
  neutral: 'ring-gray-400',
  wary: 'ring-yellow-400',
  hostile: 'ring-red-500',
}

const attitudeLabels: Record<CharacterAttitude, string> = {
  friendly: '友好',
  neutral: '中立',
  wary: '警惕',
  hostile: '敌对',
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
}

export function CharacterAvatar({
  name,
  attitude,
  isSpeaking,
  size = 'md',
}: CharacterAvatarProps) {
  const initial = name.replace(/^某/, '').charAt(0)

  return (
    <div className="relative inline-flex flex-col items-center gap-1">
      <div
        className={cn(
          'rounded-full ring-2 flex items-center justify-center font-medium',
          'bg-surface-lighter text-text-primary',
          sizeClasses[size],
          attitudeColors[attitude],
          isSpeaking && 'ring-4 ring-offset-1 ring-offset-surface'
        )}
      >
        {initial}
      </div>
      {size !== 'sm' && (
        <span className="text-[10px] text-text-muted text-center max-w-[60px] truncate">
          {name}
        </span>
      )}
      <span
        className={cn(
          'absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full',
          attitude === 'friendly' && 'bg-emerald-400',
          attitude === 'neutral' && 'bg-gray-400',
          attitude === 'wary' && 'bg-yellow-400',
          attitude === 'hostile' && 'bg-red-500'
        )}
        title={attitudeLabels[attitude]}
      />
    </div>
  )
}
