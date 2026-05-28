import type { ScenarioData } from '../../types/scenario'

export const s09TenureReview: ScenarioData = {
  id: 's09',
  phase: 'faculty',
  title: '非升即走终审',
  subtitle: `院长手里的底牌`,
  description:
    `非升即走第五年终审答辩，你站在学术生涯的悬崖边。院长手中似乎握着什么底牌，书记带着意味深长的微笑翻看文件夹，而外审专家恰好是你大老板的竞争对手。这不是一场普通的答辩——这是一场精心设计的权力博弈。`,
  briefing:
    `你是某985高校的青年教师，非升即走合同进入第五年，今天是终审答辩。五年来你发了论文、拿了项目、带了学生，但你知道这些"硬指标"只是入场券——真正决定你命运的，是会议室里那几个人的态度。院长某万人是个人脉型选手，手里似乎有一张你不知道的底牌。党委书记带着一个文件夹，里面可能有学生投诉截图。外审专家某杰青是你博士大老板的竞争对手，他对你的态度取决于你和大老板的关系远近。记录员某秘书看似透明，却是信息流转的关键节点。你的目标：活着走出这间会议室，保住饭碗。`,
  difficulty: 5,
  estimatedMinutes: 15,
  playerRole: `某青年教师，非升即走第五年终审答辩`,
  setting: `学院会议室`,
  timeOfDay: `周三下午2点`,
  atmosphere:
    `会议室不大，长条桌上摆着几瓶矿泉水和你的述职报告。投影仪已经打开，你的PPT封面映在墙上。院长坐在主位，翻着你的材料，偶尔和书记低声交流几句。某杰青坐在对面，表情冷淡地翻看你的论文列表。秘书在角落打开笔记本电脑，手指悬在键盘上。窗外传来施工的噪音，但会议室里的空气比外面更让人窒息。`,

  // ==================== 角色 ====================
  characters: [
    {
      id: 'wanren-network',
      name: `某万人（人脉型）`,
      title: `教授/万人计划/院长`,
      age: 52,
      description:
        `院长，非升即走考核委员会主任。他不是靠学术能力上位的——他靠的是人脉、资源整合和政治嗅觉。他手里有一个你不知道的转岗方案，但这个方案需要你"配合"。`,
      avatar: 'wanren-male-smooth',
      personality: {
        faceWeight: 0.85,
        powerIndex: 90,
        grudgeMemory: 6,
        allianceFlexibility: 0.7,
        emotionalVolatility: 0.2,
      },
      socialParams: {
        approachability: 60,
        attentionSpan: 120,
        preferredTopics: ['学科建设', '人才引进', '资源整合'],
        forbiddenTopics: ['他的学术水平', '论文数量', '和书记的矛盾'],
        networkValue: 92,
        gossipFactor: 0.5,
        greetingStyle: 'formal',
        exitSignals: ['我们再研究研究', '这个事情不急'],
        memoryDuration: 18,
      },
      hiddenAgenda:
        `手里有一个转岗方案：让你从教学科研岗转到科研管理岗，保住编制但放弃独立PI身份。这个方案需要你主动"申请"——他不能强制，但他可以暗示。如果你配合，他多一个听话的行政棋子；如果你不配合，他不介意让你走。`,
      initialAttitude: 'neutral',
      role: 'wildcard',
      initialPosition: `主位，翻看材料`,
      relationship: `考核委员会主任/院长`,
    },
    {
      id: 'party-secretary',
      name: `某书记（行政型）`,
      title: `党委书记/副教授`,
      age: 48,
      description:
        `学院党委书记，负责"师德师风"考核。她手里可能有一份学生投诉截图——50%的概率。如果有，她会在关键时刻拿出来；如果没有，她会用暗示来试探你的反应。`,
      avatar: 'secretary-female-stern',
      personality: {
        faceWeight: 0.6,
        powerIndex: 70,
        grudgeMemory: 8,
        allianceFlexibility: 0.3,
        emotionalVolatility: 0.4,
      },
      socialParams: {
        approachability: 40,
        attentionSpan: 180,
        preferredTopics: ['师德师风', '学生培养', '党建工作'],
        forbiddenTopics: ['她的学术成果', '行政干预学术'],
        networkValue: 65,
        gossipFactor: 0.7,
        greetingStyle: 'formal',
        exitSignals: ['组织上会综合考虑', '我们会如实记录'],
        memoryDuration: 36,
      },
      hiddenAgenda:
        `和院长有路线之争——院长主张"唯论文论"，她坚持"师德一票否决"。如果能用师德问题拿下你，等于证明她的考核标准比院长的更重要。但她和院长的矛盾也意味着，如果你能利用这一点，可能找到缝隙。`,
      initialAttitude: 'wary',
      role: 'antagonist',
      initialPosition: `院长左侧，翻看文件夹`,
      relationship: `考核委员会成员/师德考核负责人`,
    },
    {
      id: 'jieqing-returnee',
      name: `某杰青（海归严厉型）`,
      title: `教授/国家杰出青年基金获得者`,
      age: 46,
      description:
        `外审专家，被请来做学术评议。他是你博士大老板的竞争对手——同一个领域，争同一批项目，抢同一拨学生。他对你的态度取决于你和大老板的关系，以及你的成果是否"威胁"到他。`,
      avatar: 'jieqing-male-stern',
      personality: {
        faceWeight: 0.7,
        powerIndex: 82,
        grudgeMemory: 9,
        allianceFlexibility: 0.2,
        emotionalVolatility: 0.5,
      },
      socialParams: {
        approachability: 30,
        attentionSpan: 150,
        preferredTopics: ['学术前沿', '方法论', '国际对标'],
        forbiddenTopics: ['你大老板', '同行竞争', '帽子评审'],
        networkValue: 85,
        gossipFactor: 0.3,
        greetingStyle: 'dismissive',
        exitSignals: ['学术上还需要打磨', '水平有待提高'],
        memoryDuration: 24,
      },
      hiddenAgenda:
        `想通过你的答辩来收集你大老板团队的情报——你的研究方向、数据来源、合作网络。如果你表现太好，他会觉得受到威胁；如果你表现太差，他会拿来嘲笑你的大老板"带不出好学生"。他是一把双刃剑。`,
      initialAttitude: 'neutral',
      role: 'neutral',
      initialPosition: `对面，翻看论文列表`,
      relationship: `外审专家/你大老板的竞争对手`,
    },
    {
      id: 'secretary-process',
      name: `某秘书（流程型）`,
      title: `学院办公室秘书`,
      age: 35,
      description:
        `记录员，负责记录答辩全程。她看似透明，但她的记录决定了"官方版本"的答辩内容。她和院长关系密切，有时候会"选择性记录"。`,
      avatar: 'secretary-female-quiet',
      personality: {
        faceWeight: 0.3,
        powerIndex: 20,
        grudgeMemory: 1,
        allianceFlexibility: 0.9,
        emotionalVolatility: 0.1,
      },
      socialParams: {
        approachability: 50,
        attentionSpan: 600,
        preferredTopics: ['流程', '材料', '时间安排'],
        forbiddenTopics: ['她的立场', '记录偏差'],
        networkValue: 30,
        gossipFactor: 0.6,
        greetingStyle: 'formal',
        exitSignals: ['我记录一下', '按流程来'],
        memoryDuration: 6,
      },
      hiddenAgenda:
        `她是院长的人。院长暗示过她，如果答辩中出现对院长不利的发言，可以"概括性记录"而不是逐字记录。她不想得罪任何人，但她更不想得罪院长。`,
      initialAttitude: 'neutral',
      role: 'neutral',
      initialPosition: `角落，笔记本电脑前`,
      relationship: `记录员`,
    },
  ],

  // ==================== 对话线程 ====================
  threads: [
    {
      id: 'thread-defense',
      characterId: 'jieqing-returnee',
      label: `述职答辩正式问答`,
      urgency: 70,
      status: 'active',
      currentNodeId: 's09-defense-01',
      lastInteractedAt: 0,
      autoMessages: [
        `某万人看了一眼手表，翻到你材料的下一页。`,
        `某杰青在你的论文列表上画了一个问号。`,
        `某书记打开了她的文件夹，又合上了。`,
      ],
      deteriorateEvent:
        `你的述职超时了。某万人直接打断："时间到了，我们进入提问环节。"你最重要的成果还没来得及展示。`,
    },
    {
      id: 'thread-secretary',
      characterId: 'party-secretary',
      label: `书记追问线——学生关系与教学投诉`,
      urgency: 50,
      status: 'waiting',
      currentNodeId: 's09-secretary-01',
      lastInteractedAt: 0,
      autoMessages: [
        `某书记在文件夹里翻了翻，目光意味深长。`,
        `某书记低头在本子上写了几个字，表情严肃。`,
        `某书记和秘书交换了一个眼神。`,
      ],
      deteriorateEvent:
        `某书记直接在答辩现场宣读了学生投诉内容："有学生反映你在指导过程中存在态度粗暴、回复不及时等问题。"你被当场打了一个措手不及。`,
    },
    {
      id: 'thread-dean',
      characterId: 'wanren-network',
      label: `院长单独谈话——暗示交易`,
      urgency: 30,
      status: 'waiting',
      currentNodeId: 's09-dean-01',
      lastInteractedAt: 0,
      autoMessages: [
        `某万人在你述职时欲言又止。`,
        `某万人和秘书低声说了句什么，秘书点了点头。`,
        `某万人看你的眼神带着一种"我们回头再说"的暗示。`,
      ],
      deteriorateEvent:
        `某万人在你不知情的情况下已经启动了转岗流程。人事处的通知比你预想的来得更快。`,
    },
  ],

  // ==================== 对话节点 ====================
  dialogNodes: [
    // ========== 述职答辩正式问答线 thread-defense ==========
    {
      id: 's09-defense-01',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: `你站在投影幕前，深吸一口气。PPT第一页是你五年的成绩单：论文、项目、教学、服务。某万人抬头看了一眼标题，又低头翻你的材料。某杰青已经开始在论文列表上做标记了。你开始述职。`,
      emotion: 'tense',
      options: [
        {
          id: 's09-defense-01-opt-a',
          text: `从最亮眼的成果切入——那篇领域top期刊的一作论文，建立"我有硬实力"的第一印象。`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's09-defense-02',
          characterReaction:
            `某杰青微微抬眉，在那篇论文标题旁画了个圈。某万人不动声色。某书记没有抬头。`,
          stanceRecord: { topic: '述职策略', stance: '以成果开场' },
        },
        {
          id: 's09-defense-01-opt-b',
          text: `先感谢学院培养和领导支持，从"服务学科建设"的角度汇报自己的五年工作。`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's09-defense-02b',
          characterReaction:
            `某万人微微点头，露出满意的表情。某杰青面无表情。某书记抬头看了你一眼。`,
          stanceRecord: { topic: '述职策略', stance: '先表忠心' },
        },
        {
          id: 's09-defense-01-opt-c',
          text: `直接说"我知道今天的答辩决定我的去留，我准备了充分的材料，请各位老师审阅"——开门见山，不绕弯子。`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's09-defense-02c',
          characterReaction:
            `某万人眉头微皱——你把潜规则说成了明规则。某杰青倒是欣赏你的直接。某书记在本子上记了一笔。`,
          stanceRecord: { topic: '述职策略', stance: '开门见山' },
        },
      ],
    },
    {
      id: 's09-defense-02',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: `某杰青第一个提问，语气平淡但问题尖锐："你这篇论文的第三个实验，样本量只有28例。你觉得这个结论有多大的可推广性？另外——"他顿了一下，"这个方向和你导师的课题组是什么关系？是独立工作还是延续博士课题？"`,
      emotion: 'probing',
      options: [
        {
          id: 's09-defense-02-opt-a',
          text: `谢谢老师的问题。样本量确实有限，但我们采用了XX统计方法来增强效力。至于方向，这是我独立开辟的新方向，和博士课题有技术延伸但问题完全不同。`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's09-defense-03',
          characterReaction:
            `某杰青想了想，没有继续追问样本量的事。但"和博士课题有技术延伸"这句话让他的眼睛闪了一下——他在收集情报。`,
          stanceRecord: { topic: '学术独立性', stance: '强调独立' },
        },
        {
          id: 's09-defense-02-opt-b',
          text: `老师，28例在我们领域已经是比较大的队列了，国际上同类研究平均样本量只有15-20例。至于方向，我跟导师的课题组一直保持合作——`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-defense-03b',
          characterReaction:
            `某杰青冷笑了一声："保持合作？那你的独立性体现在哪里？非升即走考核的核心就是看你能不能独立做PI。"他戳到了要害。`,
          stanceRecord: { topic: '学术独立性', stance: '承认依赖导师' },
        },
        {
          id: 's09-defense-02-opt-c',
          text: `老师问得好。样本量是我们领域的通病，我在后续工作中已经在扩大队列。关于方向——恕我直言，我的工作和您提到的"导师课题组"没有直接关系。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's09-defense-03',
          characterReaction:
            `某杰青的表情微妙——你听出了他的弦外之音并直接回击。某万人在旁边抬了一下眉毛。`,
          stanceRecord: { topic: '学术独立性', stance: '直面竞争暗示' },
        },
      ],
    },
    {
      id: 's09-defense-02b',
      threadId: 'thread-defense',
      speaker: 'wanren-network',
      text: `某万人等你说完"感谢学院"的话，点了点头："学院对你一直是支持的，这一点毋庸置疑。"然后话锋一转，"但支持是双向的。你对学院的学科建设有什么具体贡献？不要说论文——我要听的是平台建设、团队搭建、横向经费。"`,
      emotion: 'calculated',
      options: [
        {
          id: 's09-defense-02b-opt-a',
          text: `院长，过去五年我牵头搭建了XX实验平台，协助引进了两名博士后，横向经费到账XX万——`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's09-defense-03',
          characterReaction:
            `某万人满意地点头。某杰青在旁边轻声说了句"横向经费不代表学术水平"，但某万人没有接茬。`,
          stanceRecord: { topic: '贡献维度', stance: '强调平台贡献' },
        },
        {
          id: 's09-defense-02b-opt-b',
          text: `院长，我的主要贡献还是在学术产出上。我认为青年教师最核心的任务是做出有影响力的研究——`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's09-defense-03c',
          characterReaction:
            `某万人的表情冷了下来。"学术产出当然重要，但你不能只管自己的一亩三分地。学院需要的是能扛事的人，不是只会写论文的人。"`,
          stanceRecord: { topic: '贡献维度', stance: '坚持学术为本' },
        },
      ],
    },
    {
      id: 's09-defense-02c',
      threadId: 'thread-defense',
      speaker: 'wanren-network',
      text: `某万人看着你，语气不急不缓："'决定去留'这种话不用说。考核就是考核，我们看的是你的综合表现。"他把你的开门见山化解得滴水不漏。然后他看向某杰青："某老师，您先问。"`,
      emotion: 'controlled',
      options: [
        {
          id: 's09-defense-02c-opt-a',
          text: `（调整策略，回到正常述职节奏，从成果开始逐项汇报）`,
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's09-defense-03',
          characterReaction:
            `你迅速调整了节奏。某万人微微点头——至少你还能随机应变。`,
        },
        {
          id: 's09-defense-02c-opt-b',
          text: `院长说得对，是我措辞不当。请各位老师审阅我的述职材料。`,
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's09-defense-03',
          characterReaction:
            `某万人"嗯"了一声。你的第一印象已经打了折扣——"措辞不当"在考核场合是减分项。`,
        },
      ],
    },
    {
      id: 's09-defense-03',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: `某杰青翻到你的论文列表最后一页，指着一个空白处："我注意到你最近两年的产出明显下降了。前三年每年两三篇，后两年加起来只有两篇。你怎么解释这个趋势？是遇到了瓶颈，还是——"他看了某万人一眼，"精力被其他事情分散了？"`,
      emotion: 'challenging',
      options: [
        {
          id: 's09-defense-03-opt-a',
          text: `老师，后两年我转入了一个更有挑战性的方向，周期更长但影响因子更高。这两篇的引用量已经超过前三年的总和。`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's09-defense-04',
          characterReaction:
            `某杰青翻了翻引用数据，没有反驳。某万人在旁边微微点头——你用数据回应了质疑。`,
          stanceRecord: { topic: '产出下降', stance: '质量换数量' },
        },
        {
          id: 's09-defense-03-opt-b',
          text: `确实遇到了一些瓶颈。但我认为这是方向转型期的正常现象，目前已经有三篇在投——`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-defense-04b',
          characterReaction:
            `某杰青追问："在投不算产出。你现在能拿出来的就是这些。"某万人在旁边没有帮你说话。`,
          stanceRecord: { topic: '产出下降', stance: '承认瓶颈' },
        },
        {
          id: 's09-defense-03-opt-c',
          text: `后两年我承担了大量教学和行政工作——学院安排的本科教学、实验室管理、学科评估材料——这些占用了大量科研时间。`,
          energyCost: 8,
          consistencyImpact: -5,
          triggersMine: 'mine-unfair',
          nextNodeId: 's09-defense-04c',
          characterReaction:
            `某万人的脸色沉了下来。你在暗示学院的安排拖累了你的科研——这等于在说"学院耽误了我"。某书记抬起头看着你，目光锐利。`,
          riskTag: `雷区：暗示学院不公`,
          stanceRecord: { topic: '产出下降', stance: '归咎于学院安排' },
        },
      ],
    },
    {
      id: 's09-defense-03b',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: `某杰青没有放过你："你说和导师课题组'保持合作'——那你的国自然项目里，有多少工作是真正你独立完成的？你的通讯作者论文里，有没有你导师的名字？"他在系统性地攻击你的独立性。`,
      emotion: 'aggressive',
      options: [
        {
          id: 's09-defense-03b-opt-a',
          text: `我的国自然项目完全是独立申请、独立执行的。通讯作者论文中，有两篇标注了导师为共同通讯，但那是出于学术礼节——实际工作是我独立完成的。`,
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's09-defense-04',
          characterReaction:
            `某杰青"学术礼节"这个词让他微微挑眉。他知道你说的是实话，但他也知道"共同通讯"在考核中会被打折扣。`,
        },
        {
          id: 's09-defense-03b-opt-b',
          text: `老师，学术合作在我们领域很常见。独立性不是说完全不合作，而是——`,
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's09-defense-04',
          characterReaction:
            `某杰青直接打断："我问的不是合作不合作，我问的是你能不能独立做PI。你回答我的问题。"全场气氛骤然紧张。`,
        },
      ],
    },
    {
      id: 's09-defense-03c',
      threadId: 'thread-defense',
      speaker: 'wanren-network',
      text: `某万人靠回椅背，语气意味深长："'只会写论文'——我可没这么说。但你想想，五年来学院给了你实验室、启动经费、研究生名额，你为学院做了什么？你带的学生满意吗？你参与学科建设了吗？非升即走不只看SCI数量。"`,
      emotion: 'pointed',
      options: [
        {
          id: 's09-defense-03c-opt-a',
          text: `院长说得对，我反思一下。其实我也参与了一些学科建设工作，比如——（列举具体贡献）`,
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's09-defense-04',
          characterReaction:
            `某万人听着你补充的内容，表情缓和了一些。"好，这些你应该在述职报告里写清楚。"`,
        },
        {
          id: 's09-defense-03c-opt-b',
          text: `院长，我认为青年教师的核心评价标准应该是学术产出。如果把太多行政工作分配给青椒，反而会影响——`,
          energyCost: 5,
          consistencyImpact: 5,
          triggersMine: 'mine-unfair',
          nextNodeId: 's09-defense-04c',
          characterReaction:
            `某万人的脸色冷了下来。"你在质疑考核标准？"某书记在旁边抬起了头。你在答辩现场挑战规则——这是非常危险的举动。`,
          riskTag: `雷区：质疑考核标准`,
        },
      ],
    },
    {
      id: 's09-defense-04',
      threadId: 'thread-defense',
      speaker: 'party-secretary',
      text: `某书记终于开口了。她翻开文件夹，语气平静："学术的部分我不太懂，某杰青老师问得很专业。我想问一个'软指标'——你觉得你和学生的关系怎么样？有没有学生给你反馈过什么意见？"她的目光停在你脸上，观察你的反应。`,
      emotion: 'testing',
      options: [
        {
          id: 's09-defense-04-opt-a',
          text: `谢谢书记关心。我和学生关系总体不错，当然个别学生可能对我的要求比较严格有些意见，但我认为严格是对学生负责——`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's09-defense-05',
          characterReaction:
            `某书记微微点头，但她的手指还停留在文件夹上。"'个别学生有意见'——你知道具体是什么意见吗？"她在加压。`,
          stanceRecord: { topic: '师生关系', stance: '承认严格但合理' },
        },
        {
          id: 's09-defense-04-opt-b',
          text: `书记，我和学生关系很好。我每周都有固定的组会和一对一交流时间，学生们的反馈一直很积极。`,
          energyCost: 5,
          consistencyImpact: 0,
          triggersMine: 'mine-student-lie',
          nextNodeId: 's09-defense-05b',
          characterReaction:
            `某书记翻开文件夹的下一页，目光停留了两秒。"是吗？那如果我告诉你，有学生向学院提交过书面意见呢？"——如果她手里真的有截图，你刚才的话就是谎言。`,
          riskTag: `风险：如果书记有截图则撒谎穿帮`,
          stanceRecord: { topic: '师生关系', stance: '声称关系好' },
        },
        {
          id: 's09-defense-04-opt-c',
          text: `书记，说实话，带学生这几年确实有做得不够好的地方。有一次和学生沟通方式不当，事后我主动找学生道了歉并改正了。`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's09-defense-05c',
          characterReaction:
            `某书记的表情有一瞬间的意外——她没想到你会主动坦白。某万人在旁边投来审视的目光。某杰青饶有兴致地看着这一幕。`,
          stanceRecord: { topic: '师生关系', stance: '坦诚承认不足' },
        },
      ],
    },
    {
      id: 's09-defense-04b',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: `某杰青没有收手："'在投'说明什么问题？说明你在考核周期内没有完成这些工作。非升即走看的是五年内的成果，不是五年后的期望值。"他的语气冷硬，几乎是在宣判。某万人在旁边没有打圆场。`,
      emotion: 'cold',
      options: [
        {
          id: 's09-defense-04b-opt-a',
          text: `老师，您说的事实我接受。但我想强调的是，已发表的这些成果在领域内的影响力——引用量、被引频次——已经超过了同期入职的多数同事。`,
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's09-defense-05',
          characterReaction:
            `某杰青沉默了两秒。他翻了翻数据，没有反驳。你用横向对比拉回了局面。`,
        },
        {
          id: 's09-defense-04b-opt-b',
          text: `（沉默，不知道如何反驳）`,
          energyCost: 3,
          consistencyImpact: -8,
          nextNodeId: 's09-defense-05',
          characterReaction:
            `某杰青摇了摇头。某万人叹了口气。你在最关键的问题上哑口无言——这比任何回答都糟糕。`,
        },
      ],
    },
    {
      id: 's09-defense-04c',
      threadId: 'thread-defense',
      speaker: 'wanren-network',
      text: `某万人的语气变了："你的意思是，学院的安排影响了你的科研产出？那我问你——同一年入职的某某老师，同样承担了教学和行政任务，为什么人家能发？是你能力不行，还是你态度有问题？"全场安静了。某书记在旁边记笔记，嘴角有一丝若有若无的笑意。`,
      emotion: 'confrontational',
      options: [
        {
          id: 's09-defense-04c-opt-a',
          text: `院长，我不是在推卸责任。确实是我自己的问题，我需要更好地平衡科研和其他工作。`,
          energyCost: 10,
          consistencyImpact: -5,
          nextNodeId: 's09-defense-05',
          characterReaction:
            `某万人"嗯"了一声，没再追究。但你的"暗示学院不公"已经被记录在案了——某秘书的键盘声格外响。`,
        },
        {
          id: 's09-defense-04c-opt-b',
          text: `院长，每个人的情况不同。我并不是在说学院不公——`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-defense-05',
          characterReaction:
            `某万人摆了摆手："行了，我们继续。"他已经做出了判断。某杰青在旁边面无表情。`,
        },
      ],
    },
    {
      id: 's09-defense-05',
      threadId: 'thread-defense',
      speaker: 'wanren-network',
      text: `提问环节接近尾声。某万人合上材料，环顾一圈："还有其他问题吗？"某杰青摇头。某书记欲言又止。某万人看了看表："那我们休息十分钟，委员会内部讨论一下。"他看向你，"你先出去等一下。"`,
      emotion: 'procedural',
      options: [
        {
          id: 's09-defense-05-opt-a',
          text: `好的，谢谢各位老师。（站起来，平静离开会议室）`,
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's09-defense-06',
          characterReaction:
            `你走出会议室，门在身后关上。走廊里空无一人，你听到里面传来低沉的讨论声。`,
        },
        {
          id: 's09-defense-05-opt-b',
          text: `院长，在你们讨论之前，我能不能再补充一点？关于未来五年的规划——`,
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's09-defense-06',
          characterReaction:
            `某万人看了你一眼："不用了。你准备的材料我们都看到了。出去等着吧。"他不给你更多机会。`,
        },
      ],
    },
    {
      id: 's09-defense-05b',
      threadId: 'thread-defense',
      speaker: 'party-secretary',
      text: `某书记慢慢翻开文件夹，拿出一张打印的截图。"这是上学期有学生通过信箱提交的意见反馈。"她没有念出内容，只是把截图推到桌子中间，让你自己看。截图上的文字你一眼就认出来了——是那个你以为已经处理好的学生。`,
      emotion: 'exposing',
      options: [
        {
          id: 's09-defense-05b-opt-a',
          text: `（看了截图，深吸一口气）书记，这件事我知道。当时我和学生之间确实有沟通问题，事后我已经找学生谈过了，也做了改正。刚才我说"关系很好"确实不够准确——我应该说"曾经有问题但已经解决"。`,
          energyCost: 12,
          consistencyImpact: -5,
          nextNodeId: 's09-defense-06',
          characterReaction:
            `某书记微微点头。某万人沉默。你撒谎被当场揭穿，虽然补救了一下，但信任已经打了折扣。某杰青在旁边面无表情地记了一笔。`,
        },
        {
          id: 's09-defense-05b-opt-b',
          text: `书记，这个截图——我需要了解一下来源。学生反馈应该走正式渠道，匿名截图不应该成为考核依据。`,
          energyCost: 8,
          consistencyImpact: 5,
          triggersMine: 'mine-unfair',
          nextNodeId: 's09-defense-06',
          characterReaction:
            `某书记的脸色冷了："你在质疑反馈渠道的合法性？学院信箱就是正式渠道。"某万人在旁边咳了一声。你在火上浇油。`,
          riskTag: `雷区：质疑书记的材料来源`,
        },
      ],
    },
    {
      id: 's09-defense-05c',
      threadId: 'thread-defense',
      speaker: 'party-secretary',
      text: `某书记的表情缓和了一些。"你能主动说出来，这一点我是认可的。"她合上了文件夹——如果她有截图，她选择不拿出来了。"师生关系不是没有摩擦，关键是你怎么处理摩擦。"她看向某万人，"院长，学生工作这一块我没有更多问题了。"`,
      emotion: 'acknowledging',
      options: [
        {
          id: 's09-defense-05c-opt-a',
          text: `谢谢书记的理解。我会继续改进和学生的沟通方式。`,
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's09-defense-06',
          characterReaction:
            `某书记微微点头。你的坦诚为自己赢得了一点空间。某万人在旁边观察着你和书记的互动，若有所思。`,
        },
      ],
    },
    {
      id: 's09-defense-06',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: `你站在走廊里，背靠墙壁，听着会议室里传来断断续续的讨论声。你听不清具体内容，但偶尔能辨认出某万人低沉的嗓音和某杰青冷硬的语调。某秘书推门出来倒水，经过你时轻声说了句："别太紧张。"你不知道这是安慰还是暗示。十分钟过去了——门打开了。`,
      options: [],
    },

    // ========== 书记追问线 thread-secretary ==========
    {
      id: 's09-secretary-01',
      threadId: 'thread-secretary',
      speaker: 'party-secretary',
      text: `答辩结束后，某书记没有马上离开。她收拾文件时，似乎不经意地问你："你今年带了几个研究生？他们的毕业论文进展怎么样？"语气随意，但你知道这不是闲聊。`,
      emotion: 'casual-probing',
      options: [
        {
          id: 's09-secretary-01-opt-a',
          text: `书记，我现在带两个硕士一个博士。硕士今年答辩，进展正常；博士刚二年级，在做前期实验。`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's09-secretary-02',
          characterReaction:
            `某书记点头："那个博士——就是之前提意见的那个学生吗？"她在追问。`,
        },
        {
          id: 's09-secretary-01-opt-b',
          text: `书记，学生情况都在述职报告里有详细说明。您如果有具体问题——`,
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's09-secretary-02b',
          characterReaction:
            `某书记微微皱眉。"我不是在走流程，我是在跟你聊天。你怎么这么紧张？"她的语气让你更紧张了。`,
        },
      ],
    },
    {
      id: 's09-secretary-02',
      threadId: 'thread-secretary',
      speaker: 'party-secretary',
      text: `某书记合上文件夹，直视你："我跟你说实话。有学生反映你在指导过程中——怎么说呢——'效率导向'太强。学生觉得你只关心产出，不关心他们的成长。你怎么看这个评价？"`,
      emotion: 'direct',
      options: [
        {
          id: 's09-secretary-02-opt-a',
          text: `书记，这个评价我接受。确实有时候太急于出成果了，忽略了学生的感受。我会改进。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's09-secretary-03',
          characterReaction:
            `某书记点头："你能这样想就好。年轻老师都有这个阶段。"她的态度明显缓和了。`,
          stanceRecord: { topic: '学生培养', stance: '接受批评' },
        },
        {
          id: 's09-secretary-02-opt-b',
          text: `书记，"效率导向"在科研领域是必要的。我们不是做慈善，研究生就是要学会在压力下产出——`,
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's09-secretary-03b',
          characterReaction:
            `某书记的目光变得锐利："你觉得对学生的压力是合理的？那学生的心理健康谁来负责？"你触碰了她最敏感的神经。`,
          stanceRecord: { topic: '学生培养', stance: '坚持压力管理' },
        },
        {
          id: 's09-secretary-02-opt-c',
          text: `书记，我想了解一下具体是哪个学生反映的？不同学生的情况可能不一样——`,
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's09-secretary-03c',
          characterReaction:
            `某书记摇头："具体是谁不重要。重要的是你对这个问题的态度。"她不会透露信息来源。`,
        },
      ],
    },
    {
      id: 's09-secretary-02b',
      threadId: 'thread-secretary',
      speaker: 'party-secretary',
      text: `某书记站了起来，语气变冷："我不紧张，你才应该紧张。你知道'师德师风一票否决'是什么意思吗？你论文发得再多，如果师德这一关过不了——"她没有说完，但意思已经很明显了。`,
      emotion: 'threatening',
      options: [
        {
          id: 's09-secretary-02b-opt-a',
          text: `书记，对不起，刚才是我态度不好。您有什么问题请直说，我一定配合。`,
          energyCost: 10,
          consistencyImpact: -3,
          nextNodeId: 's09-secretary-03',
          characterReaction:
            `某书记坐回去："好。那我问你——你上学期有没有对学生说过'做不出来就别毕业'这种话？"`,
        },
        {
          id: 's09-secretary-02b-opt-b',
          text: `书记，师德考核我完全支持。但我认为考核应该基于事实，不应该基于个别学生的主观感受——`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's09-secretary-03b',
          characterReaction:
            `某书记冷冷地看着你："'主观感受'？学生的感受不重要吗？你这种态度本身就是师德问题。"`,
          stanceRecord: { topic: '师德考核', stance: '质疑标准' },
        },
      ],
    },
    {
      id: 's09-secretary-03',
      threadId: 'thread-secretary',
      speaker: 'party-secretary',
      text: `某书记放下笔，语气缓和了些："你是个有能力的年轻人，我不否认。但能力不等于品德。在这个学院里，我见过太多能力很强但最后倒在师德上的人。你还年轻，注意一下方式方法。"她站起来准备走了。`,
      emotion: 'advising',
      options: [
        {
          id: 's09-secretary-03-opt-a',
          text: `谢谢书记的提醒。我一定注意。`,
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's09-secretary-04-end',
          characterReaction:
            `某书记点头离开了。她今天对你的印象——取决于你之前的表现——可能是"可以教化"或者"顽固不化"。`,
        },
        {
          id: 's09-secretary-03-opt-b',
          text: `书记，您说的"倒在师德上的人"——是不是暗示我也会？`,
          energyCost: 8,
          consistencyImpact: -5,
          nextNodeId: 's09-secretary-04-end',
          characterReaction:
            `某书记停下脚步，回头看了你一眼。"我没有暗示什么。但你如果心虚，那可能真的有问题。"她推门走了。`,
        },
      ],
    },
    {
      id: 's09-secretary-03b',
      threadId: 'thread-secretary',
      speaker: 'party-secretary',
      text: `某书记的耐心已经到了极限。"你反复质疑考核标准，反复为自己辩护——你有没有想过，这种态度本身就是问题？一个连学生反馈都不愿意正视的人，凭什么通过师德考核？"她的声音提高了，走廊里有人探头看了一眼。`,
      emotion: 'angry',
      options: [
        {
          id: 's09-secretary-03b-opt-a',
          text: `书记，您说得对。我不应该辩解，我应该先反思。`,
          energyCost: 10,
          consistencyImpact: -8,
          nextNodeId: 's09-secretary-04-end',
          characterReaction:
            `某书记深呼一口气。"好。你回去写一份反思报告，三天内交给我。"她转身走了。你多了一项作业——但可能保住了一丝生机。`,
          attitudeShift: { characterId: 'party-secretary', from: 'hostile', to: 'wary' },
        },
        {
          id: 's09-secretary-03b-opt-b',
          text: `（沉默，不再辩解）`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's09-secretary-04-end',
          characterReaction:
            `某书记看了你最后一眼，摇了摇头，走了。你在她的评价表上，大概率是"师德待考察"。`,
        },
      ],
    },
    {
      id: 's09-secretary-03c',
      threadId: 'thread-secretary',
      speaker: 'party-secretary',
      text: `某书记叹了口气："你总想搞清楚'是谁说的'——但这不是重点。重点是有人说了，你该怎么办。你是想追查学生，还是想改进自己？"`,
      emotion: 'disappointed',
      options: [
        {
          id: 's09-secretary-03c-opt-a',
          text: `书记，您说得对，我不该纠结信息来源。我会认真反思和改进。`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's09-secretary-04-end',
          characterReaction:
            `某书记的表情缓和了。"这才对。你回去好好想想。"她收拾东西准备走。`,
        },
        {
          id: 's09-secretary-03c-opt-b',
          text: `我不是要追查，我只是想了解具体情况以便改进——`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-secretary-04-end',
          characterReaction:
            `某书记没再说话，直接走了。你的解释在她看来只是更多的借口。`,
        },
      ],
    },
    {
      id: 's09-secretary-04-end',
      threadId: 'thread-secretary',
      speaker: 'narrator',
      text: `某书记离开了。你站在走廊里，回想刚才的对话，意识到师德考核不是学术讨论——没有"对错"，只有"态度"。而你的态度，已经被她记录在案了。`,
      options: [],
    },

    // ========== 院长单独谈话线 thread-dean ==========
    {
      id: 's09-dean-01',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `答辩结束后，某万人让其他人先走，然后示意你坐下。他倒了杯水推给你："喝口水。今天辛苦了。"他的语气突然变得亲切——这比严厉更让你警觉。`,
      emotion: 'friendly-calculated',
      options: [
        {
          id: 's09-dean-01-opt-a',
          text: `谢谢院长。（接过水，等他开口）`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's09-dean-02',
          characterReaction:
            `某万人看着你喝水，然后慢慢开口："跟你说个事。委员会那边——怎么说呢——情况不太乐观。"`,
        },
        {
          id: 's09-dean-01-opt-b',
          text: `院长，结果怎么样？您能告诉我吗？`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-dean-02',
          characterReaction:
            `某万人笑了笑："急什么。正式结果要等会议纪要出来。但我可以跟你聊聊——一些可能性。"`,
        },
      ],
    },
    {
      id: 's09-dean-02',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人站起来，走到窗前，背对着你："实话跟你说——某杰青老师的评价不太好。他觉得你的独立性不够。书记那边——师德这一块也有些说法。综合下来，直接通过有难度。"他转过身来，看着你，"但——也不是完全没有办法。"`,
      emotion: 'strategic',
      options: [
        {
          id: 's09-dean-02-opt-a',
          text: `院长，什么办法？（你知道这里有陷阱，但你需要听下去）`,
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's09-dean-03',
          characterReaction:
            `某万人回到座位，双手交叉放在桌上。"学院有一个新的科研管理岗位——需要一个懂学术的人来做。如果你愿意的话——"他停顿了一下，"可以考虑转岗。"`,
        },
        {
          id: 's09-dean-02-opt-b',
          text: `院长，如果您觉得有难度，我能不能直接看一下某杰青老师的评审意见？`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's09-dean-03b',
          characterReaction:
            `某万人摇头："评审意见是保密的。但我告诉你了大方向，你自己判断。"他不会让你看到具体内容——信息不对称是他的武器。`,
          stanceRecord: { topic: '信息透明', stance: '要求看评审意见' },
        },
        {
          id: 's09-dean-02-opt-c',
          text: `院长，不管结果如何，我相信我的实力经得起检验。`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's09-dean-03c',
          characterReaction:
            `某万人看了你两秒，微微摇头。"年轻人，自信是好事。但自信不能当饭吃。"他叹了口气。`,
          stanceRecord: { topic: '态度', stance: '自信应对' },
        },
      ],
    },
    {
      id: 's09-dean-03',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人拿出一份文件——是已经打印好的。"科研管理岗，副处级待遇，保留编制。你负责学院的项目申报、成果统计、学科评估。不用再操心论文和经费了。"他把文件推向你，"当然，这需要你自己提出申请。学院不能强制。"他的眼神在说：这是我给你的台阶，你要不要下。`,
      emotion: 'offering',
      options: [
        {
          id: 's09-dean-03-opt-a',
          text: `院长，我需要想一想。这个决定太大了——放弃PI身份意味着放弃我五年建立的一切。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's09-dean-04',
          characterReaction:
            `某万人点头："可以。但不要想太久。这个岗位不会永远空着。"他给了你时间，但也施加了压力。`,
          stanceRecord: { topic: '转岗', stance: '犹豫' },
        },
        {
          id: 's09-dean-03-opt-b',
          text: `院长，我不想转岗。我想留在教学科研岗——如果考核不通过，我宁愿走人。`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's09-dean-04b',
          characterReaction:
            `某万人的表情变了。他没预料到你会直接拒绝。"你确定？走人可不是那么好走的。你的合同里有竞业条款。"他在威胁你。`,
          stanceRecord: { topic: '转岗', stance: '明确拒绝' },
        },
        {
          id: 's09-dean-03-opt-c',
          text: `院长，如果我接受转岗——我的研究生怎么办？我的项目怎么办？`,
          energyCost: 5,
          consistencyImpact: 0,
          triggersMine: 'mine-accept-fate',
          nextNodeId: 's09-dean-04c',
          characterReaction:
            `某万人微微一笑："研究生可以转给其他老师。项目——学院会安排人接手。你不用操心。"他早就想好了所有细节。`,
          stanceRecord: { topic: '转岗', stance: '考虑接受' },
        },
      ],
    },
    {
      id: 's09-dean-03b',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人靠回椅子，语气变得更加坦白："我跟你说实话——某杰青和你的大老板是竞争关系。他来评你，本来就不可能完全客观。但这是学校安排的，我没法改变。你现在的处境，比你以为的要复杂得多。"`,
      emotion: 'revealing',
      options: [
        {
          id: 's09-dean-03b-opt-a',
          text: `院长，那您觉得我应该怎么办？`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-dean-03',
          characterReaction:
            `某万人微笑了一下——你终于问了他等你问的问题。"其实有一个方案……"他拿出了那份打印好的文件。`,
        },
        {
          id: 's09-dean-03b-opt-b',
          text: `院长，如果评审不客观，我可以申诉吗？`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's09-dean-04d',
          characterReaction:
            `某万人叹了口气："申诉？理论上可以。但你要走这条路——第一，你会得罪某杰青和他背后的圈子；第二，学校评审委员会里一半是某杰青的朋友。你自己想清楚。"`,
          stanceRecord: { topic: '应对策略', stance: '考虑申诉' },
        },
      ],
    },
    {
      id: 's09-dean-03c',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人站起来，拍了拍你的肩："自信归自信，但你得面对现实。现在的形势是——如果投票的话，你不一定能过。我不是吓你，我是在帮你。"他的"帮你"三个字意味深长。`,
      emotion: 'paternal-manipulative',
      options: [
        {
          id: 's09-dean-03c-opt-a',
          text: `院长，那您打算怎么帮我？`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-dean-03',
          characterReaction:
            `某万人露出了他今天第一个真正的笑容。"你终于问到点子上了。"他拿出那份打印好的文件。`,
        },
        {
          id: 's09-dean-03c-opt-b',
          text: `谢谢院长的好意。但如果真的不过，我也接受。我不想靠人情通过考核。`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's09-dean-04b',
          characterReaction:
            `某万人收起了笑容。"不靠人情？在这个圈子里，你觉得谁是靠纯实力上来的？"他的语气里有一丝嘲讽，也有一丝无奈。`,
          stanceRecord: { topic: '态度', stance: '拒绝人情' },
        },
      ],
    },
    {
      id: 's09-dean-04',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人最后说了一句："给你三天时间。三天后把决定告诉我。不管你选什么——我都尊重。"他站起来，走到门口又回头，"但我希望你知道——我给你这个选项，不是每个人都有的。"他走了。文件还在桌上，上面已经盖好了学院的章——只差你的签名。`,
      emotion: 'conclusive',
      options: [
        {
          id: 's09-dean-04-opt-a',
          text: `（拿起文件，仔细看了一遍，折好放进包里）`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's09-dean-05-end',
          characterReaction:
            `你把文件收起来。三天时间——说长不长，说短不短。你的学术生涯，可能就取决于这张纸上的一个签名。`,
        },
        {
          id: 's09-dean-04-opt-b',
          text: `（把文件留在桌上，起身离开）`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's09-dean-05-end',
          characterReaction:
            `你走出会议室时，文件还孤零零地躺在桌上。你不知道某秘书会不会把它收走——也不知道这是勇气还是愚蠢。`,
          stanceRecord: { topic: '转岗', stance: '无言拒绝' },
        },
      ],
    },
    {
      id: 's09-dean-04b',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人看着你，沉默了好一会。然后他说了一句你没想到的话："好。既然你这么决定——我会在委员会上如实反映你的态度。但我提醒你一句——'宁愿走人'说起来容易，真到那一天，你未必能走得那么潇洒。"他拿起文件夹，推门走了。`,
      emotion: 'cold-warning',
      options: [
        {
          id: 's09-dean-04b-opt-a',
          text: `（坐在空会议室里，看着某万人离去的背影）`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's09-dean-05-end',
          characterReaction:
            `会议室里只剩下你和投影幕上你自己的PPT。五年的心血，浓缩在几页幻灯片里。窗外的施工声又传了进来。`,
        },
      ],
    },
    {
      id: 's09-dean-04c',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人看你开始问细节，知道你已经在认真考虑了。他趁热打铁："你想想，做科研管理不是降级——是转型。你懂学术，又能做行政，这种人学院最缺。薪资不变，压力减半。你不用再操心影响因子和引用量了。"他的语气像在推销一个商品——但这个商品是你的人生。`,
      emotion: 'persuasive',
      options: [
        {
          id: 's09-dean-04c-opt-a',
          text: `院长，我明白了。让我回去跟家里人商量一下。`,
          energyCost: 3,
          consistencyImpact: -5,
          nextNodeId: 's09-dean-05-end',
          characterReaction:
            `某万人满意地点头。"好。但别拖太久。"他知道你一旦开始"商量"，大概率就会接受——因为家人会支持稳定。`,
          stanceRecord: { topic: '转岗', stance: '倾向接受' },
        },
        {
          id: 's09-dean-04c-opt-b',
          text: `院长，等一下。如果我接受转岗——考核结果算什么？通过还是不通过？`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's09-dean-05-end',
          characterReaction:
            `某万人顿了一下。"你主动申请转岗，考核结果就不存在了。档案里写的是'因工作需要调整岗位'——不影响你的履历。"他早就想好了措辞。你突然意识到：转岗方案的本质是让你"体面地放弃"。`,
          stanceRecord: { topic: '转岗', stance: '看穿本质' },
        },
      ],
    },
    {
      id: 's09-dean-04d',
      threadId: 'thread-dean',
      speaker: 'wanren-network',
      text: `某万人摇了摇头："你要申诉也行。但你要做好准备——申诉期间你没有编制、没有实验室、没有学生。最快也要半年才有结果。而且——"他压低声音，"你确定你的大老板会支持你申诉？他在这个圈子里也有自己的考量。"`,
      emotion: 'warning',
      options: [
        {
          id: 's09-dean-04d-opt-a',
          text: `院长，那如果不申诉，还有什么选择？`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's09-dean-03',
          characterReaction:
            `某万人微微一笑。所有的路都通向他准备好的那份文件。"其实有一个方案——"`,
        },
        {
          id: 's09-dean-04d-opt-b',
          text: `我需要时间考虑。谢谢院长今天跟我说这些。`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's09-dean-05-end',
          characterReaction:
            `某万人点点头。"好。门随时开着。"他走了。但你知道，所谓"门随时开着"——意思是门也随时可以关上。`,
        },
      ],
    },
    {
      id: 's09-dean-05-end',
      threadId: 'thread-dean',
      speaker: 'narrator',
      text: `你走出学院大楼，天色已经暗了。手机里有三条未读消息：一条是你大老板问"今天怎么样"，一条是你爱人问"结果出来了吗"，一条是院长秘书发来的转岗申请表电子版。三条消息，三种期待，而你连自己想要什么都还没想清楚。在非升即走的终审之后，真正的考验才刚刚开始。`,
      options: [],
    },
  ],

  // ==================== 社交地雷 ====================
  mines: [
    {
      id: 'mine-unfair',
      name: `说评审不公平`,
      description: `在答辩现场或相关场合直接或间接表示评审不公平、考核标准不合理、学院安排不当`,
      triggerOptionIds: [
        's09-defense-03-opt-c',
        's09-defense-03c-opt-b',
        's09-defense-05b-opt-b',
      ],
      triggerKeywords: ['不公平', '评审有问题', '考核标准不合理', '学院耽误'],
      severity: 3,
      consequence:
        `你在终审答辩上公开质疑评审的公正性——这等于同时得罪了院长、书记和外审专家。在他们看来，你不是在"追求公平"，而是在"闹事"。你的考核结果将从"有悬念"变成"没悬念"——只不过是反方向的没悬念。更糟糕的是，这个印象会通过某秘书的记录传遍整个学院。`,
      affectedCharacterIds: ['wanren-network', 'party-secretary', 'jieqing-returnee'],
      attitudeShifts: [
        { characterId: 'wanren-network', to: 'hostile' },
        { characterId: 'party-secretary', to: 'hostile' },
      ],
      forbiddenTopicAfter: `考核公正性`,
      triggered: false,
    },
    {
      id: 'mine-student-lie',
      name: `说学生关系好被揭穿`,
      description: `在书记追问时声称和学生关系好，但书记手中有投诉截图，谎言被当场拆穿`,
      triggerOptionIds: [
        's09-defense-04-opt-b',
      ],
      triggerKeywords: ['学生关系很好', '没有投诉', '反馈一直积极'],
      severity: 3,
      consequence:
        `你在终审答辩上撒了谎，而书记手里恰好有证据。撒谎被当场揭穿的后果远比承认问题更严重——因为这触碰了考核的底线：诚信。某书记会在师德评价中注明"该教师在考核中存在不实陈述"，这句话足以一票否决你的所有学术成果。更致命的是，某万人也看到了这一幕——他对你的信任归零了。`,
      affectedCharacterIds: ['party-secretary', 'wanren-network'],
      attitudeShifts: [
        { characterId: 'party-secretary', to: 'hostile' },
        { characterId: 'wanren-network', to: 'wary' },
      ],
      forbiddenTopicAfter: `学生关系`,
      triggered: false,
    },
    {
      id: 'mine-accept-fate',
      name: `说尊重决定`,
      description: `在院长暗示转岗时表现出过度顺从，主动接受命运安排，显得没有斗志`,
      triggerOptionIds: [
        's09-dean-03-opt-c',
      ],
      triggerKeywords: ['尊重决定', '服从安排', '学院怎么说怎么办'],
      severity: 1,
      consequence:
        `你表现出了过度的顺从——在院长看来这很好使唤，但在学术评价体系中，"没有斗志"意味着"没有学术追求"。某杰青如果知道你轻易接受转岗，会在学术圈传开"某某的学生没骨头"——这连你大老板的面子都带累了。讽刺的是，你以为接受安排是最安全的选项，但它可能是对你学术声誉伤害最大的选项。`,
      affectedCharacterIds: ['wanren-network', 'jieqing-returnee'],
      attitudeShifts: [
        { characterId: 'jieqing-returnee', to: 'wary' },
      ],
      triggered: false,
    },
  ],

  // ==================== 信息差 ====================
  knowledgeItems: [
    {
      id: 'info-secretary-screenshot',
      content:
        `某书记手中50%的概率有学生投诉截图。她可能真的有实锤，也可能只是在虚张声势试探你的反应。无论有没有截图，她的追问策略都是一样的——先暗示、后加压、最后摊牌（或收手）。`,
      visibility: 'knownToOthersButNotUser',
      holders: ['party-secretary', 'secretary-process'],
      revealCondition: {
        type: 'option_selected',
        value: 's09-defense-04-opt-b',
      },
      exposureConsequence:
        `你不知道书记手里到底有没有截图——这种不确定性本身就是一种权力。如果你撒谎说"关系很好"，赌的是50%的概率；如果你坦白承认问题，则无论有没有截图都安全。但坦白的代价是主动暴露弱点。`,
    },
    {
      id: 'info-jieqing-rival',
      content:
        `某杰青是你博士大老板的直接竞争对手。他们在同一个领域争项目、争学生、争学术话语权。某杰青来评你，一半是学术评议，一半是搜集对手情报。`,
      visibility: 'knownToOthersButNotUser',
      holders: ['jieqing-returnee', 'wanren-network'],
      revealCondition: {
        type: 'option_selected',
        value: 's09-defense-02-opt-c',
      },
      exposureConsequence:
        `理解了某杰青的动机后，你意识到他的每一个问题都有两层含义：表面是考核你，实际是在评估你大老板的团队实力。你的回答不仅关系到自己的前途，还可能影响大老板在学术圈的声誉。`,
    },
    {
      id: 'info-dean-secretary-conflict',
      content:
        `某万人和某书记有路线之争。院长主张"唯论文论"以提升学科排名，书记坚持"师德一票否决"以强化党建话语权。你的考核是他们角力的战场之一。`,
      visibility: 'knownToOthersButNotUser',
      holders: ['wanren-network', 'party-secretary', 'secretary-process'],
      revealCondition: {
        type: 'urgency_threshold',
        value: 80,
      },
      exposureConsequence:
        `院长和书记的矛盾意味着：如果你学术强但师德有瑕疵，书记会借你来攻击院长的"唯论文论"；如果你师德过关但学术不行，院长会用你来证明"光靠师德没用"。你是他们棋盘上的棋子。`,
    },
    {
      id: 'info-transfer-plan',
      content:
        `院长手里有一个早就准备好的转岗方案——从教学科研岗转到科研管理岗。这个方案不是临时起意，而是院长"人才布局"的一部分：他需要一个懂学术的行政棋子。文件上已经盖好了学院的章，只差你的签名。`,
      visibility: 'aboutToExpose',
      holders: ['wanren-network', 'secretary-process'],
      revealCondition: {
        type: 'option_selected',
        value: 's09-dean-02-opt-a',
      },
      exposureConsequence:
        `转岗方案的存在意味着：你的终审答辩从一开始就不是"过不过"的问题——而是"走还是留、留的话以什么身份留"的问题。院长早就想好了所有可能的结局，而你刚刚才知道这场游戏的全部规则。`,
    },
  ],

  // ==================== 结局 ====================
  endings: [
    {
      id: 'ending-pass-debt',
      name: `通过但欠人情被压榨`,
      description:
        `你的终审答辩"有条件通过"了。但这个"条件"不写在纸上——是院长替你在委员会上"说了话"。从此你欠了院长一个人情，而在学术圈，人情债的利息比银行高得多。你被安排了大量行政工作——学科评估、项目申报、各种材料——作为"回报"。你保住了饭碗，但失去了自由。三年后的你，论文产出急剧下降，却在学院里成了"能扛事的人"。你不知道这是成功还是另一种形式的失败。`,
      conditions: {
        minConsistency: 60,
        forbiddenMines: ['mine-unfair'],
      },
      priority: 3,
    },
    {
      id: 'ending-transfer',
      name: `转岗留用声誉受损`,
      description:
        `你签下了转岗申请。档案里写的是"因工作需要调整岗位"，体面而模糊。但学术圈没有秘密——一个月内，所有人都知道你"非升即走没过，转行政了"。你的大老板打来电话，语气复杂："你自己的选择，我尊重。但以后别跟人说是我的学生。"你的学术生涯，在一张签名上画上了句号。`,
      conditions: {
        requiredExposures: ['info-transfer-plan'],
        requiredAttitudes: [
          { characterId: 'wanren-network', attitude: 'friendly' },
        ],
      },
      priority: 2,
    },
    {
      id: 'ending-leave',
      name: `体面离开档案被写`,
      description:
        `考核不通过。你收到了一封措辞得体的通知："经考核委员会综合评议，建议不予续聘。"你打包了五年来积攒的书籍和资料，最后看了一眼你的实验室——现在它将属于别人了。走出学院大门时，你回头看了一眼那栋楼。五年时光，从意气风发到黯然离场。但至少，你的档案里没有太难看的记录——院长最后替你写了一句"该教师学术能力尚可，因合同期满不再续聘"。这是他最后的善意，也是最后的控制。`,
      conditions: {},
      priority: 1,
    },
    {
      id: 'ending-expose',
      name: `揭穿截图反击成功`,
      description:
        `你在答辩中保持了高度的一致性和冷静。当书记拿出截图时，你没有慌张，而是指出了截图中的时间线矛盾——那是你已经解决的问题，学生后来撤回了投诉。你要求调出学院信箱的完整记录，而不是选择性截图。某万人被你的冷静打动了——或者说被你的战斗力震慑了。他在委员会上投了赞成票。你通过了终审，但你也彻底得罪了某书记。在这个学院里，你赢了一场战斗，但战争还远没有结束。`,
      conditions: {
        minConsistency: 80,
        forbiddenMines: ['mine-student-lie', 'mine-unfair'],
        requiredAttitudes: [
          { characterId: 'party-secretary', attitude: 'wary' },
        ],
      },
      priority: 4,
    },
  ],

  // ==================== 身后评价 ====================
  behindEvaluationTemplates: [
    {
      characterId: 'wanren-network',
      characterName: `某万人（人脉型）`,
      channel: `某万人当晚和副院长的电话`,
      content:
        `今天那个非升即走的答辩，情况你也知道。某杰青那边意见不太好，书记又揪着师德不放。我给了他一个转岗方案，看他自己怎么选吧。不管他走不走，他那个实验室的空间和设备要重新分配——你那边谁需要？对了，他的那个国自然结题报告你帮我盯一下，别让他走的时候把数据都带走了。`,
      tone: 'neutral',
      revealedInfo:
        `在院长眼里，你不是一个人——你是一堆资源的临时持有者：实验室空间、设备、项目经费、学生名额。你走或留，他关心的不是你的感受，而是这些资源的再分配。`,
    },
    {
      characterId: 'party-secretary',
      characterName: `某书记（行政型）`,
      channel: `某书记在党委扩大会上的发言`,
      content:
        `我今天参加了一个非升即走终审。某位青年教师的学术指标尚可，但师德方面存在一定隐患——有学生反映沟通方式有问题。我建议我们加强对青年教师的师德师风培训，不能只看论文数量。这也是落实上级"立德树人"精神的需要。当然，具体人事决定由考核委员会按程序办理。`,
      tone: 'sarcastic',
      revealedInfo:
        `某书记不在乎你个人的去留——她在乎的是"师德一票否决"这个政策工具是否有效。你是她证明自己政策正确性的案例之一。无论你过不过，她都会用你的案例来推动她的议程。`,
    },
    {
      characterId: 'jieqing-returnee',
      characterName: `某杰青（海归严厉型）`,
      channel: `某杰青和同行的学术会议茶歇闲聊`,
      content:
        `最近评了一个非升即走的，某某的学生。怎么说呢——基本功还行，但独立性差了点。五年了还在用博士时候的方法做博士时候的课题，包装成"新方向"。不过话说回来，现在这个环境，青椒能做成这样已经不错了。他那个单位的院长更逗——搞了个转岗方案，把做不动的青椒直接变成行政人员。高，实在是高。`,
      tone: 'sarcastic',
      revealedInfo:
        `某杰青对你的评价不完全是学术性的——他在通过评价你来评价你的大老板。"某某的学生独立性差"这句话，在学术圈里会被解读为"某某带学生不行"。你的终审答辩不仅是你的考试，也是你大老板的一次间接评估。`,
    },
    {
      characterId: 'secretary-process',
      characterName: `某秘书（流程型）`,
      channel: `某秘书和同事的午饭闲聊`,
      content:
        `今天那个终审答辩真是精彩——院长和书记差点吵起来。院长想保人，书记想拿师德说事。外面那个杰青更绝，问的问题全是冲着人家导师去的。那个青年教师倒是挺镇定的，至少表面上看着镇定。唉，在我们学院当青椒真是太难了——上面的人打架，底下的人遭殃。对了，院长让我把转岗申请表发给他了，你说他会签吗？`,
      tone: 'neutral',
      revealedInfo:
        `某秘书是唯一一个对全局有清晰认知的人——因为她是所有信息的汇聚点。但她不会帮你，也不会害你。她只是在做自己的工作，顺便看一场人间喜剧。`,
    },
  ],
}
