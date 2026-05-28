'use client'

import { create } from 'zustand'
import { GameEngine } from '@/lib/game-engine'
import { getScenario } from '@/data/scenarios'
import type {
  DialogThread,
  DialogNode,
  PlayerState,
  ScenarioResult,
  GamePhase,
  KnowledgeItem,
  MineTriggerEvent,
  CharacterAttitude,
} from '@/types/game'
import type { ScenarioData } from '@/types/scenario'
import { GAME_TICK_INTERVAL, DEFAULT_SCENARIO_TIME } from '@/lib/constants'

interface DialogMessage {
  nodeId: string
  speaker: string
  speakerName: string
  text: string
  emotion?: string
  isPlayer: boolean
  attitude: CharacterAttitude
}

interface OptionResult {
  nextNodeId: string
  mineTriggered: MineTriggerEvent | null
  infoExposed: string | null
  attitudeChanges: Array<{ characterId: string; to: CharacterAttitude }>
  consistencyWarning: boolean
  energyShutdown: boolean
}

interface GameState {
  // 场景信息
  scenario: ScenarioData | null
  engine: GameEngine | null

  // 游戏状态
  gamePhase: GamePhase
  elapsedTime: number
  tickIntervalId: ReturnType<typeof setInterval> | null

  // 线程
  threads: DialogThread[]
  activeThreadId: string | null

  // 对话
  messages: DialogMessage[]
  currentNode: DialogNode | null
  isWaitingForChoice: boolean

  // 玩家状态
  playerState: PlayerState

  // 结果
  result: ScenarioResult | null

  // Actions
  loadScenario: (scenarioId: string) => void
  startGame: () => void
  selectThread: (threadId: string) => void
  selectOption: (optionId: string) => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  reset: () => void
}

const createInitialPlayerState = (): PlayerState => ({
  consistency: 100,
  emotionalEnergy: 100,
  reputation: {},
  attitudes: {},
  triggeredMines: [],
  exposedInfo: [],
  stanceHistory: [],
  contradictions: [],
  forbiddenTopics: [],
  dialogHistory: [],
})

