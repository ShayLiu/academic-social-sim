import type { ScenarioData } from '../../types/scenario'

export const s05ProposalDefense: ScenarioData = {
  id: 's05',
  phase: 'phd',
  title: '开题答辩',
  subtitle: '大小老板互撕',
  description:
    '博士开题答辩，本应是你展示研究计划的学术仪式。但你的大老板和小老板方向相左、互相看不顺眼，而你被夹在中间左右为难。',
  briefing:
    '你是某985高校博士二年级学生，今天是你的开题答辩。你的课题在大老板（某长江学者/院长）和小老板（某杰青/海归）的方向交叉处——本来是优势，现在成了火药桶。最近大小老板关系急剧恶化，你的开题报告里每一句话都可能被解读为"站队"。答辩委员会还请了一个和稀泥的某教授，以及一个看似旁观实则是某长江眼线的博后。你的目标只有一个：活着走出答辩厅。',
  difficulty: 4,
  estimatedMinutes: 30,
  playerRole: '某博士二年级学生，开题答辩',
  setting: '学院答辩厅',
  timeOfDay: '周五上午10:00',
  atmosphere:
    '答辩厅不大，投影幕布已经拉好。你的PPT在电脑上待命。评委席上坐着你的大老板、小老板、某教授和博后。大老板和小老板之间隔了两个座位，谁都没看对方。某教授翻着你的开题报告，偶尔抬头微笑。博后在角落记笔记。空气里弥漫着一种你说不上来的紧张感。',

  // ==================== 角色 ====================
  characters: [
    {
      id: 'changjiang-admin',
      name: '某长江（行政型）',
      title: '教授/长江学者/院长',
      age: 55,
      description:
        '你的大老板。名义上的第一导师，实际上一年见不了几次面。他关心的不是你的课题细节，而是你的方向是否符合他的"学科布局"。和小老板关系已经从微妙变成了公开的不愉快。',
      avatar: 'changjiang-male-smooth',
      personality: {
        faceWeight: 0.95,
        powerIndex: 95,
        grudgeMemory: 7,
        allianceFlexibility: 0.4,
        emotionalVolatility: 0.3,
      },
      socialParams: {
        approachability: 50,
        attentionSpan: 90,
        preferredTopics: ['学科前沿', '宏观方向', '项目规划'],
        forbiddenTopics: ['小老板的方向', '经费分配', '内部矛盾'],
        networkValue: 95,
        gossipFactor: 0.4,
        greetingStyle: 'formal',
        exitSignals: ['这个方向值得思考', '你回去再改改'],
        memoryDuration: 24,
      },
      hiddenAgenda:
        '想通过你的开题来限制小老板的方向扩张。如果你的课题偏向小老板的方向，他会以"不符合学科战略"为由要求大改。',
      initialAttitude: 'neutral',
      role: 'antagonist',
      initialPosition: '评委席左侧（主位）',
      relationship: '你的大老板/第一导师',
    },
    {
      id: 'jieqing-returnee',
      name: '某杰青（海归严厉型）',
      title: '教授/国家杰出青年基金获得者',
      age: 44,
      description:
        '你的小老板。实际上指导你做课题的人。他的方向前沿但激进，和大老板的"稳妥路线"格格不入。他希望你的开题能为他的方向正名。',
      avatar: 'jieqing-male-stern',
      personality: {
        faceWeight: 0.7,
        powerIndex: 80,
        grudgeMemory: 9,
        allianceFlexibility: 0.2,
        emotionalVolatility: 0.6,
      },
      socialParams: {
        approachability: 35,
        attentionSpan: 150,
        preferredTopics: ['方法创新', '实验设计', '国际前沿'],
        forbiddenTopics: ['行政', '大老板的看法', '毕业年限'],
        networkValue: 85,
        gossipFactor: 0.3,
        greetingStyle: 'formal',
        exitSignals: ['你的方法论有问题', '回去重新想'],
        memoryDuration: 36,
      },
      hiddenAgenda:
        '想让你的开题报告成为他方向的"前哨战"，证明自己的路线是对的。如果大老板否定你的课题，等于否定了他的学术判断。',
      initialAttitude: 'friendly',
      role: 'wildcard',
      initialPosition: '评委席右侧',
      relationship: '你的小老板/实际指导人',
    },
    {
      id: 'prof-warm',
      name: '某教授（无帽子温暖型）',
      title: '教授',
      age: 58,
      description:
        '答辩委员会成员。在学院里资历最老但没有帽子，人缘好，是公认的"和稀泥专家"。他被请来就是为了在大小老板吵起来时充当缓冲垫。',
      avatar: 'prof-male-warm',
      personality: {
        faceWeight: 0.5,
        powerIndex: 50,
        grudgeMemory: 1,
        allianceFlexibility: 0.9,
        emotionalVolatility: 0.1,
      },
      socialParams: {
        approachability: 90,
        attentionSpan: 300,
        preferredTopics: ['学生培养', '研究意义', '学术精神'],
        forbiddenTopics: ['站队', '帽子评选'],
        networkValue: 45,
        gossipFactor: 0.1,
        greetingStyle: 'warm',
        exitSignals: ['年轻人好好干', '有前途'],
        memoryDuration: 6,
      },
      hiddenAgenda:
        '来和稀泥的。如果场面失控，他会建议"暂停，改天再答辩"——这对你来说也不是好结果。如果大小老板矛盾太深，他可能会私下建议你换小老板。',
      initialAttitude: 'friendly',
      role: 'ally',
      initialPosition: '评委席中间',
      relationship: '答辩委员会成员/和稀泥',
    },
    {
      id: 'postdoc-limbo',
      name: '某博后（过渡迷茫型）',
      title: '博士后',
      age: 30,
      description:
        '名义上是答辩记录员，实际上是大老板安排来的眼线。他负责把答辩情况汇报给大老板——包括小老板说了什么、你站了谁的队。他自己也很为难。',
      avatar: 'postdoc-male-tired',
      personality: {
        faceWeight: 0.4,
        powerIndex: 15,
        grudgeMemory: 2,
        allianceFlexibility: 0.9,
        emotionalVolatility: 0.2,
      },
      socialParams: {
        approachability: 55,
        attentionSpan: 600,
        preferredTopics: ['实验方法', '数据处理'],
        forbiddenTopics: ['他的眼线身份', '续聘'],
        networkValue: 15,
        gossipFactor: 0.8,
        greetingStyle: 'casual',
        exitSignals: ['我记下了', '回头整理一下'],
        memoryDuration: 12,
      },
      hiddenAgenda:
        '被大老板安排来记录和观察。他需要把答辩的"关键信息"汇报回去。但他对你有一些同情——因为他也曾被夹在两个导师之间。',
      initialAttitude: 'neutral',
      role: 'wildcard',
      initialPosition: '角落，笔记本打开记录',
      relationship: '记录员/大老板的眼线',
    },
  ],

  // ==================== 对话线程 ====================
  threads: [
    {
      id: 'thread-defense',
      characterId: 'jieqing-returnee',
      label: '答辩正式问答',
      urgency: 70,
      status: 'active',
      currentNodeId: 's05-defense-01',
      lastInteractedAt: 0,
      autoMessages: [
        '某长江看了一眼手表。',
        '某杰青在你的开题报告上画了好几个圈。',
        '某教授倒了杯水，神情平静。',
      ],
      deteriorateEvent:
        '你的汇报超时了。某长江直接打断你："时间到了。委员会讨论一下。"你甚至还没来得及说结论。',
    },
    {
      id: 'thread-boss-hint',
      characterId: 'changjiang-admin',
      label: '大老板暗示——方向要改',
      urgency: 40,
      status: 'waiting',
      currentNodeId: 's05-boss-01',
      lastInteractedAt: 0,
      autoMessages: [
        '某长江在你汇报时清了一下嗓子。',
        '某长江翻开了你的开题报告，用笔在某一页重重划了一条线。',
        '某长江和博后交换了一个眼神。',
      ],
      deteriorateEvent:
        '某长江直接在答辩现场宣布："这个课题方向不符合学科战略规划，建议重新论证。"你的开题被当场否决。',
    },
    {
      id: 'thread-advisor-pressure',
      characterId: 'jieqing-returnee',
      label: '小老板施压——不能退让',
      urgency: 35,
      status: 'waiting',
      currentNodeId: 's05-advisor-01',
      lastInteractedAt: 0,
      autoMessages: [
        '某杰青给你递了一个眼色，似乎在说"坚持住"。',
        '某杰青开始敲桌子，表情越来越凝重。',
        '某杰青在你的PPT某一页标了一个大大的感叹号。',
      ],
      deteriorateEvent:
        '某杰青在答辩现场和某长江正面交锋，场面彻底失控。你的开题答辩变成了两个导师的学术路线之争。',
    },
  ],

  // ==================== 对话节点 ====================
  dialogNodes: [
    // ========== 答辩正式问答线 thread-defense ==========
    {
      id: 's05-defense-01',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: '你打开PPT，深吸一口气。第一页是课题标题。你注意到大老板和小老板几乎同时在看标题——一个微微皱眉，一个微微点头。你开始汇报。',
      emotion: 'tense',
      options: [
        {
          id: 's05-defense-01-opt-a',
          text: '从大老板的学科框架切入，先致敬他的"顶层设计"，再逐步引入小老板的具体方法。',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's05-defense-02',
          characterReaction:
            '某长江微微点头，某杰青面无表情但手指在桌上轻轻敲了两下。',
          stanceRecord: { topic: '汇报策略', stance: '先尊大老板再引小老板' },
        },
        {
          id: 's05-defense-01-opt-b',
          text: '直接切入研究问题和方法论，用学术逻辑说话，不去讨好任何一方。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's05-defense-02b',
          characterReaction:
            '某教授赞许地点头。某长江和某杰青都在听，但表情微妙。',
          stanceRecord: { topic: '汇报策略', stance: '中立学术路线' },
        },
        {
          id: 's05-defense-01-opt-c',
          text: '从小老板最新发表的文章出发，强调方法创新和国际前沿性。',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's05-defense-02c',
          characterReaction:
            '某杰青露出满意的微笑。某长江的眉头拧成了一个"川"字。博后在本子上快速记了几笔。',
          stanceRecord: { topic: '汇报策略', stance: '偏向小老板方向' },
        },
      ],
    },
    {
      id: 's05-defense-02',
      threadId: 'thread-defense',
      speaker: 'changjiang-admin',
      text: `你汇报到一半，某长江举手打断你："等一下。你刚才提到的'XX方法'，这个不在我们学科的重点方向里。你能解释一下为什么要用这个方法？"他的语气平静，但所有人都知道这是在针对小老板的方向。`,
      emotion: 'challenging',
      options: [
        {
          id: 's05-defense-02-opt-a',
          text: '院长好问题。这个方法确实是比较新的尝试，但它能解决传统方法无法处理的XX问题。而且从学科发展来看，这个方向与您提出的"YY框架"是互补的。',
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's05-defense-03',
          characterReaction:
            '某长江想了想，暂时没有反驳。某杰青在一旁松了口气。某教授点头微笑。',
          stanceRecord: { topic: '方法选择', stance: '桥接双方' },
        },
        {
          id: 's05-defense-02-opt-b',
          text: '这个方法是某杰青老师建议我采用的，在国际上已经有很多成功案例……',
          energyCost: 5,
          consistencyImpact: -5,
          triggersMine: 'mine-side-jieqing',
          nextNodeId: 's05-defense-03b',
          characterReaction:
            '你刚说出"某杰青老师建议"五个字，空气就凝固了。某长江的脸色变了。你把球踢给了小老板——这等于公开站队。',
          riskTag: '雷区：站队小老板',
          stanceRecord: { topic: '方法选择', stance: '站队小老板' },
        },
        {
          id: 's05-defense-02-opt-c',
          text: '院长您说得对，这个方法确实需要更多论证。我会在正式开题中补充传统方法的对比分析。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's05-defense-03c',
          characterReaction:
            '某长江满意地点头。某杰青的脸色沉了下来——你当着所有人的面否定了他建议的方法。',
          stanceRecord: { topic: '方法选择', stance: '妥协向大老板' },
        },
      ],
    },
    {
      id: 's05-defense-02b',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: '你用学术逻辑汇报完方法论后，某杰青第一个提问："你的方法框架很清晰。但我想问一下，你在文献综述里怎么没有引用XX领域的最新进展？那是我们目前最重要的方向。"他说"我们"的时候，目光扫了一下某长江。',
      emotion: 'probing',
      options: [
        {
          id: 's05-defense-02b-opt-a',
          text: '谢谢老师指出。XX领域的最新进展确实和我的课题有关，我会在修改稿中补充。同时我也想结合传统方法做一个对比——',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's05-defense-03',
          characterReaction:
            '某杰青对你的回答还算满意。某长江没有反对。',
          stanceRecord: { topic: '文献范围', stance: '兼收并蓄' },
        },
        {
          id: 's05-defense-02b-opt-b',
          text: '老师，XX领域我考虑过，但和我的课题核心问题关联度不是特别大，所以暂时没放进来。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's05-defense-03d',
          characterReaction:
            '某杰青面色不悦。你拒绝了他的方向暗示。某长江在旁边露出一丝若有若无的笑意。',
          stanceRecord: { topic: '文献范围', stance: '独立判断' },
        },
      ],
    },
    {
      id: 's05-defense-02c',
      threadId: 'thread-defense',
      speaker: 'changjiang-admin',
      text: `某长江打断了你的汇报："等一下，你一上来就引用某杰青的文章，那请问你的课题跟我们学科的重点方向是什么关系？我看你的开题报告里，几乎没有提到学科'十四五'规划中的任何一个关键词。"语气已经不太客气了。`,
      emotion: 'displeased',
      options: [
        {
          id: 's05-defense-02c-opt-a',
          text: '院长，抱歉表述不够清晰。我的课题实际上是在"十四五"规划的XX方向下进行的，只是在方法上做了一些创新尝试——',
          energyCost: 10,
          consistencyImpact: -3,
          nextNodeId: 's05-defense-03',
          characterReaction:
            '某长江勉强接受了这个解释，但他已经对你的立场有了判断。某杰青微微皱眉——你在给他贴"创新尝试"的标签，暗示他的方向只是"尝试"而非"主流"。',
          stanceRecord: { topic: '方向定位', stance: '亡羊补牢向大老板靠拢' },
        },
        {
          id: 's05-defense-02c-opt-b',
          text: '院长，我认为好的研究不应该被规划限制。国际前沿的发展往往超前于规划——',
          energyCost: 8,
          consistencyImpact: 5,
          triggersMine: 'mine-side-jieqing',
          nextNodeId: 's05-defense-03b',
          characterReaction:
            '某长江的脸完全沉了下来。你当着所有人的面质疑了他牵头制定的"十四五"规划。某杰青在一旁面色复杂——他同意你的话，但知道你闯了大祸。',
          riskTag: '雷区：公开质疑大老板',
          stanceRecord: { topic: '方向定位', stance: '挑战行政权威' },
        },
      ],
    },
    {
      id: 's05-defense-03',
      threadId: 'thread-defense',
      speaker: 'prof-warm',
      text: '某教授适时开口了，语气温和："我觉得这位同学的课题有自己的思考，方向上也是有空间的。当然具体方法可以再讨论。"他试图缓和气氛，但大小老板的脸色都没有完全放松。然后他看向你："同学，你能不能用一句话总结你的核心研究问题？"',
      emotion: 'mediating',
      options: [
        {
          id: 's05-defense-03-opt-a',
          text: '我的核心问题是：在XX领域中，如何结合传统框架和前沿方法来解决YY问题。我认为两者不是矛盾的，而是互补的。',
          energyCost: 8,
          consistencyImpact: 8,
          nextNodeId: 's05-defense-04',
          characterReaction:
            '某教授满意地点头。某长江和某杰青都没有立刻反驳——"互补"这个词暂时把两个人的面子都保住了。',
          stanceRecord: { topic: '核心定位', stance: '桥接融合' },
        },
        {
          id: 's05-defense-03-opt-b',
          text: '我的核心问题是……（你犹豫了，不知道该偏向哪边的表述）其实我还在理清思路……',
          energyCost: 10,
          consistencyImpact: -8,
          nextNodeId: 's05-defense-04c',
          characterReaction:
            '某教授的笑容僵了一下。某长江直接靠回椅背。某杰青叹了口气。你在开题答辩上说"还在理清思路"——这几乎是自杀。',
          stanceRecord: { topic: '核心定位', stance: '没想清楚' },
        },
        {
          id: 's05-defense-03-opt-c',
          text: '我的核心问题是运用XX前沿方法来突破YY领域的瓶颈。这是国际上最活跃的研究方向之一。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's05-defense-04b',
          characterReaction:
            '某杰青微笑。某长江面无表情。你的表述偏向了小老板，但至少说得有底气。',
          stanceRecord: { topic: '核心定位', stance: '偏前沿方法' },
        },
      ],
    },
    {
      id: 's05-defense-03b',
      threadId: 'thread-defense',
      speaker: 'changjiang-admin',
      text: '某长江的语气已经带上了火药味："我提醒你一下，你的经费来自学科建设基金——也就是我批的。如果你的方向脱离了学科框架，经费续拨是有问题的。"他没有看某杰青，但每个人都知道这是说给谁听的。',
      emotion: 'threatening',
      options: [
        {
          id: 's05-defense-03b-opt-a',
          text: '院长，我理解经费来源和学科框架的关系。我会在修改报告中加强与学科方向的对接。',
          energyCost: 8,
          consistencyImpact: -5,
          nextNodeId: 's05-defense-04',
          characterReaction:
            '某长江"嗯"了一声。某杰青的脸色难看到了极点——你在他面前向权力低了头。',
          stanceRecord: { topic: '经费压力', stance: '向权力妥协' },
        },
        {
          id: 's05-defense-03b-opt-b',
          text: '（看向某杰青，等他说话）',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's05-defense-04-crisis',
          characterReaction:
            '某杰青接收到了你的求救信号。他坐直身体，准备开口——但这意味着大小老板将在答辩现场正面交锋。',
          stanceRecord: { topic: '危机处理', stance: '把球踢给小老板' },
        },
      ],
    },
    {
      id: 's05-defense-03c',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: `某杰青终于忍不住了。他的语气克制但尖锐："同学，你不需要'补充传统方法对比'。我们选的这个方法是有充分依据的。你不要因为——"他顿了一下，没有说出"因为某些人的意见"，但所有人都心知肚明。`,
      emotion: 'frustrated',
      options: [
        {
          id: 's05-defense-03c-opt-a',
          text: '老师，我的意思是在原有方法的基础上增加对比分析，让论证更完整。这不是否定我们的方法。',
          energyCost: 10,
          consistencyImpact: 3,
          nextNodeId: 's05-defense-04',
          characterReaction:
            '某杰青想了想，没再坚持。但他的不满写在脸上。某长江端起茶杯喝了一口，什么也没说。',
          stanceRecord: { topic: '方法争议', stance: '两面安抚' },
        },
        {
          id: 's05-defense-03c-opt-b',
          text: '某杰青老师说得对，我刚才的表述不准确。我的方法论核心就是XX方法，传统方法只是参照。',
          energyCost: 5,
          consistencyImpact: -5,
          triggersMine: 'mine-side-jieqing',
          nextNodeId: 's05-defense-04b',
          characterReaction:
            '你在三十秒内从"补充传统方法"翻转为"核心就是XX方法"——你的前后矛盾被所有人看在眼里。某长江冷笑了一下。',
          riskTag: '一致性崩塌',
        },
      ],
    },
    {
      id: 's05-defense-03d',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: '某杰青被你拒绝后沉默了几秒，然后冷冷地说："既然你觉得XX领域关联度不大，那你的方法论依据从何而来？你用的那个模型就是从XX领域来的。"他在公开指出你的知识盲区。',
      emotion: 'cold',
      options: [
        {
          id: 's05-defense-03d-opt-a',
          text: '老师说得对，我的表述有误。模型确实来自XX领域，我应该在文献综述中充分体现这一点。感谢老师的指正。',
          energyCost: 10,
          consistencyImpact: -3,
          nextNodeId: 's05-defense-04',
          characterReaction:
            '某杰青微微点头，但你知道他对你的独立判断已经不太满意了——你既没有听他的建议，又被他发现了漏洞。',
        },
        {
          id: 's05-defense-03d-opt-b',
          text: '老师，模型来源和研究关联度是两回事。我用的是模型的数学框架，不是它在XX领域的应用场景。',
          energyCost: 12,
          consistencyImpact: 8,
          nextNodeId: 's05-defense-04',
          characterReaction:
            '某杰青愣了一下。你居然在答辩现场正面反驳了他。某教授在一旁轻声说了句"有道理"。某长江饶有兴致地看着这一幕。',
          stanceRecord: { topic: '学术论证', stance: '独立思考' },
        },
      ],
    },
    {
      id: 's05-defense-04',
      threadId: 'thread-defense',
      speaker: 'changjiang-admin',
      text: `答辩进入提问环节。某长江翻到你开题报告的最后一页，指着一个表格说："你的时间规划里，第一年的主要工作是'方法开发'——这部分经费预算是多少？从哪个项目出？"这不是学术问题，这是行政问题。他在用经费卡你。`,
      emotion: 'calculated',
      options: [
        {
          id: 's05-defense-04-opt-a',
          text: '院长，经费方面我和某杰青老师讨论过，打算从他的国自然项目里支出。当然如果学科建设经费有额度的话——',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某长江的脸色微妙。你提到了某杰青的经费来源——这等于告诉他，你的课题不完全依赖他的控制。他不高兴。',
        },
        {
          id: 's05-defense-04-opt-b',
          text: '院长，经费安排我还没有最终确定，需要跟两位老师再商量。',
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某长江不满意这个回答。"开题报告里连经费都没规划好？"某杰青皱了皱眉——经费是他的敏感话题，他和大老板在这方面有矛盾。',
        },
        {
          id: 's05-defense-04-opt-c',
          text: '院长，我想请教一下，学科建设经费今年还有多少额度？如果可以的话，我希望能得到学科的支持。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某长江对这个问法很满意——你在向他请求资源，这是在承认他的权威。某杰青面色不悦但没有说话。',
          stanceRecord: { topic: '经费来源', stance: '主动请求大老板支持' },
        },
      ],
    },
    {
      id: 's05-defense-04b',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: '某杰青趁着某长江翻材料的间隙，压低声音对你说："你的方向是对的，不要动摇。答辩完我们单独聊。"这句话虽小，但在这个房间里，每个人的耳朵都竖着。',
      emotion: 'supportive',
      options: [
        {
          id: 's05-defense-04b-opt-a',
          text: '（微微点头，但不做明确回应）',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某杰青满意地微微一笑。博后在本子上记下了什么。',
        },
        {
          id: 's05-defense-04b-opt-b',
          text: '（假装没听到，继续翻PPT）',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某杰青的表情有些受伤。他帮你说话，你却当没听到。',
          stanceRecord: { topic: '对小老板', stance: '刻意保持距离' },
        },
        {
          id: 's05-defense-04b-opt-c',
          text: '谢谢老师的鼓励。不过我觉得院长提的问题也值得认真思考。',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某杰青的脸色变了。你在他面前给了大老板面子——这在他看来是一种背叛。某长江在旁边露出了一丝笑意。',
          stanceRecord: { topic: '忠诚', stance: '不偏不倚' },
          attitudeShift: {
            characterId: 'jieqing-returnee',
            from: 'friendly',
            to: 'wary',
          },
        },
      ],
    },
    {
      id: 's05-defense-04c',
      threadId: 'thread-defense',
      speaker: 'prof-warm',
      text: `某教授插话了，语气依然温和但带着一丝严肃："同学，开题答辩的核心是你对自己课题的清晰认知。你现在说'还在理清思路'，是不是准备得不太充分？我建议——是不是可以考虑延后答辩？"`,
      emotion: 'concerned',
      options: [
        {
          id: 's05-defense-04c-opt-a',
          text: '某教授，不是的，我有思路。刚才是太紧张了没有表达好。我的核心问题是——',
          energyCost: 12,
          consistencyImpact: -5,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某教授给了你一个鼓励的眼神。但你的紧张已经被所有人看到了——"抗压能力"这一栏，可能不会太好看。',
        },
        {
          id: 's05-defense-04c-opt-b',
          text: '（深吸一口气）好吧……如果委员会觉得需要延后的话，我可以接受。',
          energyCost: 5,
          consistencyImpact: -10,
          nextNodeId: 's05-defense-05-postpone',
          characterReaction:
            '你主动接受了延后。某长江松了口气——他正好不想让这个课题现在通过。某杰青的脸色铁青。',
        },
      ],
    },
    {
      id: 's05-defense-04-crisis',
      threadId: 'thread-defense',
      speaker: 'jieqing-returnee',
      text: '某杰青接收到你的目光，坐直身体，语气平静但锋利："院长，我想请教一下——学科建设经费是用来支持创新研究的，还是用来做行政管理的附属品？"全场鸦雀无声。你把火药桶点着了。',
      emotion: 'confrontational',
      options: [
        {
          id: 's05-defense-04-crisis-opt-a',
          text: '（赶紧打圆场）两位老师，我觉得这个问题可以会后再讨论。我的开题报告中关于经费的部分，我会根据两位老师的意见修改——',
          energyCost: 12,
          consistencyImpact: -3,
          nextNodeId: 's05-defense-05',
          characterReaction:
            '某教授立刻接话："对对对，学生说得对，这些问题会后再商量。我们先继续看开题。"但火药味已经弥漫开了。',
        },
        {
          id: 's05-defense-04-crisis-opt-b',
          text: '（沉默，看着两个导师对峙）',
          energyCost: 5,
          consistencyImpact: 0,
          triggersMine: 'mine-expose-conflict',
          nextNodeId: 's05-defense-05-crisis',
          characterReaction:
            '某长江冷笑着回击。场面彻底失控。你的开题答辩变成了两位导师的公开撕逼。',
        },
      ],
    },
    {
      id: 's05-defense-05',
      threadId: 'thread-defense',
      speaker: 'prof-warm',
      text: '答辩接近尾声。某教授看了看两位导师的脸色，主持总结："我个人认为，这位同学的课题有一定的研究价值，方向上可以再做调整和完善。建议——"他看了看某长江，又看了看某杰青，"建议通过，附修改意见。各位觉得呢？"',
      emotion: 'diplomatic',
      options: [
        {
          id: 's05-defense-05-opt-a',
          text: '谢谢各位老师的指导。我会认真吸收修改意见，争取在一个月内提交修改稿。',
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's05-defense-06',
          characterReaction:
            '某长江和某杰青都没有反对——至少在表面上。某教授松了口气。你活下来了。',
        },
        {
          id: 's05-defense-05-opt-b',
          text: '谢谢老师们。关于修改方向，我想确认一下：我应该主要参考哪位老师的意见？',
          energyCost: 8,
          consistencyImpact: -10,
          triggersMine: 'mine-expose-conflict',
          nextNodeId: 's05-defense-06-bomb',
          characterReaction:
            '全场沉默。你在公开场合问出了那个所有人都在回避的问题——"到底听谁的？"某教授尴尬地咳了一声。某长江和某杰青同时开口了。',
          riskTag: '核弹：暴露大小老板不合',
        },
      ],
    },
    {
      id: 's05-defense-05-postpone',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: '你的开题答辩被延后了。这意味着你至少要再等一个学期才能重新答辩。在博士生涯中，每延后一次开题，毕业就远一步。某杰青在散会后找到你，压低声音说了句："你怎么能这么轻易就放弃？"他的失望比愤怒更让你难受。',
      options: [],
    },
    {
      id: 's05-defense-05-crisis',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: '两位导师在答辩现场公开交锋。某长江指责某杰青"搞小山头"，某杰青反击某长江"用行政压学术"。某教授多次试图打圆场都失败了。博后在角落里拼命记笔记——这些内容今晚就会出现在大老板的微信里。你坐在PPT前，感觉自己像台风眼里的一片落叶。',
      options: [],
    },
    {
      id: 's05-defense-06',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: '答辩结束了。你的开题"有条件通过"——这在中国学术界是最常见的结果，既不算成功也不算失败。真正的挑战还在后面：你需要在修改稿中巧妙地平衡两位导师的意见，而不触发任何一方的不满。这场答辩让你明白了一个道理：在中国学术圈做博士，最重要的能力不是科研能力，而是政治生存能力。',
      options: [],
    },
    {
      id: 's05-defense-06-bomb',
      threadId: 'thread-defense',
      speaker: 'narrator',
      text: '你的一句话引爆了整个答辩厅。某长江和某杰青同时开口，互相打断，声音越来越大。某教授拼命打圆场但无济于事。最终某教授不得不宣布"答辩暂停，择日再议"。你走出答辩厅时，两位导师还在里面争吵。博后小跑着跟出来，给你递了一杯水，低声说："完了，你们组要炸了。"',
      options: [],
    },

    // ========== 大老板暗示线 thread-boss-hint ==========
    {
      id: 's05-boss-01',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '答辩结束后，某长江叫住你："你留一下，我跟你说两句。"等其他人都走了，他靠在椅子上看着你："你今天的表现……怎么说呢，不太让我满意。"',
      emotion: 'displeased',
      options: [
        {
          id: 's05-boss-01-opt-a',
          text: '院长，对不起，我确实准备不够充分。您觉得哪些方面需要重点修改？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's05-boss-02',
          characterReaction:
            '某长江叹了口气："不是准备的问题。是方向的问题。"他站起来走到窗前。',
        },
        {
          id: 's05-boss-01-opt-b',
          text: '院长，我觉得我的课题方向是有价值的，只是在表述上可能需要调整——',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's05-boss-02b',
          characterReaction:
            '某长江转过头来，目光锐利："你在跟我争？"',
        },
      ],
    },
    {
      id: 's05-boss-02',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '某长江背对着你说："我说句不好听的——你现在的课题方向，完全是某杰青的路子。你有没有想过，他的方向和我们学科的大方向是冲突的？你跟着他走这条路，以后在学院里很难立足。"',
      emotion: 'threatening',
      options: [
        {
          id: 's05-boss-02-opt-a',
          text: '院长，我理解您的考虑。那您觉得我应该往哪个方向调整？',
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's05-boss-03',
          characterReaction:
            '某长江转过身，露出满意的表情。"你终于问到点子上了。"',
          stanceRecord: { topic: '服从', stance: '向大老板请示方向' },
        },
        {
          id: 's05-boss-02-opt-b',
          text: '院长，某杰青老师是我的实际指导人，他的方向建议不是没有道理——',
          energyCost: 10,
          consistencyImpact: 3,
          triggersMine: 'mine-side-changjiang',
          nextNodeId: 's05-boss-03b',
          characterReaction:
            '某长江的脸色冷了下来："你是在告诉我，你选择站在他那边？"',
          riskTag: '雷区：明确支持小老板',
          stanceRecord: { topic: '忠诚', stance: '支持小老板' },
        },
        {
          id: 's05-boss-02-opt-c',
          text: '院长，我只是一个学生，我的课题应该由学术价值来决定，不应该牵涉到老师之间的……',
          energyCost: 12,
          consistencyImpact: 5,
          triggersMine: 'mine-expose-conflict',
          nextNodeId: 's05-boss-03c',
          characterReaction:
            '你把房间里的大象指了出来。某长江沉默了很久。',
          riskTag: '高风险：直言大小老板矛盾',
        },
      ],
    },
    {
      id: 's05-boss-02b',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '某长江走回桌前，坐下来，双手交叉："我不是在跟你争论。我是在告诉你一个事实——你的经费、你的实验室工位、你的答辩委员会组成……这些都由我来安排。你想清楚你应该听谁的。"这不是暗示，这是明晃晃的威胁。',
      emotion: 'cold',
      options: [
        {
          id: 's05-boss-02b-opt-a',
          text: '院长，我听您的。请您告诉我应该怎么改。',
          energyCost: 5,
          consistencyImpact: -8,
          nextNodeId: 's05-boss-03',
          characterReaction:
            '某长江满意了。"这就对了。你本来就该听大老板的，小老板懂什么。"',
          stanceRecord: { topic: '服从', stance: '完全服从大老板' },
          attitudeShift: {
            characterId: 'changjiang-admin',
            from: 'neutral',
            to: 'friendly',
          },
        },
        {
          id: 's05-boss-02b-opt-b',
          text: '院长，我需要时间想想。',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's05-boss-03d',
          characterReaction:
            '某长江冷冷地看了你一眼："时间有限。你自己掂量吧。"',
        },
      ],
    },
    {
      id: 's05-boss-03',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '某长江拿起笔，在你的开题报告上刷刷写了几个关键词："你把方向往这边靠。XX方向、YY框架、ZZ应用。跟学科规划对齐。你回去重新写。"他说完把报告推到你面前。这不是建议，这是命令。',
      emotion: 'commanding',
      options: [
        {
          id: 's05-boss-03-opt-a',
          text: '好的院长，我按您的意见修改。',
          energyCost: 3,
          consistencyImpact: -5,
          nextNodeId: 's05-boss-04-end',
          characterReaction:
            '某长江点头。"去吧。改完先给我看，不要直接给某杰青。"',
          stanceRecord: { topic: '服从', stance: '接受大老板全面改方向' },
        },
        {
          id: 's05-boss-03-opt-b',
          text: '院长，这些关键词我会融入修改稿。但原来的核心方法我还是想保留——',
          energyCost: 10,
          consistencyImpact: 3,
          nextNodeId: 's05-boss-04',
          characterReaction:
            '某长江皱了皱眉："你要保留什么？"他在等你给一个他可以接受的理由。',
          stanceRecord: { topic: '服从', stance: '部分接受大老板意见' },
        },
      ],
    },
    {
      id: 's05-boss-03b',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '某长江站起来，走到门口，背对着你说："你知道某杰青在学院里的处境吗？他的方向得不到学科委员会的支持，经费一年比一年少。你跟着他，是一条死路。我说这话不是为了打压他——我是为了你好。"',
      emotion: 'cold',
      options: [
        {
          id: 's05-boss-03b-opt-a',
          text: '院长，谢谢您的提醒。我会重新评估我的方向。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's05-boss-04-end',
          characterReaction:
            '某长江微微点头，打开门让你出去。"好好想想。"',
        },
        {
          id: 's05-boss-03b-opt-b',
          text: '院长，某杰青老师的方向虽然不是主流，但学术价值——',
          energyCost: 12,
          consistencyImpact: 5,
          nextNodeId: 's05-boss-04',
          characterReaction:
            '某长江直接打断你："学术价值？没有资源，什么价值都是空谈。你走吧。"他已经不想再谈了。',
        },
      ],
    },
    {
      id: 's05-boss-03c',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '某长江沉默了很久。然后他说了一句让你意想不到的话："你说得对。不该牵涉到我们的事。"他顿了一下，"但现实就是这样。你是我的学生，也是他的学生。你做什么选择，决定了你站在哪一边。这不是我定的规则——这是这个圈子的规则。"',
      emotion: 'honest',
      options: [
        {
          id: 's05-boss-03c-opt-a',
          text: '院长，我不想站队。我只想做好我的课题。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's05-boss-04',
          characterReaction:
            '某长江苦笑了一下。"不想站队？在这个圈子里，不站队本身就是一种立场。你走吧。"',
        },
        {
          id: 's05-boss-03c-opt-b',
          text: '（沉默。你不知道该说什么。）',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's05-boss-04-end',
          characterReaction:
            '某长江站起来，拍了拍你的肩。"你还年轻，有些事慢慢就懂了。去吧。"',
        },
      ],
    },
    {
      id: 's05-boss-03d',
      threadId: 'thread-boss-hint',
      speaker: 'narrator',
      text: '某长江没有再多说。他收拾好东西，走出了答辩厅。你站在空荡荡的房间里，感觉自己站在一个没有正确答案的十字路口。',
      options: [],
    },
    {
      id: 's05-boss-04',
      threadId: 'thread-boss-hint',
      speaker: 'changjiang-admin',
      text: '某长江看着你，语气缓和了一些："你是个有想法的学生，这一点我承认。但有想法和能活下来是两回事。你想做自己的研究，我不拦你——但你得先活到毕业。你现在的处境，比你以为的要危险得多。"',
      emotion: 'complex',
      options: [
        {
          id: 's05-boss-04-opt-a',
          text: '谢谢院长的忠告。我会小心的。',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's05-boss-04-end',
          characterReaction:
            '某长江点点头，第一次露出了不带算计的表情。"去吧。注意保护自己。"',
        },
        {
          id: 's05-boss-04-opt-b',
          text: '院长，那如果——如果某杰青老师那边实在做不下去了，您愿意全面接手指导我吗？',
          energyCost: 8,
          consistencyImpact: -5,
          nextNodeId: 's05-boss-04-end',
          characterReaction:
            '某长江看了你好一会，说了句："再说吧。"你不确定这是拒绝还是保留了可能性。',
          stanceRecord: { topic: '后路', stance: '暗示可能转投大老板' },
        },
      ],
    },
    {
      id: 's05-boss-04-end',
      threadId: 'thread-boss-hint',
      speaker: 'narrator',
      text: '某长江离开了。你低头看着他在你开题报告上的批注，每一笔都像一道枷锁。在这场师生对话中，你得到的不是学术指导，而是一堂权力课。',
      options: [],
    },

    // ========== 小老板施压线 thread-advisor-pressure ==========
    {
      id: 's05-advisor-01',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '答辩结束后半小时，某杰青发来微信："来我办公室，现在。"你推门进去时，他正在阳台抽烟——他一般不抽烟。看到你，他掐灭烟头，直接问："他跟你说了什么？"',
      emotion: 'tense',
      options: [
        {
          id: 's05-advisor-01-opt-a',
          text: '院长说让我把方向往学科规划上靠。改几个关键词。',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's05-advisor-02',
          characterReaction:
            '某杰青冷笑了一声。"改关键词？他是想把我的方向从你课题里清除干净。"',
        },
        {
          id: 's05-advisor-01-opt-b',
          text: '院长说让我小心选择立场。他暗示了一些关于您在学院里处境的事情。',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's05-advisor-02b',
          characterReaction:
            '某杰青的脸色铁青。"他跟你说我处境不好？"他握紧了拳头。',
        },
        {
          id: 's05-advisor-01-opt-c',
          text: '没说什么特别的，就是一些修改意见。老师您别太在意。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's05-advisor-02c',
          characterReaction:
            `某杰青盯着你："你在瞒我。他一个人叫你留下来，绝对不会只说'修改意见'。"`,
        },
      ],
    },
    {
      id: 's05-advisor-02',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '某杰青在办公室里来回踱步："你听好——你的课题方向是对的。国际上最顶尖的实验室都在做这个方向。他让你改方向，是因为这个方向的成果会让我在杰青考核中得分，他不想看到。你明白吗？"',
      emotion: 'intense',
      options: [
        {
          id: 's05-advisor-02-opt-a',
          text: '老师，我明白。但院长控制着经费和毕业审批……如果他卡我——',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's05-advisor-03',
          characterReaction:
            '某杰青停下来，沉默了几秒。"你说得对。他有这个能力卡你。"他的语气多了一丝无力。',
        },
        {
          id: 's05-advisor-02-opt-b',
          text: '老师，我想做好课题，但我不想卷入你们之间的……事情。',
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's05-advisor-03b',
          characterReaction:
            '某杰青停下来，直视你。"你以为你有得选？你已经在里面了。你的开题报告就是战场。"',
          stanceRecord: { topic: '立场', stance: '试图中立' },
        },
        {
          id: 's05-advisor-02-opt-c',
          text: '老师，我听您的。您说怎么改我就怎么改。',
          energyCost: 3,
          consistencyImpact: -5,
          triggersMine: 'mine-side-changjiang',
          nextNodeId: 's05-advisor-03c',
          characterReaction:
            '某杰青满意地点头——但你心里清楚，你刚才答应了大老板改方向，现在又答应小老板不改。你的一致性在崩塌。',
          stanceRecord: { topic: '立场', stance: '承诺听小老板' },
        },
      ],
    },
    {
      id: 's05-advisor-02b',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '某杰青的声音开始发抖："他说我处境不好？他有什么资格？他自己做出来什么了？一篇顶刊都没有，就靠着行政头衔骑在所有人头上！"他突然意识到自己失态了，深吸一口气。"对不起，不该在你面前说这些。"',
      emotion: 'angry',
      options: [
        {
          id: 's05-advisor-02b-opt-a',
          text: '老师，我能理解您的感受。但我们还是聊聊开题的修改方向吧。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's05-advisor-03',
          characterReaction:
            '某杰青平复了一下情绪，点点头。"你说得对。我们说正事。"',
        },
        {
          id: 's05-advisor-02b-opt-b',
          text: '老师，您不需要跟我道歉。我知道您的难处。',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's05-advisor-03',
          characterReaction:
            '某杰青看了你一眼，眼神复杂。"你是个好学生。我不希望你因为我被连累。"',
        },
      ],
    },
    {
      id: 's05-advisor-02c',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '某杰青走到你面前，语气变得很严厉："你跟我说实话。他是不是让你改方向了？"他的眼神没有退路——他在确认你的忠诚度。',
      emotion: 'interrogating',
      options: [
        {
          id: 's05-advisor-02c-opt-a',
          text: '……是。他给了我几个关键词，让我往学科规划上靠。',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's05-advisor-03',
          characterReaction:
            '某杰青闭上眼睛，深吸一口气。"我就知道。"他的声音里满是疲惫和愤怒。',
        },
        {
          id: 's05-advisor-02c-opt-b',
          text: '老师，他确实提了一些建议。但我还没有决定要不要采纳。',
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's05-advisor-03',
          characterReaction:
            '某杰青的表情缓和了一点。"好。在你做决定之前，听我说完。"',
          stanceRecord: { topic: '立场', stance: '保留决定权' },
        },
      ],
    },
    {
      id: 's05-advisor-03',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '某杰青坐下来，语气终于平静了一些："我跟你说实话。我在这个学院待不了太久了。他一直在挤压我的空间——经费、学生名额、实验室面积。如果你改了方向，等于最后一颗钉子钉在我的棺材上。但我不会逼你。你自己选。"',
      emotion: 'vulnerable',
      options: [
        {
          id: 's05-advisor-03-opt-a',
          text: '老师，我不会因为压力就放弃一个好的研究方向。但我需要找到一个让双方都能接受的表述——',
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's05-advisor-04',
          characterReaction:
            '某杰青看着你，沉默了一会。"你比我想象的成熟。好，我们一起想办法。"',
          stanceRecord: { topic: '策略', stance: '寻找平衡' },
        },
        {
          id: 's05-advisor-03-opt-b',
          text: '老师，如果您在这里待不下去……那我的博士怎么办？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's05-advisor-04b',
          characterReaction:
            '某杰青苦笑："你终于问到了关键问题。如果我走了，你的小老板就没了。你要么跟着大老板干他的方向，要么自生自灭。"',
        },
        {
          id: 's05-advisor-03-opt-c',
          text: '老师，我站在您这边。但您也得给我一条退路——万一真的做不下去……',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's05-advisor-04',
          characterReaction:
            '某杰青的表情变得复杂。"你要退路？"他叹了口气。"好吧，我理解。年轻人嘛。"但你感觉到他的失望。',
          stanceRecord: { topic: '立场', stance: '有条件支持小老板' },
        },
      ],
    },
    {
      id: 's05-advisor-03b',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '某杰青冷冷地说："你觉得你可以中立？在这个学院里，中立就是两边都得罪。你不站我，他会以为你站他。你不站他，他会直接卡你。你以为中立是安全的，其实是最危险的。"',
      emotion: 'harsh',
      options: [
        {
          id: 's05-advisor-03b-opt-a',
          text: '老师，那您告诉我该怎么办？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's05-advisor-04',
          characterReaction:
            '某杰青想了想："在论文里用学术语言包装我的方向，让大老板看不出你在做什么。这是唯一的路。"',
          stanceRecord: { topic: '策略', stance: '请教小老板' },
        },
        {
          id: 's05-advisor-03b-opt-b',
          text: '老师，我宁愿两边都得罪，也不想做违心的研究。',
          energyCost: 12,
          consistencyImpact: 10,
          nextNodeId: 's05-advisor-04',
          characterReaction:
            '某杰青愣住了。这是他在学术圈很久没听到的话。"你……你认真的？"',
          stanceRecord: { topic: '立场', stance: '坚持学术独立' },
        },
      ],
    },
    {
      id: 's05-advisor-03c',
      threadId: 'thread-advisor-pressure',
      speaker: 'narrator',
      text: '你已经分别向大老板和小老板做出了矛盾的承诺。在不远的将来，当你提交修改稿时，真相会暴露——你不可能同时满足两个方向相反的要求。那一天到来时，后果将不堪设想。',
      options: [],
    },
    {
      id: 's05-advisor-04',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: '某杰青最终站起来，拍了拍你的肩膀："不管怎样，你先把修改稿写好。方向上，我的底线是核心方法不能变。表述上你可以灵活一点。另外——"他顿了一下，"如果有一天我真的走了，你别恨我。在这个系统里，每个人都是身不由己。"',
      emotion: 'resigned',
      options: [
        {
          id: 's05-advisor-04-opt-a',
          text: '老师，不管怎样，您教给我的东西比方向重要。谢谢您。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's05-advisor-05-end',
          characterReaction:
            '某杰青看了你好久，然后转身面向窗外。"去吧。好好写。"他的声音有些沙哑。',
        },
        {
          id: 's05-advisor-04-opt-b',
          text: '老师，您不会走的。我们一起把这个方向做出来。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's05-advisor-05-end',
          characterReaction:
            '某杰青苦笑了一下。你们都知道这只是安慰。但有时候，人需要这样的安慰。',
          stanceRecord: { topic: '忠诚', stance: '表忠心' },
        },
      ],
    },
    {
      id: 's05-advisor-04b',
      threadId: 'thread-advisor-pressure',
      speaker: 'jieqing-returnee',
      text: `某杰青看着窗外："如果我走了——注意我说的是'如果'——某教授可能会接手你的指导。他虽然没帽子，但人品好，不会害你。至于大老板……他不会真的指导你，他只会让你为他干活。这就是区别。"`,
      emotion: 'advising',
      options: [
        {
          id: 's05-advisor-04b-opt-a',
          text: '老师，我先不想那么远。我们先把眼前这关过了再说。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's05-advisor-05-end',
          characterReaction:
            '某杰青点点头。"对。一步一步来。去吧。"',
        },
        {
          id: 's05-advisor-04b-opt-b',
          text: '老师，如果您真的走了，您会推荐我去其他学校吗？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's05-advisor-05-end',
          characterReaction:
            '某杰青沉默了很久。"我试试吧。但不保证。"他的背影在逆光中显得格外疲惫。',
        },
      ],
    },
    {
      id: 's05-advisor-05-end',
      threadId: 'thread-advisor-pressure',
      speaker: 'narrator',
      text: '你走出某杰青的办公室，走廊里空无一人。你的手机里有两条消息：一条是某长江的"修改稿先给我看"，一条是某杰青的"核心方法不能变"。两条消息，两个方向。而你只有一篇开题报告。这就是中国博士生的日常：在两块磨石之间，试图不被碾碎。',
      options: [],
    },
  ],

  // ==================== 社交地雷 ====================
  mines: [
    {
      id: 'mine-expose-conflict',
      name: '暴露大小老板不合',
      description: '在公开或半公开场合直接提及/暴露大老板和小老板之间的矛盾',
      triggerOptionIds: [
        's05-defense-04-crisis-opt-b',
        's05-defense-05-opt-b',
        's05-boss-02-opt-c',
      ],
      triggerKeywords: ['你们之间', '老师之间的矛盾', '到底听谁的', '两位老师意见不一致'],
      severity: 3,
      consequence:
        '你把房间里的大象指了出来。所有人都知道大小老板不合，但没人敢公开说。你说了——这意味着你打破了学术圈最重要的潜规则之一：不把矛盾摆到台面上。后果是：两位导师都会觉得你"不懂规矩"，你的开题可能被无限期搁置。',
      affectedCharacterIds: ['changjiang-admin', 'jieqing-returnee', 'prof-warm'],
      attitudeShifts: [
        { characterId: 'changjiang-admin', to: 'hostile' },
        { characterId: 'jieqing-returnee', to: 'wary' },
      ],
      forbiddenTopicAfter: '导师关系',
      triggered: false,
    },
    {
      id: 'mine-side-jieqing',
      name: '站队某杰青',
      description: '在大老板面前明确表示支持小老板的方向或做法',
      triggerOptionIds: [
        's05-defense-02-opt-b',
        's05-defense-02c-opt-b',
        's05-defense-03c-opt-b',
        's05-boss-02-opt-b',
      ],
      triggerKeywords: ['某杰青老师建议', '小老板的方向是对的', '前沿比规划重要'],
      severity: 2,
      consequence:
        '你在大老板面前公开站队小老板。大老板不会当场发作——他是行政型学者，报复方式更加隐蔽：经费审批拖延、实验室工位被调走、毕业论文答辩被"推迟安排"。你可能到毕业的最后一天才意识到代价有多大。',
      affectedCharacterIds: ['changjiang-admin'],
      attitudeShifts: [{ characterId: 'changjiang-admin', to: 'hostile' }],
      forbiddenTopicAfter: '方向选择',
      triggered: false,
    },
    {
      id: 'mine-side-changjiang',
      name: '站队某长江',
      description: '在小老板面前明确表示服从大老板的方向或否定小老板的工作',
      triggerOptionIds: ['s05-advisor-02-opt-c'],
      triggerKeywords: ['院长说得对', '学科规划更重要', '您的方向可能有问题'],
      severity: 2,
      consequence:
        '你在小老板面前倒向了大老板。作为实际指导你的人，小老板掌握着你日常科研的生命线——组会、实验指导、论文修改、推荐信。他可能不会明说，但你的论文修改意见会变得越来越少，指导频率会越来越低。最终你会发现，没有小老板的支持，你连论文都写不出来。',
      affectedCharacterIds: ['jieqing-returnee'],
      attitudeShifts: [{ characterId: 'jieqing-returnee', to: 'hostile' }],
      forbiddenTopicAfter: '导师选择',
      triggered: false,
    },
  ],

  // ==================== 信息差 ====================
  knowledgeItems: [
    {
      id: 'info-direction-conflict',
      content:
        '大老板和小老板的学术方向存在根本性矛盾。大老板坚持"稳妥路线"，小老板推崇"前沿创新"。你的课题恰好在交叉点上——不是优势，而是火药桶。',
      visibility: 'knownToOthersButNotUser',
      holders: [
        'changjiang-admin',
        'jieqing-returnee',
        'prof-warm',
        'postdoc-limbo',
      ],
      revealCondition: {
        type: 'option_selected',
        value: 's05-defense-02-opt-b',
      },
      exposureConsequence:
        '理解了矛盾的本质后，你意识到你的开题报告不是学术文档，而是政治声明。每一句话都在被两个阵营审读。',
    },
    {
      id: 'info-postdoc-spy',
      content:
        '博后是大老板安排来的眼线，负责把答辩和日常讨论的内容汇报给大老板。他每天晚上会给大老板发一条微信汇报。',
      visibility: 'knownToOthersButNotUser',
      holders: ['changjiang-admin', 'postdoc-limbo'],
      revealCondition: { type: 'urgency_threshold', value: 80 },
      exposureConsequence:
        '知道博后是眼线后，你意识到你和小老板的每一次私下讨论都可能被传到大老板耳朵里。信息不对称的局面更加恶化。',
    },
    {
      id: 'info-prof-mediate',
      content:
        '某教授被请来答辩委员会，不是因为他的学术判断，而是因为他擅长和稀泥。如果大小老板在现场吵起来，他的职责是把场面控制住。他私下已经和大老板达成了默契。',
      visibility: 'knownToOthersButNotUser',
      holders: ['changjiang-admin', 'prof-warm'],
      revealCondition: {
        type: 'option_selected',
        value: 's05-defense-04-crisis-opt-a',
      },
      exposureConsequence:
        '某教授不是中立的裁判，他是大老板的安全网。你以为他是你的盟友，但他其实是维稳工具。',
    },
    {
      id: 'info-jieqing-leaving',
      content:
        '某杰青已经在联系其他学校的职位，准备离开这个学院。如果他走了，你将失去实际指导人，被迫完全服从大老板的方向。',
      visibility: 'aboutToExpose',
      holders: ['jieqing-returnee', 'postdoc-limbo'],
      revealCondition: {
        type: 'option_selected',
        value: 's05-advisor-03-opt-b',
      },
      exposureConsequence:
        '小老板可能随时离开。你的博士生涯建立在一个即将崩塌的支撑上。你需要立刻思考后路。',
    },
  ],

  // ==================== 结局 ====================
  endings: [
    {
      id: 'ending-pass-sacrifice',
      name: '通过但成政治牺牲品',
      description:
        '你的开题"有条件通过"了。但修改的条件是：向大老板的方向倾斜。你的课题从"前沿创新"变成了"稳妥跟随"，小老板对你的态度从热情变成了冷淡。你通过了开题，但失去了学术理想——你的博士论文将成为大老板学科布局里的一颗螺丝钉。三年后你会毕业，但你会忘记自己当初为什么要读博。',
      conditions: {
        minConsistency: 50,
        requiredAttitudes: [
          { characterId: 'changjiang-admin', attitude: 'friendly' },
        ],
        forbiddenMines: ['mine-expose-conflict'],
      },
      priority: 3,
    },
    {
      id: 'ending-prof-suggest-change',
      name: '某教授建议换小老板',
      description:
        '答辩后某教授私下找到你，认真地说："你这个情况，我建议你考虑换一个小老板。不是因为某杰青不好——而是他和院长的关系已经到了不可调和的地步。你继续待在中间，只会被撕裂。我可以做你的副导师，至少帮你平稳毕业。"这是一个善意的建议，但接受它意味着背叛你的小老板。',
      conditions: {
        requiredAttitudes: [
          { characterId: 'prof-warm', attitude: 'friendly' },
        ],
        forbiddenMines: ['mine-expose-conflict'],
      },
      priority: 2,
    },
    {
      id: 'ending-boss-restrict',
      name: '某长江限制某杰青资源',
      description:
        '你的答辩成了导火索。某长江以"优化学科资源配置"为由，削减了某杰青的实验室面积和经费。某杰青的学生（包括你）被迫挤在更小的空间里，用更少的经费做实验。某杰青开始认真考虑跳槽。你的博士生涯，变成了一场在资源匮乏中的生存游戏。讽刺的是，这一切都源于一场"正常的学术答辩"。',
      conditions: {
        requiredMines: ['mine-side-jieqing'],
        requiredAttitudes: [
          { characterId: 'changjiang-admin', attitude: 'hostile' },
        ],
      },
      priority: 4,
    },
    {
      id: 'ending-no-opinion',
      name: '被认为没主见重开',
      description:
        '答辩委员会给出的意见是："该生学术能力尚可，但对研究方向缺乏独立思考，建议重新论证后再行答辩。"翻译过来就是：你试图讨好每一个人，结果所有人都觉得你没有自己的想法。某教授叹着气摇头，某长江不置可否，某杰青失望地看着你。你需要重新开题——但下一次，你必须做出一个选择。',
      conditions: {
        maxConsistency: 40,
      },
      priority: 5,
    },
  ],

  // ==================== 身后评价 ====================
  behindEvaluationTemplates: [
    {
      characterId: 'changjiang-admin',
      characterName: '某长江（行政型）',
      channel: '某长江晚上给某教授的微信',
      content:
        '今天那个学生的开题，你也看到了。方向全是某杰青的路子，一点都没有往学科方向上靠。我跟他谈了，不知道听进去没有。你帮我盯着点——如果修改稿还是这个调调，直接让他重来。另外，博后今天的记录发给我看看。',
      tone: 'negative',
      revealedInfo:
        '你的修改稿将被大老板先审核。他已经安排了多道关卡来确保你的方向"回到正轨"。你以为答辩结束了，实际上审判才刚刚开始。',
    },
    {
      characterId: 'jieqing-returnee',
      characterName: '某杰青（海归严厉型）',
      channel: '某杰青在学术同行微信群的吐槽',
      content:
        '今天我学生开题，差点被院长当场否了。经费卡、方向卡、人事卡——花式打压。我真的快撑不住了。有没有兄弟单位收人的？40+，杰青，带过Nature子刊，能搬砖……半开玩笑半认真求个坑。',
      tone: 'sarcastic',
      revealedInfo:
        '小老板已经在认真考虑离开。你的答辩成了压垮他的最后一根稻草之一。如果他走了，你的博士生涯将发生根本性改变。',
    },
    {
      characterId: 'prof-warm',
      characterName: '某教授（无帽子温暖型）',
      channel: '某教授和老伴的晚餐对话',
      content:
        '今天一个学生的开题答辩，搞成了两个导师的角斗场。可怜那孩子，夹在中间不知道该说什么。我来就是和稀泥的，但有些泥真的和不了。我在想要不要私下找那学生谈谈——建议他换个小老板。虽然说出来得罪人，但总比看着他被拧巴四年好。',
      tone: 'negative',
      revealedInfo:
        '某教授对你的处境有清醒的认知。他是唯一一个真正在为你的利益考虑的人——但他的建议（换小老板）需要巨大的勇气才能执行。',
    },
    {
      characterId: 'postdoc-limbo',
      characterName: '某博后（过渡迷茫型）',
      channel: '博后当晚给某长江的微信汇报',
      content:
        '院长好，今天开题答辩记录已整理完毕。几个关键点：1）该生汇报以某杰青方向为主，学科框架提及较少；2）某杰青在答辩中多次暗示方向正确性，有引导嫌疑；3）该生对您的提问回应尚可，但在方向选择上态度摇摆。详见附件。另外，答辩结束后某杰青单独约该生谈了半小时，具体内容未知。以上供参考。',
      tone: 'neutral',
      revealedInfo:
        '你的每一个举动、每一句话都被记录并汇报给大老板。博后不是你的朋友——他是一个在生存压力下不得不扮演眼线角色的可怜人。但他的汇报，将直接影响大老板对你的态度。',
    },
  ],
}
