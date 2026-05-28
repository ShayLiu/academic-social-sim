import type { ScenarioData } from '../../types/scenario'

export const s03TransferPhd: ScenarioData = {
  id: 's03',
  phase: 'masters',
  title: '研二转博谈判',
  subtitle: '师兄占坑',
  description:
    '你是研二硕士，想转博继续深造。但导师办公室里暗流涌动——名额有限，师兄在争，博后知道真相，而导师在犹豫不决。',
  briefing:
    '你是某985高校研二学生，跟着某优青做了一年半课题，已发表一篇SCI二区。你决定转博，提前跟导师约了时间面谈。但你不知道的是：今年的博士名额只剩一个，你的师兄（博三）也在争这个名额——虽然他已经拿到了某大厂的offer。组里的博后知道一些内幕，但他自己的处境也很微妙。今天下午，导师终于有空见你了。',
  difficulty: 3,
  estimatedMinutes: 25,
  playerRole: '某研二硕士，想转博',
  setting: '导师办公室',
  timeOfDay: '周三下午15:00',
  atmosphere:
    '导师的办公室不大，书架上堆满了论文和书。桌上有一杯凉了的咖啡。你坐在导师对面的椅子上，感觉椅子有点矮——后来你才意识到，这是刻意的。窗外是实验楼的走廊，偶尔有人经过。',

  // ==================== 角色 ====================
  characters: [
    {
      id: 'youqing-anxious',
      name: '某优青（焦虑型）',
      title: '教授/国家优秀青年基金获得者',
      age: 42,
      description:
        '拿了优青但在冲杰青的路上，发文章的压力巨大。对学生不算苛刻，但情绪不稳定，做决定经常反复。学生们私下叫他"犹豫哥"。',
      avatar: 'youqing-male-anxious',
      personality: {
        faceWeight: 0.7,
        powerIndex: 75,
        grudgeMemory: 5,
        allianceFlexibility: 0.5,
        emotionalVolatility: 0.7,
      },
      socialParams: {
        approachability: 60,
        attentionSpan: 180,
        preferredTopics: ['课题进展', '发表计划', '实验数据'],
        forbiddenTopics: ['杰青申报', '跳槽', '其他导师'],
        networkValue: 70,
        gossipFactor: 0.2,
        greetingStyle: 'casual',
        exitSignals: ['我再想想', '你先回去做实验', '这事不急'],
        memoryDuration: 18,
      },
      hiddenAgenda:
        '名额已经口头答应给博三师兄了，但师兄最近态度暧昧让他犹豫。需要有人继续课题出成果支撑杰青申报。',
      initialAttitude: 'neutral',
      role: 'antagonist',
      initialPosition: '办公桌后面',
      relationship: '你的硕士导师',
    },
    {
      id: 'phd3-critical',
      name: '某博三（关键节点型）',
      title: '博士三年级',
      age: 28,
      description:
        '在组里待了五年，发了几篇文章但没有一篇顶刊。已经拿到某大厂年薪五十万的offer，正在犹豫要不要放弃学术。他占着唯一的转博名额。',
      avatar: 'phd3-male-tense',
      personality: {
        faceWeight: 0.6,
        powerIndex: 30,
        grudgeMemory: 7,
        allianceFlexibility: 0.3,
        emotionalVolatility: 0.6,
      },
      socialParams: {
        approachability: 40,
        attentionSpan: 90,
        preferredTopics: ['就业', '毕业进度', '行业动态'],
        forbiddenTopics: ['转博名额', '他的去留'],
        networkValue: 25,
        gossipFactor: 0.4,
        greetingStyle: 'casual',
        exitSignals: ['我还有实验要看', '你自己跟老板说吧'],
        memoryDuration: 24,
      },
      hiddenAgenda:
        '已经拿到大厂offer但不敢告诉导师。如果走了，名额自然空出来；但如果被提前暴露，导师会觉得他不忠诚。',
      initialAttitude: 'wary',
      role: 'antagonist',
      initialPosition: '实验室隔壁，随时可能出现',
      relationship: '你的博三师兄，竞争对手',
    },
    {
      id: 'postdoc-limbo',
      name: '某博后（过渡迷茫型）',
      title: '博士后',
      age: 31,
      description:
        '在组里做了两年博后，合同快到期，下一步不确定。他知道组里所有的内幕，但因为自己的处境不敢多说。偶尔会用暗示的方式帮你。',
      avatar: 'postdoc-male-tired',
      personality: {
        faceWeight: 0.3,
        powerIndex: 20,
        grudgeMemory: 2,
        allianceFlexibility: 0.8,
        emotionalVolatility: 0.3,
      },
      socialParams: {
        approachability: 70,
        attentionSpan: 240,
        preferredTopics: ['学术前景', '职业规划', '组内八卦'],
        forbiddenTopics: ['他的出路', '合同续签'],
        networkValue: 35,
        gossipFactor: 0.6,
        greetingStyle: 'warm',
        exitSignals: ['我就不多说了', '你自己想吧', '这话你别说是我说的'],
        memoryDuration: 12,
      },
      hiddenAgenda:
        '知道师兄已经拿了offer，知道导师在犹豫。他同情你，但更担心自己的续聘问题——如果得罪了导师，他连博后都做不下去。',
      initialAttitude: 'friendly',
      role: 'ally',
      initialPosition: '公共休息室，抽烟/喝咖啡的地方',
      relationship: '组内博后，潜在信息源',
    },
  ],

  // ==================== 对话线程 ====================
  threads: [
    {
      id: 'thread-mentor',
      characterId: 'youqing-anxious',
      label: '与导师面谈转博事宜',
      urgency: 60,
      status: 'active',
      currentNodeId: 's03-mentor-01',
      lastInteractedAt: 0,
      autoMessages: [
        '导师看了一眼手机，似乎在想别的事。',
        '导师叹了口气，翻了翻桌上的材料。',
        '导师的电话响了，他示意你等一下。',
      ],
      deteriorateEvent:
        '导师突然说"今天时间不够了，改天再聊"——这意味着你的转博申请被无限期搁置。在学术圈，"改天"就是"没戏"。',
    },
    {
      id: 'thread-rival',
      characterId: 'phd3-critical',
      label: '师兄暗战——争夺唯一的名额',
      urgency: 30,
      status: 'waiting',
      currentNodeId: 's03-rival-01',
      lastInteractedAt: 0,
      autoMessages: [
        '你在走廊里撞见师兄，他面色不善地看了你一眼。',
        '师兄在实验室里大声打了个电话，似乎在和什么公司谈。',
        '师兄突然出现在导师办公室门口，敲了敲门。',
      ],
      deteriorateEvent:
        '师兄直接去找导师摊牌了。你失去了主动权，变成了被动等待结果的角色。',
    },
    {
      id: 'thread-postdoc',
      characterId: 'postdoc-limbo',
      label: '博后暗示——知道内幕的人',
      urgency: 15,
      status: 'waiting',
      currentNodeId: 's03-postdoc-01',
      lastInteractedAt: 0,
      autoMessages: [
        '博后在茶水间看到你，欲言又止。',
        '博后给你发了一条微信："今晚有空聊聊吗？"',
        '博后在你桌上放了一杯咖啡，什么都没说就走了。',
      ],
      deteriorateEvent:
        '博后觉得你不需要他的帮助，不再暗示任何内幕。你将在信息极度不对称的情况下做出决定。',
    },
  ],

  // ==================== 对话节点 ====================
  dialogNodes: [
    // ========== 导师面谈线 thread-mentor ==========
    {
      id: 's03-mentor-01',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师放下手机，抬头看你："坐。你约我聊什么，说吧。"他的语气不算冷，但也谈不上热情。桌上摊开的基金申请书被他随手翻了过去。',
      emotion: 'distracted',
      options: [
        {
          id: 's03-mentor-01-opt-a',
          text: '老师，我想跟您谈转博的事。我已经研二了，也发了一篇文章，想继续跟着您深造。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's03-mentor-02',
          characterReaction:
            '导师的手指在桌上敲了两下，表情没什么变化："嗯，这个事情……我知道你有这个想法。"',
          stanceRecord: { topic: '转博意向', stance: '正面表态' },
        },
        {
          id: 's03-mentor-01-opt-b',
          text: '老师，我最近在考虑未来的发展方向，想听听您的建议。是继续读博好呢，还是……',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-mentor-02b',
          characterReaction:
            '导师微微皱眉："你自己都没想清楚？"他对"还是……"后面没说的话产生了警觉。',
          stanceRecord: { topic: '转博意向', stance: '模糊试探' },
        },
        {
          id: 's03-mentor-01-opt-c',
          text: '老师，我听说今年有转博名额，我想申请。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's03-mentor-02',
          characterReaction:
            '导师愣了一下："你怎么知道有名额的？"他的语气多了一丝警惕。',
        },
      ],
    },
    {
      id: 's03-mentor-02',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师沉默了几秒，然后说："转博这个事情呢，不是你想转就能转的。名额有限，每年就那么一两个。而且你知道，师兄他也在考虑……"他没有说完，但你听出了弦外之音。',
      emotion: 'evasive',
      options: [
        {
          id: 's03-mentor-02-opt-a',
          text: '老师，我理解名额紧张。但我觉得以我目前的成果和进展，应该有竞争力的。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's03-mentor-03',
          characterReaction:
            '导师叹了口气："成果是一方面，但还有其他考量……"他似乎想说什么又咽了回去。',
          stanceRecord: { topic: '名额竞争', stance: '强调自身实力' },
        },
        {
          id: 's03-mentor-02-opt-b',
          text: '老师，师兄不是快毕业了吗？他还需要名额吗？',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's03-mentor-03b',
          characterReaction:
            '导师的表情微妙地变了："他的情况比较复杂，你不用管别人。"',
          stanceRecord: { topic: '名额竞争', stance: '试探师兄情况' },
        },
        {
          id: 's03-mentor-02-opt-c',
          text: '老师，如果名额不够的话，我也可以考虑硕转博或者考博……还有别的路吗？',
          energyCost: 3,
          consistencyImpact: -2,
          nextNodeId: 's03-mentor-03c',
          characterReaction:
            '导师挑了挑眉："你这是在给自己留退路？"他的语气里有一丝不满。',
          stanceRecord: { topic: '转博意向', stance: '暗示有退路' },
        },
      ],
    },
    {
      id: 's03-mentor-02b',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师靠在椅背上，有些不耐烦地说："你到底是想读博还是不想？做学术这条路，犹犹豫豫是走不通的。你看你师兄，在组里五年了，现在也在犹豫——"他突然闭了嘴，意识到说多了。',
      emotion: 'annoyed',
      options: [
        {
          id: 's03-mentor-02b-opt-a',
          text: '老师，我想清楚了，我要转博。是之前表述不好，请您再给我一个机会说清楚。',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's03-mentor-03',
          characterReaction:
            '导师看了你一眼："好，你说。"但他的耐心明显不多了。',
          stanceRecord: { topic: '转博意向', stance: '坚定表态' },
        },
        {
          id: 's03-mentor-02b-opt-b',
          text: '老师您刚才说师兄也在犹豫——他在犹豫什么？',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's03-mentor-03b',
          characterReaction:
            '导师的脸色变了："我说多了。你别问别人的事，说你自己的。"',
        },
      ],
    },
    {
      id: 's03-mentor-03',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师站起来倒了杯水，背对着你说："你是个好苗子，我不否认。但这个事情……我已经跟某人有过承诺了。你明白吗？"他用的是"某人"，不是"师兄"，但你心里清楚。',
      emotion: 'conflicted',
      options: [
        {
          id: 's03-mentor-03-opt-a',
          text: '老师，我理解您的难处。但如果那个"某人"最终不需要这个名额呢？我能不能作为候补？',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's03-mentor-04',
          characterReaction:
            '导师转过身，看了你一眼："你为什么觉得他不需要？你听说了什么？"语气突然尖锐起来。',
          stanceRecord: { topic: '名额竞争', stance: '暗示知道内情' },
        },
        {
          id: 's03-mentor-03-opt-b',
          text: '老师，承诺归承诺，但学术应该看实力和成果吧？我觉得公平竞争对大家都好。',
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's03-mentor-04b',
          characterReaction:
            '导师沉默了很久。"公平竞争"这四个字，在学术圈几乎是最天真的话——但也最刺痛人。',
          stanceRecord: { topic: '名额竞争', stance: '要求公平' },
        },
        {
          id: 's03-mentor-03-opt-c',
          text: '老师，如果名额真的没了，那我就踏踏实实读完硕士，不为难您。',
          energyCost: 3,
          consistencyImpact: -5,
          nextNodeId: 's03-mentor-04c',
          characterReaction:
            '导师松了口气，但也有一点失望。他本以为你会争取一下。"那你回去好好做实验，毕业论文抓紧。"',
          stanceRecord: { topic: '转博意向', stance: '放弃争取' },
        },
      ],
    },
    {
      id: 's03-mentor-03b',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师明显不想谈师兄的事。他快速转移话题："你不用管别人怎么样。你自己呢？你觉得你读博的优势是什么？你有明确的研究计划吗？"他切入了面试模式，语气变得公式化。',
      emotion: 'deflecting',
      options: [
        {
          id: 's03-mentor-03b-opt-a',
          text: '老师，我的优势是我在XX方向已经有了基础，SCI二区的文章也证明了我的能力。读博的话，我计划在XX方向深挖，目标是发一篇一区或顶刊。',
          energyCost: 8,
          consistencyImpact: 8,
          nextNodeId: 's03-mentor-04',
          characterReaction:
            '导师的眼神亮了一下——"发一区或顶刊"正好是他杰青申报需要的。',
          stanceRecord: { topic: '学术规划', stance: '有明确目标' },
        },
        {
          id: 's03-mentor-03b-opt-b',
          text: '我……还在梳理。我想继续现在的课题，但具体做什么还需要跟您讨论。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's03-mentor-04c',
          characterReaction:
            '导师叹了口气。又一个没想清楚的。',
        },
      ],
    },
    {
      id: 's03-mentor-03c',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师皱着眉："你是铁了心要走是不是？"他把"不读博"等同于"离开学术圈"，对他来说，学生不读博就是一种背叛。',
      emotion: 'suspicious',
      options: [
        {
          id: 's03-mentor-03c-opt-a',
          text: '不不不，老师我不是要走！我是想读博的，只是不想给您添麻烦。如果有机会，我一定想转博。',
          energyCost: 10,
          consistencyImpact: -5,
          nextNodeId: 's03-mentor-04',
          characterReaction:
            '导师的脸色缓和了一些，但你的前后矛盾已经被他记下了。',
          stanceRecord: { topic: '转博意向', stance: '反复摇摆' },
        },
        {
          id: 's03-mentor-03c-opt-b',
          text: '老师，我不是要走。只是如果名额紧张，我不想让您为难。',
          energyCost: 5,
          consistencyImpact: 2,
          nextNodeId: 's03-mentor-04',
          characterReaction:
            '导师沉默了一会："你不用替我操心，你说你自己想不想。"',
        },
      ],
    },
    {
      id: 's03-mentor-04',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师在桌前踱步，突然停下来看着你："我跟你说实话吧——名额确实给了你师兄。但最近他有些……不太对劲。如果他有别的打算，这个名额可能会空出来。你先别急，但也别声张。"',
      emotion: 'candid',
      options: [
        {
          id: 's03-mentor-04-opt-a',
          text: '老师，我明白了。我会耐心等，同时把手上的课题做好。',
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's03-mentor-05',
          characterReaction:
            '导师满意地点头："嗯，你就是这个态度就好。别急，让子弹飞一会。"',
          stanceRecord: { topic: '策略', stance: '耐心等待' },
        },
        {
          id: 's03-mentor-04-opt-b',
          text: '老师，师兄是不是拿了工业界的offer？我在走廊里好像听到他打电话……',
          energyCost: 8,
          consistencyImpact: -8,
          triggersMine: 'mine-expose-eavesdrop',
          nextNodeId: 's03-mentor-05b',
          characterReaction:
            '导师的脸色突变："你偷听师兄打电话？"他的声音提高了几度。',
          riskTag: '雷区：暴露偷听',
        },
        {
          id: 's03-mentor-04-opt-c',
          text: '老师，那我能不能直接跟师兄谈谈，了解一下他的想法？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-mentor-05c',
          characterReaction:
            '导师连忙摆手："你千万别去找他！这种事情让我来处理。你去了只会把事情搞砸。"',
        },
      ],
    },
    {
      id: 's03-mentor-04b',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师被"公平竞争"四个字击中了。他沉默了很久，然后苦笑："你知道为什么你还是学生吗？因为你还相信公平。在这个系统里，先来后到、关系亲疏、谁的成果能帮到我……这些才是现实。"',
      emotion: 'bitter',
      options: [
        {
          id: 's03-mentor-04b-opt-a',
          text: '老师，我不想跟您争这些。我只是希望您能看到我的努力和能力。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's03-mentor-05',
          characterReaction:
            '导师看了你好一会："你的能力我是认可的。但能力不是唯一的因素。"',
        },
        {
          id: 's03-mentor-04b-opt-b',
          text: '那老师您告诉我，我怎么做才能拿到这个名额？',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's03-mentor-05',
          characterReaction:
            '导师沉吟片刻："你如果能在下个月之前再投一篇文章……也许事情会有转机。"',
          stanceRecord: { topic: '策略', stance: '务实争取' },
        },
      ],
    },
    {
      id: 's03-mentor-04c',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师摆了摆手："行了，你回去吧。硕士论文好好写，别分心。"他已经失去了继续谈的兴趣。你的退让被解读为缺乏决心——在学术圈，不争取就意味着退出。',
      emotion: 'dismissive',
      options: [
        {
          id: 's03-mentor-04c-opt-a',
          text: '好的老师……那以后如果有机会，我还是想试一下的。',
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's03-mentor-05-end',
          characterReaction:
            '导师已经低头看基金申请书了，头也不抬地"嗯"了一声。',
        },
        {
          id: 's03-mentor-04c-opt-b',
          text: '（站起来，准备离开，但又坐了回去）老师，其实我真的想读博。我刚才说不为难您是客气话。',
          energyCost: 12,
          consistencyImpact: -8,
          nextNodeId: 's03-mentor-05',
          characterReaction:
            '导师抬起头，看着你。"客气话？你跟导师说客气话？"他的语气很复杂。',
          stanceRecord: { topic: '转博意向', stance: '反转争取' },
        },
      ],
    },
    {
      id: 's03-mentor-05',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师终于正色了，认真地看着你说："我跟你交个底。你师兄的情况我在处理，你不要介入。你现在能做的就是把手上的实验做好、文章投出去。如果一切顺利，可能——注意我说的是可能——你有机会。但你不能跟任何人说我今天跟你谈的这些。"',
      emotion: 'serious',
      options: [
        {
          id: 's03-mentor-05-opt-a',
          text: '老师我明白了，保密没问题。我会加紧做实验的。',
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's03-mentor-06',
          characterReaction:
            '导师松了口气，站起来送你到门口。"去吧，好好干。"',
          stanceRecord: { topic: '策略', stance: '服从安排' },
        },
        {
          id: 's03-mentor-05-opt-b',
          text: '老师，"可能"是多大的可能？我需要一个明确的答复来规划我的时间。',
          energyCost: 10,
          consistencyImpact: 3,
          nextNodeId: 's03-mentor-06b',
          characterReaction:
            '导师的脸色不太好："你在跟我谈判？"停顿了一下，又说："五五开吧。行了，你走吧。"',
          stanceRecord: { topic: '策略', stance: '要求承诺' },
        },
        {
          id: 's03-mentor-05-opt-c',
          text: '老师，如果师兄最后不走呢？那我就永远没有机会了？',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's03-mentor-06c',
          characterReaction:
            '导师沉默了。这个问题他也没有答案。',
        },
      ],
    },
    {
      id: 's03-mentor-05b',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师猛地拍了一下桌子："你怎么能偷听别人的电话！"他的情绪突然爆发了。"你知道如果师兄知道了会怎样吗？整个组的信任就毁了！"',
      emotion: 'angry',
      options: [
        {
          id: 's03-mentor-05b-opt-a',
          text: '老师对不起，我不是故意的！是路过的时候无意听到的……',
          energyCost: 15,
          consistencyImpact: -8,
          nextNodeId: 's03-mentor-06-damage',
          characterReaction:
            '导师深吸一口气，努力平复情绪。"这事你要是传出去，你也别想读博了。"',
        },
        {
          id: 's03-mentor-05b-opt-b',
          text: '老师，我没有偷听。我只是猜到了——他最近表现太明显了。',
          energyCost: 10,
          consistencyImpact: 0,
          nextNodeId: 's03-mentor-06-damage',
          characterReaction:
            '导师冷冷地看着你，不确定你说的是真是假。"你挺会猜的。"',
        },
      ],
    },
    {
      id: 's03-mentor-05c',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: '导师的反应异常激烈："你千万别去！"他压低声音，"你跟他谈只会让他觉得我在背后操纵什么。你不了解他的性格——他要是觉得被算计了，他会跟我翻脸。"',
      emotion: 'alarmed',
      options: [
        {
          id: 's03-mentor-05c-opt-a',
          text: '好的老师，我不去。一切听您安排。',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's03-mentor-06',
          characterReaction: '导师这才放下心来。"对，就这样。你别多事。"',
        },
        {
          id: 's03-mentor-05c-opt-b',
          text: '但老师，我不能一直这样被动等着啊……',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's03-mentor-06c',
          characterReaction:
            '导师烦躁地摸了摸额头。"你急什么？你才研二！有的是时间！"但你知道，在他眼里"有的是时间"只是拖延的借口。',
        },
      ],
    },
    {
      id: 's03-mentor-06',
      threadId: 'thread-mentor',
      speaker: 'narrator',
      text: '你走出导师办公室，心情复杂。导师给了你一个模糊的希望——"可能"有机会。但这个"可能"取决于师兄的选择，而不是你自己的努力。在学术圈，你第一次真切地体会到：有些决定不在你手里。',
      options: [],
    },
    {
      id: 's03-mentor-06b',
      threadId: 'thread-mentor',
      speaker: 'narrator',
      text: '导师把你送到门口，临了说了句："年轻人，别太着急。好事多磨。"但你看得出他自己比你还急——杰青的申报截止日期就在下半年。你们都在跟时间赛跑，只是跑道不同。',
      options: [],
    },
    {
      id: 's03-mentor-06c',
      threadId: 'thread-mentor',
      speaker: 'youqing-anxious',
      text: `导师长长地叹了一口气："你要是实在等不了，还有一条路——你去考博。不一定要在我们组。但我告诉你，走这条路就意味着你不再是'我的学生'了。你想清楚。"`,
      emotion: 'cold',
      options: [
        {
          id: 's03-mentor-06c-opt-a',
          text: '老师，我不会考虑其他组的。我就想跟着您。',
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's03-mentor-06',
          characterReaction:
            '导师点点头，但你不确定这算是感动还是施压成功。',
          stanceRecord: { topic: '忠诚度', stance: '表忠心' },
        },
        {
          id: 's03-mentor-06c-opt-b',
          text: '老师，我先不做决定。我回去好好想想。',
          energyCost: 3,
          consistencyImpact: 2,
          nextNodeId: 's03-mentor-06',
          characterReaction: '导师冷冷地说了句"嗯"，你走出了办公室。',
        },
      ],
    },
    {
      id: 's03-mentor-05-end',
      threadId: 'thread-mentor',
      speaker: 'narrator',
      text: '导师面谈草草结束。你走出办公室时，心里只有一个念头——你是不是太软了？在学术圈，客气和软弱之间的界限，比论文里的p值还模糊。',
      options: [],
    },
    {
      id: 's03-mentor-06-damage',
      threadId: 'thread-mentor',
      speaker: 'narrator',
      text: '你被导师严厉训斥了一顿后走出办公室。不管师兄最终去不去工业界，你和导师之间的信任已经出现了裂痕。在一个靠信任运转的师徒关系里，这道裂痕可能永远不会愈合。',
      options: [],
    },

    // ========== 师兄暗战线 thread-rival ==========
    {
      id: 's03-rival-01',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '晚饭后你回到实验室，师兄正坐在工位上刷手机。看到你进来，他放下手机，面无表情地说："刚从老板办公室出来？聊什么了？"他的语气很随意，但眼睛在盯着你。',
      emotion: 'suspicious',
      options: [
        {
          id: 's03-rival-01-opt-a',
          text: '啊，没什么，就聊了下课题进展。师兄你在忙啥？',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's03-rival-02',
          characterReaction:
            '师兄"嗯"了一声，但明显不信。他在组里时间够长，知道"聊课题"不用关门。',
          stanceRecord: { topic: '对师兄', stance: '隐瞒真实目的' },
        },
        {
          id: 's03-rival-01-opt-b',
          text: '聊转博的事。师兄，你知道今年名额怎么安排的吗？',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-02b',
          characterReaction:
            '师兄的脸色瞬间变了。他坐直了身体，语气冷了下来："你要转博？"',
          stanceRecord: { topic: '对师兄', stance: '坦白意图' },
        },
        {
          id: 's03-rival-01-opt-c',
          text: '聊毕业论文的事。师兄你博三了，论文写到哪了？',
          energyCost: 3,
          consistencyImpact: -2,
          nextNodeId: 's03-rival-02c',
          characterReaction:
            '师兄苦笑："别提了。"他的语气里有一种你还读不懂的疲惫。',
        },
      ],
    },
    {
      id: 's03-rival-02',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄没再追问，但过了一会，他突然说："学弟，我跟你说句心里话——这个组，不值得你留太久。"他说完就低头继续看手机，好像只是随口一提。',
      emotion: 'cryptic',
      options: [
        {
          id: 's03-rival-02-opt-a',
          text: '师兄为什么这么说？是老板不好吗？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-03',
          characterReaction:
            '师兄抬头看了看门口确认没人，压低声音："不是不好，是……你以后就知道了。"',
        },
        {
          id: 's03-rival-02-opt-b',
          text: '师兄你是不是有什么打算？你最近好像有点不一样。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's03-rival-03b',
          characterReaction:
            '师兄的手在手机上停了一下："我有什么打算？我博三了，我还能有什么打算。"他在防备。',
        },
        {
          id: 's03-rival-02-opt-c',
          text: '师兄，如果你觉得这里不好，你怎么不走？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-03c',
          characterReaction:
            '师兄沉默了很久。"你以为我没想过？"',
        },
      ],
    },
    {
      id: 's03-rival-02b',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄的眼神变得锐利："你要转博？名额只有一个，你知道吧？"他站起来，走到你面前："我在这组待了五年。五年。你觉得这个名额该给谁？"',
      emotion: 'confrontational',
      options: [
        {
          id: 's03-rival-02b-opt-a',
          text: '师兄，我不是要跟你抢。我只是想了解一下情况。',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's03-rival-03',
          characterReaction:
            '师兄冷笑："不是要抢？那你跟老板关门聊什么？别把我当傻子。"',
        },
        {
          id: 's03-rival-02b-opt-b',
          text: '师兄，我觉得应该看实力和成果，对吧？公平竞争。',
          energyCost: 10,
          consistencyImpact: 5,
          triggersMine: 'mine-diss-senior',
          nextNodeId: 's03-rival-03-hostile',
          characterReaction:
            '师兄的脸涨红了。"公平竞争？你一个研二的跟我这个博三的谈公平竞争？你的实验数据还是我教你做的！"',
          riskTag: '雷区：当众拉踩师兄',
        },
        {
          id: 's03-rival-02b-opt-c',
          text: '师兄，不好意思，我不该直接这么说。我对名额的事不太了解，你别介意。',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-03',
          characterReaction:
            '师兄哼了一声，重新坐回去。气氛依然紧张。',
        },
      ],
    },
    {
      id: 's03-rival-02c',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄靠在椅子上，有些自嘲地说："论文？哈。老板给我的方向做了三年没有突破，现在让我换方向重来。你说我这博士还怎么读？"他的疲惫不像是装出来的。',
      emotion: 'exhausted',
      options: [
        {
          id: 's03-rival-02c-opt-a',
          text: '师兄辛苦了。三年换方向确实太难了。你有没有考虑过别的出路？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-03c',
          characterReaction:
            '师兄看了你一眼，欲言又止。他在犹豫要不要把真实想法告诉你。',
        },
        {
          id: 's03-rival-02c-opt-b',
          text: '师兄，不至于吧？你发了好几篇SCI了，总比我强多了。',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-03',
          characterReaction:
            '师兄苦笑："几篇三四区的SCI？在这个圈子里什么都不是。"',
        },
      ],
    },
    {
      id: 's03-rival-03',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄沉默了一会，突然问你："你知道老板为什么突然对你这么好吗？"他的语气很平静，但你感觉到一种暗流。',
      emotion: 'bitter',
      options: [
        {
          id: 's03-rival-03-opt-a',
          text: '可能是觉得我最近课题做得还行吧。',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-04',
          characterReaction:
            '师兄笑了，但笑容里没有一点温度："你啊，太天真了。他是需要一个接盘的人。"',
        },
        {
          id: 's03-rival-03-opt-b',
          text: '师兄你什么意思？你是不是知道什么？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-04',
          characterReaction:
            '师兄摇摇头："我什么都不知道。你自己小心吧。"他重新低头看手机，不再说话。',
        },
      ],
    },
    {
      id: 's03-rival-03b',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄收起手机，直视你："你在试探我？"他的语气突然变得很冷。"你是不是以为我要走，你就能上位了？"',
      emotion: 'defensive',
      options: [
        {
          id: 's03-rival-03b-opt-a',
          text: '师兄你想多了。我真的只是关心你。',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's03-rival-04',
          characterReaction:
            '师兄盯着你看了几秒，然后移开目光。"关心？在这个实验室里谁关心谁？"',
        },
        {
          id: 's03-rival-03b-opt-b',
          text: '师兄，我不否认我想转博。但你的事和我的事是两回事。',
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's03-rival-04b',
          characterReaction:
            '师兄沉默了。这个回答比他预想的要诚实，他一时不知道怎么反应。',
          stanceRecord: { topic: '对师兄', stance: '坦诚但划清界限' },
        },
      ],
    },
    {
      id: 's03-rival-03c',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄看了看四周确认没人，然后压低声音说："你问我有没有别的出路？说实话——有。但你不能告诉老板。"他停了一下，似乎在犹豫要不要继续说。',
      emotion: 'conflicted',
      options: [
        {
          id: 's03-rival-03c-opt-a',
          text: '师兄你放心，我不会说的。什么出路？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-04c',
          characterReaction:
            '师兄又犹豫了一下，最终还是开口了。',
          stanceRecord: { topic: '对师兄', stance: '承诺保密' },
        },
        {
          id: 's03-rival-03c-opt-b',
          text: '师兄，这种事你跟我说……我怕我夹在中间不好做。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's03-rival-04',
          characterReaction:
            '师兄苦笑了一下，不再说了。"你说得对，不该跟你说这些。"',
          stanceRecord: { topic: '对师兄', stance: '保持距离' },
        },
      ],
    },
    {
      id: 's03-rival-03-hostile',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄站了起来，声音开始发抖："你以为你是谁？你来了一年半就想抢我的位置？你的数据还是我教你分析的！"实验室里其他同学纷纷看过来。',
      emotion: 'furious',
      options: [
        {
          id: 's03-rival-03-hostile-opt-a',
          text: '师兄我不是这个意思……我只是想说大家各凭本事——',
          energyCost: 15,
          consistencyImpact: -5,
          nextNodeId: 's03-rival-04-damage',
          characterReaction:
            '师兄打断你："各凭本事？好啊，那我们去老板面前说清楚！"他转身就要往外走。',
        },
        {
          id: 's03-rival-03-hostile-opt-b',
          text: '对不起师兄，我说错话了。我绝对不是要跟你竞争。',
          energyCost: 12,
          consistencyImpact: -8,
          nextNodeId: 's03-rival-04-damage',
          characterReaction:
            '师兄深呼吸了几下，坐了回去。但他的眼神告诉你——从此以后你们不再是同一阵营的了。',
          attitudeShift: {
            characterId: 'phd3-critical',
            from: 'wary',
            to: 'hostile',
          },
        },
      ],
    },
    {
      id: 's03-rival-04',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: `师兄叹了口气，语气突然软了下来："算了，不说了。你做你的，我做我的。只是——如果有一天你发现老板给你的'机会'不是机会，而是一个坑，别说我没提醒你。"`,
      emotion: 'resigned',
      options: [
        {
          id: 's03-rival-04-opt-a',
          text: '师兄，谢谢你的提醒。不管怎样，你一直在帮我，我记着。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's03-rival-05',
          characterReaction:
            '师兄愣了一下，然后拍了拍你的肩膀。这可能是你们之间最后的善意了。',
        },
        {
          id: 's03-rival-04-opt-b',
          text: '师兄，你说的"坑"是什么意思？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-05',
          characterReaction:
            '师兄摇摇头："以后你就知道了。"他戴上耳机，不再说话。',
        },
      ],
    },
    {
      id: 's03-rival-04b',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄沉默了很久，然后说："你比我聪明。至少你知道什么时候该说什么话。"他看着窗外，不知道在想什么。"也许你比我更适合留在这个圈子里。"',
      emotion: 'reflective',
      options: [
        {
          id: 's03-rival-04b-opt-a',
          text: '师兄别这么说。你在学术上的积累比我扎实多了。',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-05',
          characterReaction: '师兄苦笑了一下，没有接话。',
        },
        {
          id: 's03-rival-04b-opt-b',
          text: '师兄，如果你真的不想继续了，其实没必要勉强。',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-05b',
          characterReaction:
            '师兄转过头看你。这是第一次有人跟他说"不用勉强"。他的眼眶有些红。',
        },
      ],
    },
    {
      id: 's03-rival-04c',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄犹豫再三，终于说了："有个大厂给我发了offer。年薪五十万。我在犹豫——走了就意味着五年白读了。但不走……我看不到头啊。"他的声音在发抖。',
      emotion: 'vulnerable',
      options: [
        {
          id: 's03-rival-04c-opt-a',
          text: '师兄，五十万啊……这个条件真的很好。你怎么想的？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-05b',
          characterReaction:
            '师兄苦涩地笑了："怎么想？我要是知道怎么想就好了。"',
        },
        {
          id: 's03-rival-04c-opt-b',
          text: '师兄，如果你走了……那转博名额是不是就空出来了？',
          energyCost: 5,
          consistencyImpact: -10,
          triggersMine: 'mine-expose-eavesdrop',
          nextNodeId: 's03-rival-04-damage',
          characterReaction:
            '师兄的脸色一变："你……你是为了名额才套我话的？"他的表情从脆弱变成愤怒。',
          riskTag: '雷区：暴露真实目的',
        },
      ],
    },
    {
      id: 's03-rival-04-damage',
      threadId: 'thread-rival',
      speaker: 'narrator',
      text: '你和师兄的关系彻底破裂了。在一个封闭的实验室里，和你共处一室的人视你为敌人——这意味着接下来的日子里，每一天都将是煎熬。更糟糕的是，师兄可能会把你的意图告诉导师，让一切变得更加复杂。',
      options: [],
    },
    {
      id: 's03-rival-05',
      threadId: 'thread-rival',
      speaker: 'narrator',
      text: `师兄戴上耳机，不再说话。你回到自己的工位，打开论文但一个字都看不进去。师兄的话在你脑子里反复回响——"如果有一天你发现老板给你的'机会'不是机会，而是一个坑……"`,
      options: [],
    },
    {
      id: 's03-rival-05b',
      threadId: 'thread-rival',
      speaker: 'phd3-critical',
      text: '师兄擦了擦眼睛，深吸一口气说："跟你说这些也没用。总之你别掺和我的事，我的选择我自己做。你要是想转博就好好跟老板表现，别打我的主意。"他戴上耳机，对话结束。',
      emotion: 'guarded',
      options: [
        {
          id: 's03-rival-05b-opt-a',
          text: '（点点头，默默回到工位。）',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-rival-06-end',
          characterReaction: '',
        },
      ],
    },
    {
      id: 's03-rival-06-end',
      threadId: 'thread-rival',
      speaker: 'narrator',
      text: '师兄暗战线结束。你和师兄之间的关系，从"学长带学弟"变成了"竞争者"——或者更复杂的什么。在学术圈，最亲近的人往往也是最大的威胁。',
      options: [],
    },

    // ========== 博后暗示线 thread-postdoc ==========
    {
      id: 's03-postdoc-01',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '第二天中午，你在茶水间遇到博后。他递给你一杯咖啡，看似随意地问："昨天跟老板聊得怎么样？"他的语气轻松，但眼神很认真。',
      emotion: 'casual',
      options: [
        {
          id: 's03-postdoc-01-opt-a',
          text: '还行吧，老板说了一些情况。博后哥，你在组里时间长，能不能给我点建议？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-02',
          characterReaction:
            '博后左右看了看，示意你去走廊阳台上说。"这里人多，不方便。"',
        },
        {
          id: 's03-postdoc-01-opt-b',
          text: '嗯……不太好说。博后哥，你觉得老板这个人怎么样？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-02b',
          characterReaction:
            '博后苦笑："你这问题问得太大了。走，出去说。"',
        },
        {
          id: 's03-postdoc-01-opt-c',
          text: '还好。对了博后哥，你的合同什么时候到期来着？',
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's03-postdoc-02c',
          characterReaction:
            '博后脸上的笑容僵了一下。"你怎么突然关心起我的合同了？"',
        },
      ],
    },
    {
      id: 's03-postdoc-02',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '到了阳台上，博后点了一支烟，压低声音说："我跟你透个底，但你绝对不能说是我说的。你师兄——他已经拿到某大厂的offer了。五十万年薪。老板不知道，或者说，他装作不知道。"',
      emotion: 'conspiratorial',
      options: [
        {
          id: 's03-postdoc-02-opt-a',
          text: '我知道。我昨天隐约猜到了。那这意味着名额会空出来？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-03',
          characterReaction:
            '博后吐了一口烟："你猜到了？"他上下打量你，"你比我以为的要聪明。"',
        },
        {
          id: 's03-postdoc-02-opt-b',
          text: '等等——五十万？他为什么不走？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-03',
          characterReaction:
            '博后叹气："因为他读了五年，走了觉得亏。不走又看不到头。他骑虎难下。"',
        },
        {
          id: 's03-postdoc-02-opt-c',
          text: '博后哥你为什么告诉我这些？对你有什么好处？',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's03-postdoc-03b',
          characterReaction:
            '博后愣了一下，然后苦笑："你这小子……心眼倒不少。"',
        },
      ],
    },
    {
      id: 's03-postdoc-02b',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后靠在阳台栏杆上，想了想说："老板这个人吧……不坏，但太犹豫。他做什么决定都反反复复。你要是指望他主动给你名额，你会等到地老天荒。"',
      emotion: 'frank',
      options: [
        {
          id: 's03-postdoc-02b-opt-a',
          text: '那我该怎么办？总不能硬逼吧？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-03',
          characterReaction:
            '博后掐灭烟："硬逼？那你就别在学术圈混了。有些事要用巧劲。"',
        },
        {
          id: 's03-postdoc-02b-opt-b',
          text: '博后哥，你在组里这么久，有没有什么内幕可以告诉我？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-03',
          characterReaction:
            '博后看了看周围，压低声音："你师兄的事，你知道多少？"',
        },
      ],
    },
    {
      id: 's03-postdoc-02c',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后的表情变得有些防备："我的合同下个月到期。老板还没说续不续。你问这个干嘛？"他在你身上看到了某种目的性——这让他不太舒服。',
      emotion: 'guarded',
      options: [
        {
          id: 's03-postdoc-02c-opt-a',
          text: '没什么，就是关心一下。博后哥你别多想。',
          energyCost: 3,
          consistencyImpact: -2,
          nextNodeId: 's03-postdoc-03',
          characterReaction:
            '博后"哦"了一声，信任度明显降了一点。但他还是准备告诉你一些事。',
        },
        {
          id: 's03-postdoc-02c-opt-b',
          text: '抱歉博后哥，不该问这个。其实我是想跟你请教一下转博的事……',
          energyCost: 5,
          consistencyImpact: 2,
          nextNodeId: 's03-postdoc-03',
          characterReaction:
            '博后缓和了一些："转博？行，我跟你说说我知道的情况。"',
        },
      ],
    },
    {
      id: 's03-postdoc-03',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后压低声音继续说："还有一件事你得知道——老板其实在犹豫要不要把名额给你师兄。因为你师兄最近做实验的积极性明显下降了，老板不傻，他感觉到了什么。但他碍于面子，不好意思直接问。所以现在是个微妙的僵局。"',
      emotion: 'analytical',
      options: [
        {
          id: 's03-postdoc-03-opt-a',
          text: '那我如果这时候表现得特别积极，是不是能让老板心里的天平倾斜？',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's03-postdoc-04',
          characterReaction:
            '博后点头："你悟性不错。但要注意分寸——太明显了老板会觉得你在算计。"',
          stanceRecord: { topic: '策略', stance: '主动出击' },
        },
        {
          id: 's03-postdoc-03-opt-b',
          text: '博后哥，你觉得我应该主动去跟师兄挑明吗？大家把话说开。',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-04b',
          characterReaction:
            '博后连忙摆手："千万别！你去跟他挑明，等于逼他做决定。他要是被逼急了直接留下来，你就彻底没戏了。"',
        },
        {
          id: 's03-postdoc-03-opt-c',
          text: '这些内幕……博后哥你怎么知道得这么清楚？你是不是老板的眼线？',
          energyCost: 10,
          consistencyImpact: -3,
          nextNodeId: 's03-postdoc-04c',
          characterReaction:
            '博后的脸色变了。"眼线？你以为我想知道这些？我在这个组里两年，这些事情想不知道都难。"',
        },
      ],
    },
    {
      id: 's03-postdoc-03b',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后掐灭烟，认真地看着你："你问我为什么帮你？实话跟你说——我不是帮你，我是帮自己。如果你师兄走了、你转了博，老板手里有人干活，我续聘的可能性就大一些。懂吗？"',
      emotion: 'honest',
      options: [
        {
          id: 's03-postdoc-03b-opt-a',
          text: '博后哥，你够坦诚。那咱们算是利益共同体了。',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's03-postdoc-04',
          characterReaction:
            '博后笑了："利益共同体？你小子行啊，官话都学会了。"',
          stanceRecord: { topic: '对博后', stance: '结盟' },
        },
        {
          id: 's03-postdoc-03b-opt-b',
          text: '博后哥，你帮我我很感谢。但你的事我可能帮不上什么忙……',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's03-postdoc-04',
          characterReaction:
            '博后摆摆手："你不用帮我什么。你只要把博转成了，就是帮我了。"',
        },
      ],
    },
    {
      id: 's03-postdoc-04',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后最后给了你一个建议："下周组会，你把最新的数据好好整理一下，做一个漂亮的汇报。让老板看到你的价值。但不要——我说不要——在组会上跟师兄对着干。你要让老板自己得出结论：你比师兄更值得留下。"',
      emotion: 'strategic',
      options: [
        {
          id: 's03-postdoc-04-opt-a',
          text: '明白了。让老板自己做选择，而不是我去推他。',
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's03-postdoc-05',
          characterReaction: '博后拍了拍你的肩膀："孺子可教。去吧。"',
        },
        {
          id: 's03-postdoc-04-opt-b',
          text: '但如果师兄那边一直拖着不做决定呢？我也不能一直等啊。',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-05',
          characterReaction:
            '博后想了想："如果拖到截止日期……那就看命了。但你能做的都做好，至少不留遗憾。"',
        },
      ],
    },
    {
      id: 's03-postdoc-04b',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后叹了口气："你知道最好的策略是什么吗？什么都不做。让你师兄自己犹豫出结果。你只要默默干活、默默出成果。时间站在你这边——因为他的offer不可能一直等他。"',
      emotion: 'wise',
      options: [
        {
          id: 's03-postdoc-04b-opt-a',
          text: '博后哥说得对。我急什么，他比我更急。',
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's03-postdoc-05',
          characterReaction: '博后微笑着点头。"懂了就好。"',
          stanceRecord: { topic: '策略', stance: '以静制动' },
        },
        {
          id: 's03-postdoc-04b-opt-b',
          text: '但万一他不走呢？万一他放弃offer留下来呢？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-05',
          characterReaction:
            '博后沉默了。"那你就只能认命了。或者……考别的学校的博士。但这条路很辛苦。"',
        },
      ],
    },
    {
      id: 's03-postdoc-04c',
      threadId: 'thread-postdoc',
      speaker: 'postdoc-limbo',
      text: '博后有些生气了："你以为我愿意当这个知道太多的人？在实验室里每天听老板叹气、看师兄焦虑、看你迷茫——我他妈自己的前途都不知道在哪呢！"他的情绪突然崩了一下。',
      emotion: 'frustrated',
      options: [
        {
          id: 's03-postdoc-04c-opt-a',
          text: '博后哥对不起，我不该这么说。你比我们都不容易。',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-05',
          characterReaction:
            '博后深吸一口气，平复了情绪。"没事。你也不容易。算了，我再告诉你几个事情吧。"',
        },
        {
          id: 's03-postdoc-04c-opt-b',
          text: '（沉默。你不知道该说什么。）',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's03-postdoc-05',
          characterReaction:
            '博后掐灭最后一根烟，沉默了一会。"走吧，回去干活。"',
        },
      ],
    },
    {
      id: 's03-postdoc-05',
      threadId: 'thread-postdoc',
      speaker: 'narrator',
      text: '博后暗示线结束。你拿到了关键信息——师兄有offer、导师在犹豫、时间窗口有限。但这些信息也是一种负担：你现在知道了太多不该知道的事。在学术圈，信息是武器，也是枷锁。',
      options: [],
    },
  ],

  // ==================== 社交地雷 ====================
  mines: [
    {
      id: 'mine-diss-senior',
      name: '当众拉踩师兄',
      description: '在言语或行为上暗示自己比师兄更有能力/更配得上名额，被师兄察觉',
      triggerOptionIds: ['s03-rival-02b-opt-b'],
      triggerKeywords: ['公平竞争', '看实力', '我比他强', '他不行'],
      severity: 2,
      consequence:
        '师兄当场翻脸，实验室气氛跌至冰点。更严重的是，师兄可能会去导师那里告状，把你塑造成一个不尊重前辈的人。在重视辈分的学术圈，这几乎是致命的。',
      affectedCharacterIds: ['phd3-critical', 'youqing-anxious'],
      attitudeShifts: [
        { characterId: 'phd3-critical', to: 'hostile' },
        { characterId: 'youqing-anxious', to: 'wary' },
      ],
      forbiddenTopicAfter: '名额分配',
      triggered: false,
    },
    {
      id: 'mine-threaten-leave',
      name: '"不行就找工作"',
      description: '向导师暗示如果不给名额就去找工作，被视为威胁/不忠',
      triggerOptionIds: ['s03-mentor-03c-opt-a'],
      triggerKeywords: ['找工作', '不读博也行', '还有别的选择', '工业界'],
      severity: 2,
      consequence:
        '导师将此解读为威胁。在他的价值体系里，学生说"不行就找工作"等于"背叛学术圈"。他会开始考虑你的忠诚度，即使最终给了你名额，也会在日后反复提起这件事。',
      affectedCharacterIds: ['youqing-anxious'],
      attitudeShifts: [{ characterId: 'youqing-anxious', to: 'wary' }],
      forbiddenTopicAfter: '找工作',
      triggered: false,
    },
    {
      id: 'mine-expose-eavesdrop',
      name: '暴露知道师兄要走',
      description: '在不当场合暴露自己知道师兄拿了工业界offer的信息',
      triggerOptionIds: ['s03-mentor-04-opt-b', 's03-rival-04c-opt-b'],
      triggerKeywords: ['师兄的offer', '他要去大厂', '偷听'],
      severity: 3,
      consequence:
        '信息链被暴露。导师会追查信息来源（博后），师兄会觉得被出卖，博后会恨你把他拖下水。整个实验室的信任链条崩溃——所有人都不再信任你。',
      affectedCharacterIds: ['youqing-anxious', 'phd3-critical', 'postdoc-limbo'],
      attitudeShifts: [
        { characterId: 'youqing-anxious', to: 'hostile' },
        { characterId: 'phd3-critical', to: 'hostile' },
        { characterId: 'postdoc-limbo', to: 'hostile' },
      ],
      forbiddenTopicAfter: '师兄去向',
      triggered: false,
    },
  ],

  // ==================== 信息差 ====================
  knowledgeItems: [
    {
      id: 'info-quota-promised',
      content:
        '导师已经口头答应把唯一的转博名额给博三师兄了。但这个承诺因为师兄最近的表现正在动摇。',
      visibility: 'knownToOthersButNotUser',
      holders: ['youqing-anxious', 'phd3-critical', 'postdoc-limbo'],
      revealCondition: { type: 'option_selected', value: 's03-mentor-03-opt-a' },
      exposureConsequence:
        '你意识到名额的争夺不是从零开始——你从一开始就是落后的一方。但师兄的犹豫给了你机会。',
    },
    {
      id: 'info-postdoc-truth',
      content:
        '博后知道师兄拿了工业界offer的真相，但因为自己续聘的利益关系选择了把信息透露给你。',
      visibility: 'knownToOthersButNotUser',
      holders: ['postdoc-limbo'],
      revealCondition: { type: 'option_selected', value: 's03-postdoc-02-opt-a' },
      exposureConsequence:
        '你得到了关键情报，但也意识到博后帮你的动机并不纯粹——他需要你转博成功来保住自己的位置。',
    },
    {
      id: 'info-mentor-hesitate',
      content:
        '导师正在杰青申报和学生管理之间焦头烂额。他需要能出成果的学生，但又碍于面子不好收回给师兄的承诺。',
      visibility: 'knownToOthersButNotUser',
      holders: ['youqing-anxious', 'postdoc-limbo'],
      revealCondition: {
        type: 'option_selected',
        value: 's03-postdoc-03-opt-a',
      },
      exposureConsequence:
        '理解导师的处境后，你可以更精准地把握时机——让导师自己找到一个台阶，把名额"自然地"转给你。',
    },
    {
      id: 'info-senior-offer',
      content:
        '师兄已经拿到某大厂年薪50万的offer，但一直犹豫不决。offer的截止日期只剩两周。',
      visibility: 'knownToOthersButNotUser',
      holders: ['phd3-critical', 'postdoc-limbo'],
      revealCondition: {
        type: 'option_selected',
        value: 's03-rival-03c-opt-a',
      },
      exposureConsequence:
        '知道了offer截止日期，你明白自己只需要再等两周就能知道结果。但这两周将是最煎熬的。',
    },
  ],

  // ==================== 结局 ====================
  endings: [
    {
      id: 'ending-transfer-success-enemy',
      name: '转博成功但结仇',
      description:
        '师兄最终选择了工业界的offer，名额空了出来。导师把名额给了你——但师兄觉得是你在背后推了他一把。他在组里的最后一个月冷着脸不和你说话，走的时候甚至没跟你道别。导师虽然留下了你，但心里对你的"钻营"有些不舒服。你得到了你想要的东西，但付出的代价是：一个仇人，一段有裂痕的师生关系，和一个"不厚道"的名声。欢迎来到博士生涯。',
      conditions: {
        minConsistency: 50,
        requiredAttitudes: [
          { characterId: 'youqing-anxious', attitude: 'friendly' },
        ],
        forbiddenMines: ['mine-expose-eavesdrop'],
      },
      priority: 4,
    },
    {
      id: 'ending-rejected-stay-master',
      name: '被婉拒读完硕士',
      description:
        '导师最终还是把名额给了师兄——不管师兄值不值得。"先来后到"在导师的价值体系里大于一切。你被客气地告知"以后还有机会"，但你们都知道不会有了。你将以硕士学位毕业，带着一段不咸不淡的科研经历和一个"差点成功"的故事。',
      conditions: {
        maxConsistency: 50,
        requiredAttitudes: [
          { characterId: 'youqing-anxious', attitude: 'neutral' },
        ],
      },
      priority: 3,
    },
    {
      id: 'ending-empty-promise',
      name: '空头支票成备胎',
      description:
        '导师既不想得罪师兄，也不想失去你。于是他给了你一张空头支票："下一年的名额一定是你的。"你信以为真，一年后发现"下一年"又有新的竞争者。你成了导师手里的备用选项——永远在等待，永远是"下一个"。在学术圈，最危险的不是被拒绝，而是被吊着。',
      conditions: {
        minConsistency: 40,
        forbiddenMines: ['mine-diss-senior'],
      },
      priority: 2,
    },
    {
      id: 'ending-truth-bomb',
      name: '揭穿真相全组爆炸',
      description:
        '你在某个不合时宜的场合暴露了师兄有offer的事实。师兄暴怒，导师失态，博后吓得脸色煞白。整个实验室的信任链条在一天之内崩塌——师兄当场辞退，博后被导师冷落（因为被怀疑是信息源），导师对你彻底失望。你可能保住了名额，但你"杀死"了整个实验室的氛围。此后几年的博士生涯，你将在一个充满猜忌和冷漠的环境中度过。',
      conditions: {
        requiredMines: ['mine-expose-eavesdrop'],
      },
      priority: 5,
    },
  ],

  // ==================== 身后评价 ====================
  behindEvaluationTemplates: [
    {
      characterId: 'youqing-anxious',
      characterName: '某优青（焦虑型）',
      channel: '导师在杰青申报讨论群的消息',
      content:
        '今年组里的事情搞得我头大。一个博三的想走，一个研二的想上。我怎么就带了这么一群心眼多的学生？算了，只要有人能帮我发文章就行。@某教授，你那边有转博名额吗？我这学生有点想法……',
      tone: 'negative',
      revealedInfo:
        '导师把你的转博申请看作是一个人事问题而不是学术问题。在他心里，你们都是帮他冲杰青的工具。',
    },
    {
      characterId: 'phd3-critical',
      characterName: '某博三（关键节点型）',
      channel: '师兄在某大厂offer群的匿名帖',
      content:
        '读了五年博士，发现学术圈就是个名利场。导师拿我们当工具，师弟拿我的走留当筹码，博后拿每个人当棋子。笑了。已决定接offer。五年青春喂了狗，但至少以后挣的钱是自己的。',
      tone: 'sarcastic',
      revealedInfo:
        '师兄最终选择离开学术圈。但他带走的不只是一个offer，还有对整个系统的彻底失望。你在其中扮演了什么角色？',
    },
    {
      characterId: 'postdoc-limbo',
      characterName: '某博后（过渡迷茫型）',
      channel: '博后在朋友圈（仅自己可见）',
      content:
        '又帮一个小孩出了主意。说白了是帮他也是帮自己。如果他转博成功，老板手里有人干活，也许会续我的合同。如果失败了……那我可能也得卷铺盖走人了。三十一岁的人了，还在靠别人的选择决定自己的命运。呵呵。',
      tone: 'negative',
      revealedInfo:
        '博后帮你的动机完全是利己的——你的成功与否直接关系到他能不能续聘。在学术食物链的最底层，每个人都在为生存而算计。',
    },
    {
      characterId: 'youqing-anxious',
      characterName: '某优青（焦虑型）',
      channel: '导师晚上给爱人的微信',
      content:
        '今天被学生搞得心烦意乱。那个想转博的研二还不错，但我已经答应了博三那个。现在骑虎难下。唉，当老师太累了。明天再说吧。对了明天记得带儿子去打疫苗。',
      tone: 'neutral',
      revealedInfo:
        '导师在你走后其实犹豫了很久。你在他心里已经有了位置——只是他不擅长做决定。',
    },
  ],
}
