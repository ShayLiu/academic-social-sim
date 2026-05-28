import type {
  Character,
  PlayerState,
  BehindEvaluation,
  CharacterAttitude,
} from '../../types/game'

/** 渠道模板 */
const CHANNELS = [
  '{name}在实验室群里提到了你...',
  '{name}晚上给{other}发了条消息...',
  '行政群里的备注被{name}悄悄改了...',
  '{name}在茶水间和{other}聊起了你...',
  '{name}在朋友圈发了条意味深长的动态...',
  '{name}在组会后跟{other}单独说了几句...',
  '有人看到{name}在导师办公室提到了你...',
  '{name}在学术会议晚宴上无意间提了一嘴...',
]

/** 正面评价模板 */
const POSITIVE_TEMPLATES = [
  '"这个人挺会说话的，以后可以多接触。"',
  '"态度还不错，比上次那个强多了。"',
  '"是个聪明人，知道什么该说什么不该说。"',
  '"挺靠谱的，可以考虑以后合作。"',
  '"说话有分寸，不像有些人。"',
]

/** 中性评价模板 */
const NEUTRAL_TEMPLATES = [
  '"就那样吧，没什么特别印象。"',
  '"还行，不过也没什么记忆点。"',
  '"来了，走了，就这样。"',
  '"中规中矩，看不出什么。"',
]

/** 负面评价模板 */
const NEGATIVE_TEMPLATES = [
  '"这个人说话前后不一致，得小心。"',
  '"太急了，不够沉稳，还得练。"',
  '"不太会看场合说话，以后注意别让ta参加重要场合。"',
  '"说了些不该说的，这人心里没数。"',
]

/** 讽刺评价模板 */
const SARCASTIC_TEMPLATES = [
  '"有意思，ta自己还不知道大家都知道了吧。"',
  '"（笑）你猜ta知不知道自己说漏了嘴？"',
  '"演技不错，可惜漏洞太多了。"',
  '"哦对了，ta好像觉得自己表现挺好的。"',
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getTone(
  attitude: CharacterAttitude,
  gossipFactor: number,
  grudgeMemory: number,
  playerConsistency: number
): 'positive' | 'neutral' | 'negative' | 'sarcastic' {
  // 高记仇 + hostile = 负面或讽刺
  if (attitude === 'hostile') {
    return grudgeMemory >= 7 ? 'sarcastic' : 'negative'
  }
  if (attitude === 'wary') {
    // 一致性低的时候，wary 的角色更倾向讽刺
    if (playerConsistency < 50) return 'sarcastic'
    return 'negative'
  }
  if (attitude === 'friendly') {
    return 'positive'
  }
  // neutral
  if (gossipFactor > 0.6) return 'sarcastic'
  return 'neutral'
}

/**
 * 身后评价生成器。
 * 根据每个角色的性格参数和玩家行为，生成个性化的背后议论。
 */
export class ReviewGenerator {
  private allCharacters: Character[]

  constructor(characters: Character[]) {
    this.allCharacters = [...characters]
  }

  /** 为所有角色生成身后评价 */
  generateReviews(
    playerState: PlayerState,
    characters: Character[]
  ): BehindEvaluation[] {
    const evaluations: BehindEvaluation[] = []
    const charNames = characters.map((c) => c.name)

    for (const character of characters) {
      const attitude =
        playerState.attitudes[character.id] ?? character.initialAttitude
      const { gossipFactor, grudgeMemory } = this.getCharacterParams(character)

      // gossipFactor 低的角色可能不会说闲话
      if (gossipFactor < 0.3 && attitude !== 'hostile') {
        // 30% 概率还是会说
        if (Math.random() > 0.3) continue
      }

      const tone = getTone(
        attitude,
        gossipFactor,
        grudgeMemory,
        playerState.consistency
      )

      // 生成渠道
      const otherNames = charNames.filter((n) => n !== character.name)
      const otherName =
        otherNames.length > 0 ? pickRandom(otherNames) : '同事'
      const channel = pickRandom(CHANNELS)
        .replace('{name}', character.name)
        .replace('{other}', otherName)

      // 生成评价内容
      const content = this.generateContent(
        tone,
        character,
        playerState,
        attitude
      )

      // 有些角色会顺便揭露玩家不知道的信息
      let revealedInfo: string | undefined
      if (gossipFactor > 0.7 && playerState.exposedInfo.length > 0) {
        revealedInfo = `（顺带一提，${character.name}其实早就知道${
          playerState.exposedInfo.length > 0
            ? '你那些事'
            : '一些你不清楚的事'
        }。）`
      }

      evaluations.push({
        characterId: character.id,
        characterName: character.name,
        channel,
        content,
        tone,
        revealedInfo,
      })
    }

    return evaluations
  }

  /** 根据角色性格和态度生成评价内容 */
  private generateContent(
    tone: 'positive' | 'neutral' | 'negative' | 'sarcastic',
    character: Character,
    playerState: PlayerState,
    attitude: CharacterAttitude
  ): string {
    let templates: string[]

    switch (tone) {
      case 'positive':
        templates = POSITIVE_TEMPLATES
        break
      case 'neutral':
        templates = NEUTRAL_TEMPLATES
        break
      case 'negative':
        templates = NEGATIVE_TEMPLATES
        break
      case 'sarcastic':
        templates = SARCASTIC_TEMPLATES
        break
    }

    let base = pickRandom(templates)

    // 个性化修饰：高权力指数的角色评价更居高临下
    if (character.personality.powerIndex > 70 && tone === 'negative') {
      base += ' "这种人在学术圈走不远的。"'
    }

    // 高记仇角色会翻旧账
    if (
      character.personality.grudgeMemory >= 8 &&
      playerState.contradictions.length > 0
    ) {
      const contradiction = playerState.contradictions[0]
      base += ` （${character.name}还特意提到了你在"${contradiction.topic}"上的前后矛盾。）`
    }

    // 地雷相关
    const triggeredMinesOnChar = playerState.triggeredMines.filter(
      (mineId) => {
        // 简单关联检查 - 实际应用中可以做更精确的映射
        return true
      }
    )
    if (triggeredMinesOnChar.length > 0 && attitude === 'hostile') {
      base += ' "而且那次的事我可记着呢。"'
    }

    return base
  }

  private getCharacterParams(character: Character): {
    gossipFactor: number
    grudgeMemory: number
  } {
    return {
      gossipFactor: character.socialParams.gossipFactor,
      grudgeMemory: character.personality.grudgeMemory,
    }
  }
}
