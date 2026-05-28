'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CharacterAvatar } from './CharacterAvatar'
import type { DialogNode, CharacterAttitude } from '@/types/game'

interface DialogMessage {
  nodeId: string
  speaker: string
  speakerName: string
  text: string
  emotion?: string
  isPlayer: boolean
  attitude: CharacterAttitude
}

interface DialogPanelProps {
  messages: DialogMessage[]
  currentNode: DialogNode | null
  isWaitingForChoice: boolean
}

export function DialogPanel({
  messages,
  currentNode,
  isWaitingForChoice,
}: DialogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.nodeId + '-' + idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'flex gap-3',
                msg.isPlayer ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {!msg.isPlayer && (
                <CharacterAvatar
                  name={msg.speakerName}
                  avatar=""
                  attitude={msg.attitude}
                  isSpeaking={false}
                  size="sm"
                />
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg px-3 py-2',
                  msg.isPlayer
                    ? 'bg-academic-blue text-white'
                    : 'bg-surface-lighter text-text-primary'
                )}
              >
                {!msg.isPlayer && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-text-secondary">
                      {msg.speakerName}
                    </span>
                    {msg.emotion && (
                      <span className="text-xs text-text-muted">
                        [{msg.emotion}]
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              {msg.isPlayer && (
                <div className="w-8 h-8 rounded-full bg-academic-blue flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                  你
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isWaitingForChoice && (
          <motion.div
            className="flex items-center gap-2 px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-text-muted"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">等待你的回应...</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
