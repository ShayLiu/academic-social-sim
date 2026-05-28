'use client'

import { cn } from '@/lib/utils'
import { ThreadCard } from './ThreadCard'
import type { DialogThread, CharacterAttitude } from '@/types/game'

interface ThreadInfo {
  thread: DialogThread
  characterName: string
  characterAvatar: string
  attitude: CharacterAttitude
  lastMessage?: string
}

interface ThreadListProps {
  threads: ThreadInfo[]
  activeThreadId: string | null
  onSelectThread: (threadId: string) => void
}

export function ThreadList({
  threads,
  activeThreadId,
  onSelectThread,
}: ThreadListProps) {
  const sorted = [...threads].sort((a, b) => {
    if (a.thread.status === 'resolved' && b.thread.status !== 'resolved') return 1
    if (b.thread.status === 'resolved' && a.thread.status !== 'resolved') return -1
    return b.thread.urgency - a.thread.urgency
  })

  return (
    <div className="h-full flex flex-col bg-surface border-r border-surface-lighter">
      <div className="px-3 py-2 border-b border-surface-lighter">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          对话线程
        </h3>
        <p className="text-[10px] text-text-muted mt-0.5">
          每次只能回应一个线程
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
        {sorted.map((info) => (
          <ThreadCard
            key={info.thread.id}
            threadId={info.thread.id}
            characterName={info.characterName}
            characterAvatar={info.characterAvatar}
            label={info.thread.label}
            urgency={info.thread.urgency}
            status={info.thread.status}
            lastMessage={info.lastMessage}
            isActive={info.thread.id === activeThreadId}
            onClick={() => onSelectThread(info.thread.id)}
          />
        ))}
      </div>
    </div>
  )
}
