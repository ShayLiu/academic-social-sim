// ==================== Urgency 系统常量 ====================
export const URGENCY_TICK_INTERVAL = 10       // 每N秒增加urgency
export const URGENCY_INCREMENT = 15           // 每次增加量
export const URGENCY_WARN_THRESHOLD = 50      // 黄色警告
export const URGENCY_ALERT_THRESHOLD = 80     // 红色催促，自动发送催促消息
export const URGENCY_CRITICAL_THRESHOLD = 100 // 恶化事件触发

// ==================== 能量系统常量 ====================
export const INITIAL_ENERGY = 100
export const ENERGY_BREAKDOWN_THRESHOLD = 30  // <30解锁失控选项
export const ENERGY_SHUTDOWN = 0              // 归零=宕机结局

// ==================== 一致性系统常量 ====================
export const INITIAL_CONSISTENCY = 100
export const CONTRADICTION_PENALTY = 20       // 连续矛盾额外扣分
export const CONSISTENCY_QUESTION_THRESHOLD = 50  // <50角色质疑

// ==================== 地雷系统常量 ====================
export const MINE_SILENCE_DURATION = 2000     // 地雷触发后全场安静2秒(毫秒)
export const MINE_SHAKE_DURATION = 600        // 震动持续时间(毫秒)

// ==================== 信息差系统常量 ====================
export const INFO_EXPOSE_WARNING_TIME = 30    // 信息即将暴露前N秒闪烁提示

// ==================== 游戏节奏常量 ====================
export const GAME_TICK_INTERVAL = 1000        // 游戏主循环间隔(毫秒)
export const DEFAULT_SCENARIO_TIME = 600      // 默认场景时间(秒)

// ==================== 难度描述 ====================
export const DIFFICULTY_LABELS: Record<number, string> = {
  1: '初入江湖',
  2: '暗流涌动',
  3: '修罗试炼',
  4: '步步惊心',
  5: '生死棋局',
}

export const DIFFICULTY_COLORS: Record<number, string> = {
  1: 'text-green-400',
  2: 'text-yellow-400',
  3: 'text-orange-400',
  4: 'text-red-400',
  5: 'text-red-600',
}
