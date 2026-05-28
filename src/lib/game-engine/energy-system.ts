import {
  INITIAL_ENERGY,
  ENERGY_BREAKDOWN_THRESHOLD,
  ENERGY_SHUTDOWN,
} from '../constants'

export type EnergyLevel = 'high' | 'medium' | 'low' | 'critical'

/**
 * 情绪能量系统。
 * 管理玩家的情绪能量消耗与恢复，低能量解锁情绪失控选项。
 */
export class EnergySystem {
  private energy: number = INITIAL_ENERGY

  constructor() {}

  /** 消耗能量，不会低于 0 */
  consume(amount: number): void {
    this.energy = Math.max(0, this.energy - Math.abs(amount))
  }

  /** 恢复能量，不会超过 INITIAL_ENERGY */
  recover(amount: number): void {
    this.energy = Math.min(INITIAL_ENERGY, this.energy + Math.abs(amount))
  }

  /** 能量 < ENERGY_BREAKDOWN_THRESHOLD 时，情绪失控选项可用 */
  isBreakdownAvailable(): boolean {
    return this.energy < ENERGY_BREAKDOWN_THRESHOLD
  }

  /** 能量 <= 0 时，玩家宕机（强制结束） */
  isShutdown(): boolean {
    return this.energy <= ENERGY_SHUTDOWN
  }

  /** 返回当前能量值 */
  getEnergy(): number {
    return this.energy
  }

  /**
   * 返回能量等级描述。
   * - high:     >= 70
   * - medium:   >= 40
   * - low:      >= ENERGY_BREAKDOWN_THRESHOLD (30)
   * - critical: < ENERGY_BREAKDOWN_THRESHOLD
   */
  getEnergyLevel(): EnergyLevel {
    if (this.energy >= 70) return 'high'
    if (this.energy >= 40) return 'medium'
    if (this.energy >= ENERGY_BREAKDOWN_THRESHOLD) return 'low'
    return 'critical'
  }
}
