'use client'

import { useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGameStore } from '@/store/game-store'
import { useUIStore } from '@/store/ui-store'
import { GameLayout } from '@/components/game/GameLayout'
import { MobileGameLayout } from '@/components/game/MobileGameLayout'
import { ThreadList } from '@/components/game/ThreadList'
import { DialogPanel } from '@/components/game/DialogPanel'
import { ChoicePanel } from '@/components/game/ChoicePanel'
import { IntelPanel } from '@/components/game/IntelPanel'
import { MineTrigger } from '@/components/game/MineTrigger'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS, DEFAULT_SCENARIO_TIME } from '@/lib/constants'
import { useIsMobile } from '@/hooks/useMediaQuery'

export default function PlayPage() {
  const params = useParams()
  const router = useRouter()
  const scenarioId = params.id as string

  const {
    scenario,
    engine,
    gamePhase,
    elapsedTime,
    threads,
    activeThreadId,
    messages,
    currentNode,
    isWaitingForChoice,
    playerState,
    result,
    loadScenario,
    startGame,
    selectThread,
    selectOption,
    pauseGame,
    resumeGame,
    endGame,
    reset,
  } = useGameStore()

  const {
    activeMineEvent,
    isMineAnimating,
    isIntelPanelOpen,
    triggerMineEffect,
    clearMineEffect,
  } = useUIStore()

  const isMobile = useIsMobile()

  useEffect(() => {
    reset()
    loadScenario(scenarioId)
  }, [scenarioId, loadScenario, reset])

  useEffect(() => {
    if (gamePhase === 'ended' && result) {
      const timer = setTimeout(() => {
        router.push(`/result/${scenarioId}`)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [gamePhase, result, router, scenarioId])

  const handleSelectOption = useCallback(
    (optionId: string) => {
      const optResult = selectOption(optionId) as any
      if (optResult?.mineTriggered) {
        triggerMineEffect(optResult.mineTriggered)
      }
    },
    [selectOption, triggerMineEffect]
  )

  const handleMineClear = useCallback(() => {
    clearMineEffect()
  }, [clearMineEffect])

  if (!scenario) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-text-muted">
        加载场景中...
      </div>
    )
  }

  // 简报阶段
  if (gamePhase === 'briefing') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center px-6"
        >
          <span className={cn('text-xs', DIFFICULTY_COLORS[scenario.difficulty])}>
            {DIFFICULTY_LABELS[scenario.difficulty]}
          </span>
          <h1 className="text-2xl font-bold text-text-primary mt-2 mb-3">
            {scenario.title}
          </h1>
          <p className="text-sm text-text-secondary mb-1">{scenario.subtitle}</p>
          <div className="my-6 p-4 rounded-lg bg-surface-light border border-surface-lighter text-left">
            <p className="text-xs text-text-muted mb-2">场景简报</p>
            <p className="text-sm text-text-primary leading-relaxed">
              {scenario.briefing}
            </p>
          </div>
          <div className="text-xs text-text-muted mb-6 space-y-1">
            <p>地点: {scenario.setting} · {scenario.timeOfDay}</p>
            <p>你扮演: {scenario.playerRole}</p>
            <p>在场: {scenario.characters.map((c) => c.name).join('、')}</p>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-3 rounded-lg bg-academic-blue hover:bg-academic-blue-light text-white font-medium transition-colors"
          >
            进入场景
          </button>
        </motion.div>
      </div>
    )
  }

  // 结束动画
  if (gamePhase === 'ended') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-lg text-text-secondary">场景结束</p>
          <p className="text-sm text-text-muted mt-2">正在生成评价...</p>
        </motion.div>
      </div>
    )
  }

  const totalTime = scenario.estimatedMinutes
    ? scenario.estimatedMinutes * 60
    : DEFAULT_SCENARIO_TIME

  const threadInfos = threads.map((thread) => {
    const char = scenario.characters.find((c) => c.id === thread.characterId)
    return {
      thread,
      characterName: char?.name ?? thread.characterId,
      characterAvatar: char?.avatar ?? '',
      attitude: playerState.attitudes[thread.characterId] ?? char?.initialAttitude ?? 'neutral',
      lastMessage: thread.autoMessages.length > 0
        ? thread.autoMessages[thread.autoMessages.length - 1]
        : undefined,
    }
  })

  const visibleKnowledge = engine
    ? engine.getVisibleKnowledge()
    : scenario.knowledgeItems.filter((k) => k.visibility === 'knownToUser')

  const availableOptions = currentNode
    ? engine
      ? engine.getAvailableOptions(currentNode.id)
      : currentNode.options
    : []

  const LayoutComponent = isMobile ? MobileGameLayout : GameLayout

  return (
    <LayoutComponent
      phase={scenario.phase}
      scenarioTitle={scenario.title}
      energy={playerState.emotionalEnergy}
      totalTime={totalTime}
      elapsedTime={elapsedTime}
      isPaused={gamePhase === 'paused'}
      onPause={pauseGame}
      onResume={resumeGame}
      threadPanel={
        <ThreadList
          threads={threadInfos}
          activeThreadId={activeThreadId}
          onSelectThread={selectThread}
        />
      }
      dialogPanel={
        <DialogPanel
          messages={messages}
          currentNode={currentNode}
          isWaitingForChoice={isWaitingForChoice}
        />
      }
      choicePanel={
        <ChoicePanel
          options={availableOptions}
          currentEnergy={playerState.emotionalEnergy}
          disabled={gamePhase === 'paused' || isMineAnimating}
          onSelect={handleSelectOption}
        />
      }
      intelPanel={
        <IntelPanel
          knowledgeItems={visibleKnowledge}
          exposedInfoIds={playerState.exposedInfo}
          minesTriggered={playerState.triggeredMines.length}
          minesTotal={scenario.mines.length}
          consistency={playerState.consistency}
          isOpen={isIntelPanelOpen}
        />
      }
      overlay={
        <MineTrigger
          event={activeMineEvent}
          isAnimating={isMineAnimating}
          onComplete={handleMineClear}
        />
      }
    />
  )
}