export const useGameStore = create<GameState>((set, get) => ({
  scenario: null,
  engine: null,
  gamePhase: 'idle',
  elapsedTime: 0,
  tickIntervalId: null,
  threads: [],
  activeThreadId: null,
  messages: [],
  currentNode: null,
  isWaitingForChoice: false,
  playerState: createInitialPlayerState(),
  result: null,

  loadScenario: (scenarioId: string) => {
    const scenario = getScenario(scenarioId)
    if (!scenario) return

    const engine = new GameEngine(scenario)
    const initialState = engine.getState()
    const threads = engine.getVisibleThreads()
    const firstThread = threads.length > 0 ? threads[0] : null
    const firstNode = firstThread
      ? engine.getCurrentNode(firstThread.id)
      : null

    set({
      scenario,
      engine,
      gamePhase: 'briefing',
      elapsedTime: 0,
      threads,
      activeThreadId: firstThread?.id ?? null,
      messages: firstNode
        ? [
            {
              nodeId: firstNode.id,
              speaker: firstNode.speaker,
              speakerName: getCharacterName(scenario, firstNode.speaker),
              text: firstNode.text,
              emotion: firstNode.emotion,
              isPlayer: false,
              attitude: initialState.attitudes[firstNode.speaker] ?? 'neutral',
            },
          ]
        : [],
      currentNode: firstNode,
      isWaitingForChoice: !!firstNode && firstNode.options.length > 0,
      playerState: initialState,
      result: null,
    })
  },

  startGame: () => {
    const { engine } = get()
    if (!engine) return

    const intervalId = setInterval(() => {
      const state = get()
      if (state.gamePhase !== 'playing') return

      const newElapsed = state.elapsedTime + 1
      engine.tick(1)

      const threads = engine.getVisibleThreads()
      const playerState = engine.getState()

      const urgencyAlerts = engine.getUrgencyAlerts()
      const newMessages = [...state.messages]

      for (const alert of urgencyAlerts) {
        const exists = newMessages.some(
          (m) => m.text === alert.message && m.speaker === alert.threadId
        )
        if (!exists) {
          newMessages.push({
            nodeId: `urgency-${alert.threadId}-${newElapsed}`,
            speaker: alert.threadId,
            speakerName: alert.characterName,
            text: alert.message,
            emotion: '催促',
            isPlayer: false,
            attitude: 'wary',
          })
        }
      }

      const totalTime = state.scenario?.estimatedMinutes
        ? state.scenario.estimatedMinutes * 60
        : DEFAULT_SCENARIO_TIME
      const isTimeUp = newElapsed >= totalTime
      const isShutdown = playerState.emotionalEnergy <= 0
      const allResolved = threads.every((t) => t.status === 'resolved' || t.status === 'deteriorated')

      if (isTimeUp || isShutdown || allResolved) {
        get().endGame()
        return
      }

      set({
        elapsedTime: newElapsed,
        threads,
        playerState,
        messages: newMessages,
      })
    }, GAME_TICK_INTERVAL)

    set({ gamePhase: 'playing', tickIntervalId: intervalId })
  },

  selectThread: (threadId: string) => {
    const { engine, scenario } = get()
    if (!engine || !scenario) return

    engine.selectThread(threadId)
    const node = engine.getCurrentNode(threadId)
    const playerState = engine.getState()

    if (node) {
      const newMsg: DialogMessage = {
        nodeId: node.id,
        speaker: node.speaker,
        speakerName: getCharacterName(scenario, node.speaker),
        text: node.text,
        emotion: node.emotion,
        isPlayer: false,
        attitude: playerState.attitudes[node.speaker] ?? 'neutral',
      }

      set((state) => ({
        activeThreadId: threadId,
        currentNode: node,
        isWaitingForChoice: node.options.length > 0,
        messages: [...state.messages, newMsg],
        threads: engine.getVisibleThreads(),
      }))
    } else {
      set({
        activeThreadId: threadId,
        threads: engine.getVisibleThreads(),
      })
    }
  },

  selectOption: (optionId: string) => {
    const { engine, activeThreadId, scenario } = get()
    if (!engine || !activeThreadId || !scenario) return

    const result = engine.selectOption(activeThreadId, optionId)
    const playerState = engine.getState()
    const threads = engine.getVisibleThreads()

    const option = get().currentNode?.options.find((o) => o.id === optionId)

    const newMessages = [...get().messages]

    if (option) {
      newMessages.push({
        nodeId: `player-${optionId}`,
        speaker: 'player',
        speakerName: '你',
        text: option.text,
        isPlayer: true,
        attitude: 'neutral',
      })

      if (option.characterReaction) {
        const currentNode = get().currentNode
        const speaker = currentNode?.speaker ?? activeThreadId
        newMessages.push({
          nodeId: `reaction-${optionId}`,
          speaker,
          speakerName: getCharacterName(scenario, speaker),
          text: option.characterReaction,
          isPlayer: false,
          attitude: playerState.attitudes[speaker] ?? 'neutral',
        })
      }
    }

    const nextNode = engine.getCurrentNode(activeThreadId)
    if (nextNode && !nextNode.isAutoResponse) {
      newMessages.push({
        nodeId: nextNode.id,
        speaker: nextNode.speaker,
        speakerName: getCharacterName(scenario, nextNode.speaker),
        text: nextNode.text,
        emotion: nextNode.emotion,
        isPlayer: false,
        attitude: playerState.attitudes[nextNode.speaker] ?? 'neutral',
      })
    }

    set({
      messages: newMessages,
      currentNode: nextNode,
      isWaitingForChoice: nextNode ? nextNode.options.length > 0 : false,
      playerState,
      threads,
    })

    if (playerState.emotionalEnergy <= 0) {
      get().endGame()
    }

    return result
  },

  pauseGame: () => {
    set({ gamePhase: 'paused' })
  },

  resumeGame: () => {
    set({ gamePhase: 'playing' })
  },

  endGame: () => {
    const { engine, tickIntervalId, scenario } = get()
    if (tickIntervalId) {
      clearInterval(tickIntervalId)
    }
    if (!engine) return

    const result = engine.getResult()
    set({
      gamePhase: 'ended',
      tickIntervalId: null,
      result,
    })

    if (typeof window !== 'undefined' && scenario) {
      try {
        sessionStorage.setItem('lastGameResult', JSON.stringify(result))
        sessionStorage.setItem('lastGameScenario', JSON.stringify(scenario))
      } catch {}
    }
  },

  reset: () => {
    const { tickIntervalId } = get()
    if (tickIntervalId) clearInterval(tickIntervalId)
    set({
      scenario: null,
      engine: null,
      gamePhase: 'idle',
      elapsedTime: 0,
      tickIntervalId: null,
      threads: [],
      activeThreadId: null,
      messages: [],
      currentNode: null,
      isWaitingForChoice: false,
      playerState: createInitialPlayerState(),
      result: null,
    })
  },
}))

function getCharacterName(scenario: ScenarioData, speakerId: string): string {
  const char = scenario.characters.find((c) => c.id === speakerId)
  return char?.name ?? speakerId
}
