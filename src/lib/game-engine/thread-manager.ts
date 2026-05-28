import type { DialogThread, ThreadStatus, UrgencyAlert } from '../../types/game'
import {
  URGENCY_TICK_INTERVAL,
  URGENCY_INCREMENT,
  URGENCY_ALERT_THRESHOLD,
  URGENCY_CRITICAL_THRESHOLD,
} from '../constants'

/**
 * 多线程对话的 urgency 调度器。
 * 每 URGENCY_TICK_INTERVAL 秒，所有非活跃线程的 urgency 统一 +URGENCY_INCREMENT。
 */
export class ThreadManager {
  private threads: Map<string, DialogThread>
  private activeThreadId: string | null = null
  private accumulatedTime: number = 0
  private characterNames: Map<string, string>

  constructor(threads: DialogThread[], characterNames: Map<string, string>) {
    this.threads = new Map(threads.map((t) => [t.id, { ...t }]))
    this.characterNames = characterNames
  }

  /** 每帧/每秒调用，deltaSeconds 为经过的真实秒数 */
  tick(deltaSeconds: number): void {
    this.accumulatedTime += deltaSeconds

    while (this.accumulatedTime >= URGENCY_TICK_INTERVAL) {
      this.accumulatedTime -= URGENCY_TICK_INTERVAL

      const threads = Array.from(this.threads.values())
      for (const thread of threads) {
        // 只有 waiting 和 escalated 状态的线程才会涨 urgency
        if (
          thread.status === 'resolved' ||
          thread.status === 'deteriorated' ||
          thread.id === this.activeThreadId
        ) {
          continue
        }

        thread.urgency += URGENCY_INCREMENT

        // 超过催促阈值 -> 升级为 escalated
        if (
          thread.urgency >= URGENCY_ALERT_THRESHOLD &&
          thread.status === 'waiting'
        ) {
          thread.status = 'escalated'
        }

        // 超过恶化阈值 -> 标记 deteriorated
        if (thread.urgency >= URGENCY_CRITICAL_THRESHOLD) {
          thread.status = 'deteriorated'
        }
      }
    }
  }

  /** 玩家选择回应某线程，该线程 urgency 归零并设为活跃 */
  selectThread(threadId: string): void {
    // 离开当前活跃线程时，将其设回 waiting（如果尚未 resolved）
    if (this.activeThreadId && this.activeThreadId !== threadId) {
      const prev = this.threads.get(this.activeThreadId)
      if (prev && prev.status === 'active') {
        prev.status = 'waiting'
      }
    }

    const thread = this.threads.get(threadId)
    if (!thread) return

    thread.urgency = 0
    thread.status = 'active'
    thread.lastInteractedAt = Date.now()
    this.activeThreadId = threadId
  }

  /** 返回 urgency >= URGENCY_ALERT_THRESHOLD 的线程催促列表 */
  getUrgencyAlerts(): UrgencyAlert[] {
    const alerts: UrgencyAlert[] = []

    const allThreads = Array.from(this.threads.values())
    for (const thread of allThreads) {
      if (
        thread.urgency >= URGENCY_ALERT_THRESHOLD &&
        thread.status !== 'resolved' &&
        thread.status !== 'deteriorated'
      ) {
        const autoMsg =
          thread.autoMessages.length > 0
            ? thread.autoMessages[
                Math.min(
                  Math.floor(
                    (thread.urgency - URGENCY_ALERT_THRESHOLD) /
                      URGENCY_INCREMENT
                  ),
                  thread.autoMessages.length - 1
                )
              ]
            : `${this.characterNames.get(thread.characterId) ?? '对方'}还在等你回复...`

        alerts.push({
          threadId: thread.id,
          characterName:
            this.characterNames.get(thread.characterId) ?? thread.characterId,
          message: autoMsg,
          urgencyLevel: thread.urgency,
        })
      }
    }

    return alerts.sort((a, b) => b.urgencyLevel - a.urgencyLevel)
  }

  /** 返回 urgency >= URGENCY_CRITICAL_THRESHOLD 且刚恶化的线程 */
  getDeterioratedThreads(): DialogThread[] {
    const result: DialogThread[] = []
    const allThreads = Array.from(this.threads.values())
    for (const thread of allThreads) {
      if (thread.status === 'deteriorated') {
        result.push({ ...thread })
      }
    }
    return result
  }

  /** 标记线程已解决 */
  resolveThread(threadId: string): void {
    const thread = this.threads.get(threadId)
    if (!thread) return
    thread.status = 'resolved'
    thread.urgency = 0
    if (this.activeThreadId === threadId) {
      this.activeThreadId = null
    }
  }

  /** 更新线程的当前对话节点 */
  updateCurrentNode(threadId: string, nodeId: string): void {
    const thread = this.threads.get(threadId)
    if (thread) {
      thread.currentNodeId = nodeId
    }
  }

  /** 获取单个线程 */
  getThread(threadId: string): DialogThread | undefined {
    const t = this.threads.get(threadId)
    return t ? { ...t } : undefined
  }

  /** 获取所有可见线程（非 resolved 或所有） */
  getAllThreads(): DialogThread[] {
    return Array.from(this.threads.values()).map((t) => ({ ...t }))
  }

  /** 获取当前活跃线程 ID */
  getActiveThreadId(): string | null {
    return this.activeThreadId
  }

  /** 检查是否所有线程都已 resolved 或 deteriorated */
  allThreadsFinished(): boolean {
    const allThreads = Array.from(this.threads.values())
    for (const thread of allThreads) {
      if (thread.status !== 'resolved' && thread.status !== 'deteriorated') {
        return false
      }
    }
    return true
  }
}
