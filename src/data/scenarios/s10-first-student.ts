import type { ScenarioData } from '../../types/scenario'

export const s10FirstStudent: ScenarioData = {
  id: 's10',
  phase: 'faculty',
  title: `第一次招学生`,
  subtitle: `院士的亲戚`,
  description:
    `保研季，你终于有了招生资格。一个本科生来面谈——看起来普通，但背后站着一位院士。更复杂的是，另一位杰青也盯上了这个学生。你以为你在挑学生，其实是别人在挑你。`,
  briefing:
    `你是某985高校的青年教师，今年第一次获得独立招收研究生的资格。保研季刚开始，一个叫小张的本科生就来找你面谈了。他成绩中上，科研经历平平——本来不是你的首选。但你很快发现情况不简单：推荐他来的是某院士，一个温和的电话暗示你"照顾一下"。而你打听到，学院里的某杰青也在争这个学生。更诡异的是，某秘书私下提醒你"这个学生的情况比较特殊"。你面前有一个看似简单的招生决定，但每一个选项背后都连着一张看不见的权力网络。`,
  difficulty: 5,
  estimatedMinutes: 12,
  playerRole: `某青年教师，第一年有招生资格`,
  setting: `你的办公室`,
  timeOfDay: `保研季，周一上午`,
  atmosphere:
    `你的办公室不大，书架上堆满了文献和没拆封的试剂盒。窗户半开着，走廊里传来学生们的说笑声——保研季的空气里弥漫着焦虑和希望。你刚泡了一杯茶，茶还没凉，小张就敲门了。他穿着一件略大的衬衫，拿着一份打印好的简历，眼神里混杂着紧张和某种说不清的底气。你注意到他简历上"推荐人"一栏写着院士的名字——字号比其他内容大了两号。`,

  // ==================== 角色 ====================
  characters: [
    {
      id: 'academician-gentle',
      name: `某院士（温和型）`,
      title: `中国科学院院士/教授`,
      age: 68,
      description:
        `学术泰斗，圈内辈分最高的人物之一。他不直接命令任何人——他只需要"提一句"，整个学院都会行动起来。他推荐小张来找你，表面是关心后辈，实际上在编织一张关系网。`,
      avatar: 'academician-male-gentle',
      personality: {
        faceWeight: 0.95,
        powerIndex: 98,
        grudgeMemory: 8,
        allianceFlexibility: 0.5,
        emotionalVolatility: 0.1,
      },
      socialParams: {
        approachability: 70,
        attentionSpan: 60,
        preferredTopics: ['学科发展', '人才培养', '学术传承'],
        forbiddenTopics: ['亲属关系', '走后门', '招生公平性'],
        networkValue: 99,
        gossipFactor: 0.2,
        greetingStyle: 'warm',
        exitSignals: ['年轻人多培养培养', '有什么需要跟我说'],
        memoryDuration: 60,
      },
      hiddenAgenda:
        `小张是他的远房亲戚（外甥的孩子）。他不会明说这层关系，但他需要小张有一个"好去处"。他和某杰青之间有一个私下协议——小张名义上在你这里，实际上做某杰青的课题、用某杰青的数据。院士需要一个"干净"的壳来安排这个学生。`,
      initialAttitude: 'friendly',
      role: 'wildcard',
      initialPosition: `电话/微信（不在现场）`,
      relationship: `推荐人/学术权威`,
    },
    {
      id: 'undergrad-anxious',
      name: `某本科生（保研焦虑型）`,
      title: `大四本科生`,
      age: 22,
      description:
        `院士的远房亲戚。成绩中上，科研经历平平，但简历上有院士的推荐信。他知道自己的背景，也知道自己被安排了，但他内心其实更想去某杰青的组——因为某杰青的方向更前沿，将来就业更好。`,
      avatar: 'undergrad-male-anxious',
      personality: {
        faceWeight: 0.4,
        powerIndex: 5,
        grudgeMemory: 3,
        allianceFlexibility: 0.8,
        emotionalVolatility: 0.7,
      },
      socialParams: {
        approachability: 75,
        attentionSpan: 90,
        preferredTopics: ['研究方向', '毕业前景', '实验室氛围'],
        forbiddenTopics: ['院士关系', '为什么选这里', '家庭背景'],
        networkValue: 10,
        gossipFactor: 0.5,
        greetingStyle: 'formal',
        exitSignals: ['我再考虑考虑', '我回去跟家里商量'],
        memoryDuration: 12,
      },
      hiddenAgenda:
        `他自己其实想去某杰青的组，但院士安排他来你这里。他不敢违抗院士的意思，但他会在面谈中透露一些"我对某杰青方向很感兴趣"的暗示。如果你收了他，他会成为某杰青在你组里的"眼线"——定期向某杰青汇报你的研究进展。`,
      initialAttitude: 'neutral',
      role: 'neutral',
      initialPosition: `你对面的椅子上`,
      relationship: `保研面谈学生`,
    },
    {
      id: 'jieqing-returnee',
      name: `某杰青（海归严厉型）`,
      title: `教授/国家杰出青年基金获得者`,
      age: 45,
      description:
        `学院里的学术大牛，手下有十几个学生的大组。他不缺学生，但他要的不是普通学生——他要的是一个能安插在你组里的"节点"。他和院士有私下协议，但他不会让你知道。`,
      avatar: 'jieqing-male-stern',
      personality: {
        faceWeight: 0.7,
        powerIndex: 85,
        grudgeMemory: 9,
        allianceFlexibility: 0.2,
        emotionalVolatility: 0.4,
      },
      socialParams: {
        approachability: 25,
        attentionSpan: 120,
        preferredTopics: ['学术前沿', '项目合作', '数据共享'],
        forbiddenTopics: ['抢学生', '和你的竞争', '院士协议'],
        networkValue: 88,
        gossipFactor: 0.4,
        greetingStyle: 'dismissive',
        exitSignals: ['你自己看着办', '这个学生你不要我要'],
        memoryDuration: 36,
      },
      hiddenAgenda:
        `他和院士的协议是：小张挂在你名下，但做他的课题、用他的数据、出他的文章。"不占你的指标"是幌子——实际上是把你变成一个免费的行政壳。如果你拒绝收这个学生，他就直接收走，你失去了和院士搞好关系的机会；如果你收了，你就被绑上了他的战车。`,
      initialAttitude: 'neutral',
      role: 'antagonist',
      initialPosition: `不在现场，通过微信/走廊偶遇施压`,
      relationship: `学院同事/竞争者`,
    },
    {
      id: 'secretary-process',
      name: `某秘书（流程型）`,
      title: `研究生教务秘书`,
      age: 38,
      description:
        `研究生招生的流程管理者。她知道所有内幕但不会主动说——除非你问对了问题。她是信息的守门人，也是权力网络的润滑剂。`,
      avatar: 'secretary-female-quiet',
      personality: {
        faceWeight: 0.3,
        powerIndex: 25,
        grudgeMemory: 2,
        allianceFlexibility: 0.9,
        emotionalVolatility: 0.1,
      },
      socialParams: {
        approachability: 55,
        attentionSpan: 300,
        preferredTopics: ['招生流程', '材料提交', '时间节点'],
        forbiddenTopics: ['谁走后门', '内部交易'],
        networkValue: 40,
        gossipFactor: 0.3,
        greetingStyle: 'casual',
        exitSignals: ['按流程来就行', '材料齐了就提交'],
        memoryDuration: 6,
      },
      hiddenAgenda:
        `她知道院士和某杰青的协议，也知道小张的真实身份。但她不会主动告诉你——因为说了她就卷进去了。她最多只能用暗示来提醒你，比如"这个学生的情况比较特殊，你多了解了解"。`,
      initialAttitude: 'neutral',
      role: 'neutral',
      initialPosition: `研究生教务办公室（电话/走廊）`,
      relationship: `传话人/信息守门人`,
    },
  ],

  // ==================== 对话线程 ====================
  threads: [
    {
      id: 'thread-student',
      characterId: 'undergrad-anxious',
      label: `学生面谈——测试学术能力`,
      urgency: 60,
      status: 'active',
      currentNodeId: 's10-student-01',
      lastInteractedAt: 0,
      autoMessages: [
        `小张不安地搓了搓手，看了一眼手机。`,
        `小张翻开简历想说什么，又合上了。`,
        `小张的目光扫过你书架上某杰青的论文集。`,
      ],
      deteriorateEvent:
        `小张等了太久没有得到明确答复，给院士发了条微信："老师，那边好像不太想收我。"院士的电话很快就来了。`,
    },
    {
      id: 'thread-academician',
      characterId: 'academician-gentle',
      label: `院士电话/微信——温和施压`,
      urgency: 40,
      status: 'waiting',
      currentNodeId: 's10-academician-01',
      lastInteractedAt: 0,
      autoMessages: [
        `手机亮了一下——院士发来一条微信："小张到了吗？"`,
        `院士又发了条消息："有空聊两句。"`,
        `院士分享了一篇文章给你，附言"这个方向你们可以合作"。`,
      ],
      deteriorateEvent:
        `院士直接给院长打了电话。院长转头给你发消息："某院士那个学生的事，你上点心。"压力从天而降。`,
    },
    {
      id: 'thread-rival',
      characterId: 'jieqing-returnee',
      label: `某杰青竞争线——暗示已有协议`,
      urgency: 35,
      status: 'waiting',
      currentNodeId: 's10-rival-01',
      lastInteractedAt: 0,
      autoMessages: [
        `走廊里某杰青的学生跟你打了个招呼，目光意味深长。`,
        `某杰青的办公室门开着，里面传来他和学生讨论的声音。`,
        `你的邮箱收到了某杰青转发的一篇论文，主题是你们交叉的方向。`,
      ],
      deteriorateEvent:
        `某杰青直接找到小张，在你不知情的情况下和他签了"联合培养协议"。你名义上是导师，实际上已经被架空了。`,
    },
  ],

  // ==================== 对话节点 ====================
  dialogNodes: [
    // ========== 学生面谈线 thread-student ==========
    {
      id: 's10-student-01',
      threadId: 'thread-student',
      speaker: 'narrator',
      text: `小张坐在你对面，双手放在膝盖上。他的简历平铺在桌上——成绩3.5/4.0，科研经历一段（院士课题组的本科生项目），获奖若干。最显眼的是推荐信那一栏：院士的名字。他看着你，等你开口。`,
      emotion: 'nervous',
      options: [
        {
          id: 's10-student-01-opt-a',
          text: `小张，先介绍一下你的科研经历吧。你在院士那边做了什么项目？`,
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's10-student-02',
          characterReaction:
            `小张松了口气——这是一个安全的问题。他开始讲述他在院士课题组的本科项目经历，但你注意到他的描述很表面，像是背稿。`,
          stanceRecord: { topic: '面谈策略', stance: '从学术切入' },
        },
        {
          id: 's10-student-01-opt-b',
          text: `小张，你为什么想来我这里？你也可以选别的老师——比如某杰青老师的组，他的方向不是更热门吗？`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's10-student-02b',
          characterReaction:
            `小张的表情一僵。你提到了某杰青——这让他措手不及。他犹豫了一下才回答。`,
          stanceRecord: { topic: '面谈策略', stance: '直接试探' },
        },
        {
          id: 's10-student-01-opt-c',
          text: `小张，我看到院士给你写了推荐信。你跟院士是什么关系？`,
          energyCost: 8,
          consistencyImpact: 0,
          triggersMine: 'mine-ask-relation',
          nextNodeId: 's10-student-02c',
          characterReaction:
            `小张的脸瞬间涨红了。你直接问出了那个所有人都在回避的问题。空气突然变得尴尬。`,
          riskTag: `雷区：直接揭穿潜规则`,
          stanceRecord: { topic: '面谈策略', stance: '追问关系' },
        },
      ],
    },
    {
      id: 's10-student-02',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张讲完了他的项目经历。说实话，内容很一般——就是帮师兄跑了几个实验、整理了一些数据。但他讲到最后突然加了一句："其实我对某杰青老师那边的XX方向也很感兴趣。如果读研的话，我希望能接触一些更前沿的课题。"他说这话时偷偷观察你的反应。`,
      emotion: 'testing',
      options: [
        {
          id: 's10-student-02-opt-a',
          text: `你对XX方向感兴趣？那你了解多少？说说看。`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's10-student-03',
          characterReaction:
            `小张被你的追问弄得有些紧张。他支支吾吾地说了几句，明显准备不足。"我......看过一些综述，但还没有深入了解。"他在试探你的底线，被你反将了一军。`,
        },
        {
          id: 's10-student-02-opt-b',
          text: `我的方向和某杰青老师的有交叉，你来我这里也可以接触到前沿课题。而且我这边学生少，指导更充分。`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's10-student-03b',
          characterReaction:
            `小张点点头，但你看得出他不太信——他已经被某杰青的光环吸引了。"您这边有多少学生？"他问。他在评估你的组是不是太小了。`,
        },
        {
          id: 's10-student-02-opt-c',
          text: `如果你更想去某杰青老师那边，我不勉强。你可以去找他聊聊。`,
          energyCost: 5,
          consistencyImpact: 3,
          triggersMine: 'mine-hesitate',
          nextNodeId: 's10-student-03c',
          characterReaction:
            `小张愣了一下——他没想到你会这么直接放人。"不不不，老师，我不是那个意思——"他慌了。但你已经种下了一颗种子：你可能不太想收他。这个信号会传到院士耳朵里。`,
          riskTag: `风险：让院士觉得你不给面子`,
        },
      ],
    },
    {
      id: 's10-student-02b',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张犹豫了几秒："我......院士推荐我来您这边。他说您的方向很有前景，而且您刚开始带学生，我可以得到更多指导。"他的回答滴水不漏——这明显是被培训过的。但他说到"某杰青方向更热门"时眼睛亮了一下，又迅速收回去了。`,
      emotion: 'rehearsed',
      options: [
        {
          id: 's10-student-02b-opt-a',
          text: `院士推荐，当然是好事。那我们聊聊学术吧——你觉得我们方向最核心的问题是什么？`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's10-student-03',
          characterReaction:
            `小张被拉回了学术话题。他的回答暴露了他对你方向的了解极其有限——他甚至没有读过你的论文。`,
        },
        {
          id: 's10-student-02b-opt-b',
          text: `你说院士推荐你来——那你自己怎么想？如果没有院士的推荐，你会选我吗？`,
          energyCost: 8,
          consistencyImpact: 8,
          nextNodeId: 's10-student-03d',
          characterReaction:
            `小张的表情凝固了。你问的不是学术问题，你在问他的真实意愿——这让他进退两难。`,
          stanceRecord: { topic: '面谈深度', stance: '追问真实意愿' },
        },
      ],
    },
    {
      id: 's10-student-02c',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张脸红到了耳根。"院士是......是我的......就是......认识的一个长辈。"他说得支支吾吾。空气里弥漫着尴尬。你把那个大家都心知肚明但没人会问的问题摆到了台面上。`,
      emotion: 'embarrassed',
      options: [
        {
          id: 's10-student-02c-opt-a',
          text: `没关系，有推荐人是正常的。我们聊聊学术吧——你对我的研究方向了解多少？`,
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's10-student-03',
          characterReaction:
            `小张松了口气——你没有继续追问。但这个问题已经像一根刺扎在谈话里，后面的交流都带着一层不自在。`,
        },
        {
          id: 's10-student-02c-opt-b',
          text: `我问这个不是为了为难你。我只是想了解清楚情况，这样我才能做出公平的判断。`,
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's10-student-03',
          characterReaction:
            `小张低下头。"我理解，老师。"他的声音很小。你在他心里种下了一个认知：这个老师不好糊弄。这既是好事也是坏事——他可能会更尊重你，也可能会更想逃去某杰青那边。`,
          stanceRecord: { topic: '招生原则', stance: '追求透明' },
        },
      ],
    },
    {
      id: 's10-student-03',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `你们聊了半小时学术。坦白说，小张的基础不差，但没有亮点。他对你的方向了解有限，回答问题中规中矩。但你注意到一个细节：他对某杰青方向的XX技术非常了解——明显比对你的方向准备得更充分。面谈快结束时，他问了一个关键问题："老师，您这边有没有和其他课题组合作的项目？"`,
      emotion: 'probing',
      options: [
        {
          id: 's10-student-03-opt-a',
          text: `有的。我们和几个组都有合作。你为什么特别关心这个？`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张犹豫了一下："我就是......想多学一些东西。如果能接触不同的方向，对将来找工作也有帮助。"他没有说出口的话是：他想借你的壳去做某杰青的课题。`,
        },
        {
          id: 's10-student-03-opt-b',
          text: `你是想问我们和某杰青老师有没有合作吧？`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-student-04b',
          characterReaction:
            `小张的眼睛瞪大了。你一针见血——他的小心思被看穿了。"不是不是，我就是随便问问......"他的否认比承认更说明问题。`,
          stanceRecord: { topic: '洞察', stance: '看穿学生意图' },
        },
        {
          id: 's10-student-03-opt-c',
          text: `合作有，但我带的学生主要还是做我自己的课题。你来我这里，就是做我的方向。`,
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张的表情微微一沉。这不是他想听到的答案。他点了点头，但你看得出他在重新评估来你这里的价值。`,
          stanceRecord: { topic: '培养原则', stance: '明确边界' },
        },
      ],
    },
    {
      id: 's10-student-03b',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张问完学生人数后，又问："老师，您的经费充足吗？有没有出国交流的机会？"他的问题越来越像是在面试你而不是你在面试他。你开始意识到——这个学生不简单，或者说，教他问这些问题的人不简单。`,
      emotion: 'calculating',
      options: [
        {
          id: 's10-student-03b-opt-a',
          text: `经费够用，出国机会看项目需要。小张，你的问题问得很仔细——是谁建议你问这些的？`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张的表情僵了一秒。"没有谁建议......是我自己想了解的。"他撒谎了。你和他都知道。`,
          stanceRecord: { topic: '察觉', stance: '追问信息来源' },
        },
        {
          id: 's10-student-03b-opt-b',
          text: `（耐心回答所有问题，展示自己组的优势）我这边虽然人少，但胜在灵活。你感兴趣的话，可以来实验室看看。`,
          energyCost: 5,
          consistencyImpact: 0,
          triggersMine: 'mine-flatter',
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张微笑着点头。但你不确定这是真心的兴趣还是敷衍的礼貌。你在反向讨好一个本科生——这让你有些不舒服。`,
          riskTag: `风险：太过主动显得谄媚`,
        },
      ],
    },
    {
      id: 's10-student-03c',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张慌了。"老师，我真的很想来您这里！是我表达得不好——我就是对那个方向有点好奇，但我更想做您的方向。"他的表情诚恳，但你不确定这是真心还是表演——毕竟他背后站着一个院士，他不敢让你拒绝他。`,
      emotion: 'panicked',
      options: [
        {
          id: 's10-student-03c-opt-a',
          text: `好，那你回去再想想。如果你确定要来，把材料提交到教务办。我们保持联系。`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张点头如捣蒜。"好的老师，谢谢老师！"他几乎是逃出了你的办公室。你不知道他走出去后第一个电话会打给谁——院士还是某杰青。`,
        },
        {
          id: 's10-student-03c-opt-b',
          text: `小张，你不用紧张。我没有拒绝你。我只是希望你想清楚——读研三年，选对导师比选对方向更重要。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张安静了一下，似乎第一次认真地看着你。"老师，您是我面谈过的导师里，第一个让我自己想清楚的。"他的语气里有一丝真诚——但你不确定这份真诚能持续多久。`,
          stanceRecord: { topic: '培养态度', stance: '引导自主选择' },
        },
      ],
    },
    {
      id: 's10-student-03d',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张沉默了好一会。然后他低声说："老师，说实话......如果没有院士的推荐......我可能会先去了解某杰青老师的组。他的方向更成熟，学生毕业后去向也更好。但院士让我来找您，我不敢——"他没有说完，但你已经听懂了。`,
      emotion: 'honest',
      options: [
        {
          id: 's10-student-03d-opt-a',
          text: `谢谢你的诚实。你的想法我理解。但你有没有想过——你去某杰青那边，院士知道了会怎么想？`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张的脸色变了。他没想过这一层——或者想过但不敢面对。"我......我不知道。"他真的不知道。在这场博弈中，他是棋盘上最无力的棋子。`,
        },
        {
          id: 's10-student-03d-opt-b',
          text: `你的诚实我很欣赏。这样吧——你先去了解某杰青老师的组，然后做一个你自己的决定。不管结果如何，我这边的门是开着的。`,
          energyCost: 10,
          consistencyImpact: 8,
          triggersMine: 'mine-hesitate',
          nextNodeId: 's10-student-04',
          characterReaction:
            `小张抬头看你，眼神里有一种复杂的感激。"谢谢老师。"他走了。你不知道这个决定是明智还是愚蠢——放一个院士推荐的学生去找你的竞争对手。`,
          riskTag: `风险：放走院士推荐的学生`,
          stanceRecord: { topic: '招生态度', stance: '尊重学生意愿' },
        },
      ],
    },
    {
      id: 's10-student-04',
      threadId: 'thread-student',
      speaker: 'narrator',
      text: `面谈结束了。小张走后，你靠在椅背上，看着他留下的简历。成绩中上，科研一般，但背后站着一个院士。你现在面临一个选择：收还是不收？收了——你得到一个平庸的学生和一个强大的人脉；不收——你可能得罪一个你得罪不起的人。而你还不知道的是，这个选择远比你想象的复杂。`,
      options: [],
    },
    {
      id: 's10-student-04b',
      threadId: 'thread-student',
      speaker: 'undergrad-anxious',
      text: `小张被你看穿后，安静了好一会。然后他突然说了一句让你意外的话："老师，其实......某杰青老师已经找过我了。他说可以让我做他的课题，但挂在您的名下——'不占您的指标'。他让我来跟您面谈的时候别提这个事。"他说完看着你，眼神里混杂着不安和解脱——他打破了某个人的信任，但他更怕你。`,
      emotion: 'confessing',
      options: [
        {
          id: 's10-student-04b-opt-a',
          text: `（沉默片刻）谢谢你告诉我这些。这件事我知道了——你先回去，我需要想想。`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's10-student-05-end',
          characterReaction:
            `小张点头离开了。你坐在办公室里，消化着他刚才透露的信息。某杰青的盘算，比你想象的更精密——也更阴险。`,
          stanceRecord: { topic: '信息获取', stance: '冷静接受情报' },
        },
        {
          id: 's10-student-04b-opt-b',
          text: `"不占我的指标"？那占谁的指标？你做他的课题，论文署谁的名？毕业论文写谁的方向？`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's10-student-05-end',
          characterReaction:
            `小张被你的连珠炮问懵了。"我......我不知道，他没说那么详细......"你帮他看清了这个"不占指标"的美丽谎言的真面目——名义上你带，实际上某杰青用。`,
          stanceRecord: { topic: '交易本质', stance: '追问到底' },
        },
      ],
    },
    {
      id: 's10-student-05-end',
      threadId: 'thread-student',
      speaker: 'narrator',
      text: `小张的面谈结束了，但你的问题才刚开始。一个本科生、一个院士、一个杰青——三个人的利益交织在一起，而你站在这个十字路口。你的第一个学生，可能是你学术生涯最重要的一步棋——也可能是别人下在你棋盘上的一颗子。`,
      options: [],
    },

    // ========== 院士电话/微信线 thread-academician ==========
    {
      id: 's10-academician-01',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `你的手机响了——来电显示是院士的名字。你犹豫了两秒，接起来。"小某啊，"院士的声音温和得像邻家长辈，"小张去找你了吧？这个孩子不错的，脑子活，就是缺人带。你那边正好需要学生，一举两得嘛。"`,
      emotion: 'warm-pressure',
      options: [
        {
          id: 's10-academician-01-opt-a',
          text: `院士好！小张来面谈过了，整体印象不错。不过我还在综合考虑——保研季有好几个学生联系我。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-academician-02',
          characterReaction:
            `院士"嗯"了一声。"有好几个学生联系你？那很好嘛。但小张这个孩子，我觉得你不会后悔的。"他没有直接说"你必须收"，但意思已经够清楚了。`,
          stanceRecord: { topic: '对院士', stance: '委婉保留' },
        },
        {
          id: 's10-academician-01-opt-b',
          text: `院士好！小张各方面都不错，我很愿意带他。`,
          energyCost: 3,
          consistencyImpact: -5,
          triggersMine: 'mine-flatter',
          nextNodeId: 's10-academician-02b',
          characterReaction:
            `院士笑了："那就好。你放心，小张不会让你失望的。有什么需要尽管找我。"他满意了——但你刚才的"很愿意"说得太快了，快到连你自己都觉得有些谄媚。`,
          stanceRecord: { topic: '对院士', stance: '立刻答应' },
        },
        {
          id: 's10-academician-01-opt-c',
          text: `院士好！我跟小张聊了一些，但说实话——他对我的方向了解不多。我想再观察一下他的学术基础。`,
          energyCost: 5,
          consistencyImpact: 3,
          triggersMine: 'mine-hesitate',
          nextNodeId: 's10-academician-02c',
          characterReaction:
            `电话那头沉默了两秒——对院士来说，两秒的沉默已经是非常明显的不悦。"你觉得......他基础不够？"院士的语气还是温和的，但温和中多了一丝冷意。`,
          riskTag: `风险：让院士觉得不给面子`,
          stanceRecord: { topic: '对院士', stance: '提出学术保留' },
        },
      ],
    },
    {
      id: 's10-academician-02',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `院士继续说："小某啊，我跟你说个掏心窝子的话。你刚开始带学生，最需要的不是一个天才学生——是一个靠谱的学生。小张虽然不是最优秀的，但他听话、稳当。而且——"他顿了一下，"他来你这里，某些方面的资源你会方便一些。你懂我意思吧？"`,
      emotion: 'hinting',
      options: [
        {
          id: 's10-academician-02-opt-a',
          text: `院士，我理解您的好意。关于资源的事——您方便多说一些吗？`,
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's10-academician-03',
          characterReaction:
            `院士笑了笑："有什么好说的？你收了小张，以后项目申报、学术交流有什么需要，跟我说一声就行。"他用最轻描淡写的方式给出了一个最重磅的承诺——院士的资源支持。`,
        },
        {
          id: 's10-academician-02-opt-b',
          text: `院士，"某些方面的资源"——您是说学术合作方面？还是——`,
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's10-academician-03',
          characterReaction:
            `院士的语气微妙了："学术合作、项目支持、什么都包括。你不用想太多，就当是我这个老头子帮衬后辈。"他把所有可能的交易都包装成了"帮衬后辈"——你如果拒绝，就是不领情。`,
          stanceRecord: { topic: '交易本质', stance: '试图追问' },
        },
      ],
    },
    {
      id: 's10-academician-02b',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `院士很高兴。"好好好，那我就放心了。对了——"他像想起什么似的，"某杰青那边也对小张有兴趣。我跟某杰青聊过，他说如果小张在你那边，他可以提供一些数据和技术支持——'不占你的指标'。你觉得怎么样？"他在电话里轻描淡写地抛出了那个关键信息。`,
      emotion: 'revealing',
      options: [
        {
          id: 's10-academician-02b-opt-a',
          text: `"不占指标"——院士，您的意思是，小张名义上在我这里，但做某杰青的课题？`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's10-academician-03b',
          characterReaction:
            `院士沉默了。你把他精心包装的暗示直接拆开了。"不是不是，"他笑着否认，"就是合作嘛。方向交叉，资源共享。你多想了。"但你没有多想——你想得刚刚好。`,
          stanceRecord: { topic: '交易本质', stance: '直接揭穿' },
        },
        {
          id: 's10-academician-02b-opt-b',
          text: `好的院士，某杰青老师愿意合作那太好了。具体怎么安排，我们后续再商量。`,
          energyCost: 3,
          consistencyImpact: -5,
          nextNodeId: 's10-academician-03',
          characterReaction:
            `院士满意地挂了电话。你坐在办公室里，意识到自己刚才糊里糊涂地答应了一个自己还不完全理解的安排。你是导师还是壳？`,
        },
      ],
    },
    {
      id: 's10-academician-02c',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `院士的语气变了——还是温和的，但温和中带着一种不容拒绝的分量。"小某，学术基础是可以培养的。他来你这里，你教他不就行了？我推荐的人，差不到哪里去。你是不是......有什么顾虑？"`,
      emotion: 'pressuring',
      options: [
        {
          id: 's10-academician-02c-opt-a',
          text: `院士，没有顾虑。您说得对，基础可以培养。我会认真考虑小张的。`,
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's10-academician-03',
          characterReaction:
            `院士的语气恢复了温和。"好，我等你消息。"他挂了电话。你从"再观察"退到了"认真考虑"——院士的压力已经在起作用了。`,
        },
        {
          id: 's10-academician-02c-opt-b',
          text: `院士，我没有其他顾虑。只是第一年带学生，我想尽量找最匹配方向的——`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-academician-03c',
          characterReaction:
            `院士打断了你："最匹配方向？小某，你刚起步，不要太挑。有学生愿意来就不错了。"他的话让你脸上一阵发烫——因为他说的是事实。`,
          stanceRecord: { topic: '对院士', stance: '坚持学术标准' },
        },
      ],
    },
    {
      id: 's10-academician-03',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `院士最后说："小某，你刚开始带学生，路还长。有些事情不用太纠结——你把小张带好，以后的路自然就宽了。好了，不多说了，改天一起吃个饭。"他挂了电话。温和、体贴、无法拒绝——这就是院士的说服方式。`,
      emotion: 'conclusive',
      options: [
        {
          id: 's10-academician-03-opt-a',
          text: `（放下手机，看着窗外发呆）`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's10-academician-04-end',
          characterReaction:
            `你靠在椅背上。院士的话像一张温柔的网——你可以挣扎，但挣扎的姿势只会让你缠得更紧。`,
        },
      ],
    },
    {
      id: 's10-academician-03b',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `院士笑着说："你想多了。就是正常的学术合作。你们青年人应该多交流嘛。好了，不说了——你看着办就行。有什么事给我发微信。"他挂了电话，但你的心没有放下来。"你看着办"——这句话既是信任也是压力。`,
      emotion: 'dismissive',
      options: [
        {
          id: 's10-academician-03b-opt-a',
          text: `（挂了电话，在笔记本上写下"不占指标=？"）`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's10-academician-04-end',
          characterReaction:
            `你在纸上画了一个问号。院士否认了你的质疑，但他的否认本身就是一种确认。你需要更多信息——而某秘书可能知道些什么。`,
          stanceRecord: { topic: '思考', stance: '保持警觉' },
        },
      ],
    },
    {
      id: 's10-academician-03c',
      threadId: 'thread-academician',
      speaker: 'academician-gentle',
      text: `院士沉默了几秒，然后说了一句很重的话："小某，我理解你想坚持学术标准。但你有没有想过——你现在的位置，是谁帮你争取来的？你的启动经费、你的实验室、你的招生资格——这些不是天上掉下来的。我说这些不是要你报恩——但做人要懂感恩。"他的声音还是温和的，但每个字都像铅坠。`,
      emotion: 'heavy',
      options: [
        {
          id: 's10-academician-03c-opt-a',
          text: `院士，您说得是。我不应该......好的，小张的事我会安排好的。`,
          energyCost: 5,
          consistencyImpact: -8,
          nextNodeId: 's10-academician-04-end',
          characterReaction:
            `院士的语气恢复了温暖。"好好好，我就知道你是个懂事的年轻人。有什么需要找我。"他挂了电话。你像被人按着脑袋点了一下头。`,
          stanceRecord: { topic: '对院士', stance: '被说服' },
        },
        {
          id: 's10-academician-03c-opt-b',
          text: `院士，我感激您的帮助。但招生的事，我还是希望能按照学术标准——`,
          energyCost: 12,
          consistencyImpact: 8,
          nextNodeId: 's10-academician-04-end',
          characterReaction:
            `院士没有再说话。沉默了五秒——这在电话里是漫长的五秒。"好。你自己定。"他挂了电话。语气里没有愤怒——但没有愤怒比愤怒更可怕。你知道你可能刚刚关上了一扇再也打不开的门。`,
          stanceRecord: { topic: '对院士', stance: '坚持到底' },
          attitudeShift: { characterId: 'academician-gentle', from: 'friendly', to: 'wary' },
        },
      ],
    },
    {
      id: 's10-academician-04-end',
      threadId: 'thread-academician',
      speaker: 'narrator',
      text: `院士的电话挂了。你看着手机屏幕上的通话记录——4分37秒。在这不到五分钟的时间里，你经历了温和的推荐、含蓄的施压、隐晦的交易暗示。院士没有说任何一句不得体的话——每一句都可以写进教科书。但你感受到的压力，比任何直接命令都大。这就是权力的最高形式：不需要威胁，只需要存在。`,
      options: [],
    },

    // ========== 某杰青竞争线 thread-rival ==========
    {
      id: 's10-rival-01',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `下午，你在走廊里"偶遇"了某杰青。他停下来，微笑着说："听说你今天面了一个学生——院士推荐来的？"他知道得很快——这意味着他一直在关注这件事。`,
      emotion: 'probing',
      options: [
        {
          id: 's10-rival-01-opt-a',
          text: `是啊，某老师也对这个学生感兴趣？`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's10-rival-02',
          characterReaction:
            `某杰青笑了一下："感兴趣谈不上。不过那个学生的本科项目——用了我们组的一些数据和方法。算是有缘分吧。"他在暗示他和这个学生之间有"前缘"。`,
        },
        {
          id: 's10-rival-01-opt-b',
          text: `是的。某老师消息很灵通啊。`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's10-rival-02b',
          characterReaction:
            `某杰青没有接你的话茬。"保研季嘛，大家都关注。"他四两拨千斤地化解了你的试探。`,
        },
        {
          id: 's10-rival-01-opt-c',
          text: `某老师有什么指教？`,
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's10-rival-02',
          characterReaction:
            `某杰青眯了一下眼——"指教"这个词他不确定是客气还是讽刺。"指教不敢当。就是想跟你聊聊——关于这个学生，我有个提议。"`,
        },
      ],
    },
    {
      id: 's10-rival-02',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青压低声音："这样——如果你收了这个学生，我可以提供一些数据和计算资源给他。他在你那里注册，但做一些跟我方向相关的课题。'不占你的指标'——你多一个学生，我多一个帮手，两全其美。你觉得呢？"他把那个"不占指标"的方案正式摆到了桌面上。`,
      emotion: 'proposing',
      options: [
        {
          id: 's10-rival-02-opt-a',
          text: `某老师，您说的"不占指标"——具体是什么意思？论文署名怎么算？毕业论文写谁的方向？`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's10-rival-03',
          characterReaction:
            `某杰青的笑容收了一些。"论文......当然是共同署名。毕业论文嘛——可以写你的方向，用我的数据。"他的解释越来越苍白。你在追问他不想被追问的细节。`,
          stanceRecord: { topic: '交易细节', stance: '追问到底' },
        },
        {
          id: 's10-rival-02-opt-b',
          text: `某老师，这个提议我需要想想。联合培养不是不行，但得有正式的协议——`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's10-rival-03b',
          characterReaction:
            `某杰青微微皱眉。"正式协议？这种事情圈内都是口头约定的。你搞那么正式，院士那边会觉得你不信任人。"他在用院士的名头压你。`,
        },
        {
          id: 's10-rival-02-opt-c',
          text: `谢谢某老师的好意。但我带的学生，我还是希望做我自己的方向。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-rival-03c',
          characterReaction:
            `某杰青的表情冷了下来。"你自己的方向？"他上下打量了你一眼。"你现在有什么数据？有什么平台？靠你一个人——你带得动吗？"他在质疑你的能力。`,
          stanceRecord: { topic: '独立性', stance: '坚持自主' },
        },
      ],
    },
    {
      id: 's10-rival-02b',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青直入正题："小某，我跟你说个事。那个学生——小张——他本科做的项目用了我们组的方法。严格来说，他已经对我们的方向有了一定积累。如果他来你这里，从零开始换方向，对他不太好。所以我有个提议——"他停顿了一下，看你的反应。`,
      emotion: 'calculated',
      options: [
        {
          id: 's10-rival-02b-opt-a',
          text: `什么提议？`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's10-rival-02',
          characterReaction:
            `某杰青微笑——你咬饵了。他开始详细解释他的"不占指标"方案。`,
        },
        {
          id: 's10-rival-02b-opt-b',
          text: `某老师，他本科的项目经历我看了——也就是帮着跑了几个实验。谈不上"积累"吧。`,
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's10-rival-03',
          characterReaction:
            `某杰青的笑容僵了一下。你在否定他的前提假设——而他不习惯被青椒否定。"你看的是简历上写的。实际上做了多少，你不一定知道。"`,
          stanceRecord: { topic: '学术判断', stance: '独立评估' },
        },
      ],
    },
    {
      id: 's10-rival-03',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青意识到你不是一个好糊弄的人。他换了一种策略——不再包装，开始施压："小某，我跟你直说吧。这个学生，院士已经跟我打过招呼了。不管他在谁那里注册，最终他都会做我的方向——因为数据在我手里、平台在我这里。你收不收他，区别只在于你是不是局内人。你想被排除在外吗？"`,
      emotion: 'threatening',
      options: [
        {
          id: 's10-rival-03-opt-a',
          text: `某老师，你说得很清楚了。但我需要时间考虑。这不是一个简单的决定。`,
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's10-rival-04',
          characterReaction:
            `某杰青点头："可以。但别太久——保研系统一周后关闭。"他给了你一个deadline，然后转身走了。`,
        },
        {
          id: 's10-rival-03-opt-b',
          text: `某老师，既然数据和平台都在你那里，你直接收他不就行了？为什么非要挂在我名下？`,
          energyCost: 12,
          consistencyImpact: 10,
          nextNodeId: 's10-rival-04b',
          characterReaction:
            `某杰青愣了。你问出了核心问题——他如果直接收，为什么要绕这么大一个弯？答案只有一个：他不能直接收。他的名额满了，或者院士不让他直接收。你在这一刻看穿了整个布局。`,
          stanceRecord: { topic: '交易本质', stance: '一击要害' },
        },
        {
          id: 's10-rival-03-opt-c',
          text: `好的某老师，我理解了。我会配合的。`,
          energyCost: 3,
          consistencyImpact: -8,
          nextNodeId: 's10-rival-04-end',
          characterReaction:
            `某杰青满意了。"好。细节后续再谈。"他走了。你靠在走廊墙上，意识到自己刚才说了一句可能改变整个局面的话——"我会配合的。"配合谁？配合什么？你还没想清楚，但你已经答应了。`,
          stanceRecord: { topic: '立场', stance: '妥协' },
        },
      ],
    },
    {
      id: 's10-rival-03b',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青的语气带上了一丝不耐烦："正式协议？你以为这是商业谈判？学术圈的事情，靠的是信任和默契。你跟院士签协议？你敢吗？"他用院士的名头来堵你的嘴。`,
      emotion: 'impatient',
      options: [
        {
          id: 's10-rival-03b-opt-a',
          text: `某老师，不是信任的问题。是保护双方的问题。没有书面约定，将来出了分歧怎么办？`,
          energyCost: 10,
          consistencyImpact: 5,
          nextNodeId: 's10-rival-04',
          characterReaction:
            `某杰青沉默了。他知道你说的有道理——但他不想留书面证据。"行，你想怎么来？"他的语气暗示他在评估你是不是太麻烦了。`,
          stanceRecord: { topic: '原则', stance: '坚持书面约定' },
        },
        {
          id: 's10-rival-03b-opt-b',
          text: `好吧，那就先这么说。后续我们再细聊。`,
          energyCost: 3,
          consistencyImpact: -3,
          nextNodeId: 's10-rival-04-end',
          characterReaction:
            `某杰青点头，转身走了。你又一次退了——从"正式协议"退到"先这么说"。某杰青正在一步一步把你拉进他的节奏。`,
        },
      ],
    },
    {
      id: 's10-rival-03c',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青冷笑了一声："你一个人带得动？你的国自然还没结题，实验室设备一半是借的，连高性能计算的机时都不够——你拿什么带学生？"他的每一个字都戳在你的痛处——因为他说的全是事实。`,
      emotion: 'contemptuous',
      options: [
        {
          id: 's10-rival-03c-opt-a',
          text: `某老师，条件确实有限。但我有我自己的方向和思路——差的是时间和机会，不是能力。`,
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's10-rival-04',
          characterReaction:
            `某杰青上下打量了你一眼，没有说话。他可能在重新评估你——不是评估你的能力，而是评估你的"难搞程度"。`,
          stanceRecord: { topic: '自我定位', stance: '不卑不亢' },
        },
        {
          id: 's10-rival-03c-opt-b',
          text: `（沉默。你无法反驳他说的任何一点。）`,
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's10-rival-04-end',
          characterReaction:
            `某杰青看着你的沉默，微微摇头。"你好好想想。有什么想法找我。"他走了。你站在走廊里，某杰青的话像一盆冷水——浇灭了你刚燃起的独立意识。`,
        },
      ],
    },
    {
      id: 's10-rival-04',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青最后看了你一眼，语气从施压变成了一种奇怪的真诚："小某，我不是在跟你作对。你刚起步，需要帮助——这在学术圈是正常的。我当年也是靠前辈带才走到今天。你把这个学生当成一个合作的开始，对你没有坏处。"他拍了拍你的肩膀，走了。`,
      emotion: 'pseudo-sincere',
      options: [
        {
          id: 's10-rival-04-opt-a',
          text: `（看着他离去的背影，回到办公室关上门）`,
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's10-rival-04-end',
          characterReaction:
            `你关上门，靠在门板上。某杰青的话里有三分真七分假——他确实可以帮你，但帮你的方式是把你变成他的附属。在学术圈，"帮助"和"控制"之间，只隔着一层温情脉脉的面纱。`,
        },
      ],
    },
    {
      id: 's10-rival-04b',
      threadId: 'thread-rival',
      speaker: 'jieqing-returnee',
      text: `某杰青的表情变了。你问到了他不想被问到的核心——他不能直接收小张。他沉默了三秒，然后说："我的名额今年确实满了。但这不影响合作。你不要把事情想得太复杂——"他转身走了，步伐比来时快了很多。你在走廊里目送他的背影，突然明白了一切：他需要你做壳，你的名额、你的导师身份，都是他的工具。`,
      emotion: 'exposed',
      options: [
        {
          id: 's10-rival-04b-opt-a',
          text: `（回到办公室，在纸上写下所有线索，试图理清这张关系网）`,
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's10-rival-04-end',
          characterReaction:
            `你在纸上画了一张图：院士——小张——某杰青——你。四个点、三条线。你是这个结构里最弱的一环——但你现在知道了全局。知道全局的代价是：你可能因此被排除在外。`,
          stanceRecord: { topic: '局势判断', stance: '看穿全局' },
        },
      ],
    },
    {
      id: 's10-rival-04-end',
      threadId: 'thread-rival',
      speaker: 'narrator',
      text: `走廊里恢复了平静。学生们说笑着经过，他们中的一些人明年也会面对导师选择——但他们不知道，选择的背后有多少看不见的手在操控。你回到办公室，看着桌上小张的简历。一个本科生的去向，牵动着一个院士的面子、一个杰青的布局、和你的未来。在这场博弈中，你唯一能依靠的，只有你自己的判断。`,
      options: [],
    },
  ],

  // ==================== 社交地雷 ====================
  mines: [
    {
      id: 'mine-flatter',
      name: `巴结院士`,
      description: `在和院士的互动中表现出过度的谄媚和讨好，太过急切地答应所有要求`,
      triggerOptionIds: [
        's10-academician-01-opt-b',
        's10-student-03b-opt-b',
      ],
      triggerKeywords: ['太好了', '一定照办', '您说怎么办就怎么办'],
      severity: 1,
      consequence:
        `你的谄媚太过明显了。院士嘴上高兴，心里对你的评价降了一档——"好使唤但没骨头"。在学术圈，太听话的人不会被当成合作者，只会被当成工具。某杰青如果知道你一口就答应了院士的所有要求，会更加确信你可以被随意摆布。最讽刺的是，你以为巴结能换来好处，但院士给资源从来不看你的态度——他看的是你的价值。`,
      affectedCharacterIds: ['academician-gentle', 'jieqing-returnee'],
      attitudeShifts: [
        { characterId: 'academician-gentle', to: 'friendly' },
      ],
      triggered: false,
    },
    {
      id: 'mine-hesitate',
      name: `想再看看`,
      description: `在面对院士推荐的学生时表现出犹豫或想要再考虑，被院士理解为不给面子`,
      triggerOptionIds: [
        's10-student-02-opt-c',
        's10-student-03d-opt-b',
        's10-academician-01-opt-c',
      ],
      triggerKeywords: ['再考虑考虑', '想再看看', '不急'],
      severity: 2,
      consequence:
        `在院士的世界里，"推荐"就是"安排"，"再看看"就是"不给面子"。他不会发火——院士不需要发火。他只需要在下一次学术评审、项目推荐、资源分配时"忘记"你的名字。在学术圈，被院士忘记比被院士批评更致命——因为批评至少说明他还在乎你。`,
      affectedCharacterIds: ['academician-gentle'],
      attitudeShifts: [
        { characterId: 'academician-gentle', to: 'wary' },
      ],
      forbiddenTopicAfter: `拒绝院士`,
      triggered: false,
    },
    {
      id: 'mine-ask-relation',
      name: `问学生和院士关系`,
      description: `直接询问学生与院士之间的亲属或私人关系，揭穿潜规则`,
      triggerOptionIds: [
        's10-student-01-opt-c',
      ],
      triggerKeywords: ['什么关系', '亲戚', '走后门'],
      severity: 3,
      consequence:
        `你问出了那个所有人都知道答案但没人会问的问题。这等于在学术圈的潜规则上捅了一刀——院士的"推荐"被你解读成了"走后门"。小张会把这件事告诉院士，院士会觉得你"不懂事"。更糟糕的是，某杰青如果知道你做了这种"不成熟"的事，会彻底看扁你。在这个圈子里，看穿潜规则是聪明，说穿潜规则是愚蠢。`,
      affectedCharacterIds: ['academician-gentle', 'undergrad-anxious', 'jieqing-returnee'],
      attitudeShifts: [
        { characterId: 'academician-gentle', to: 'hostile' },
        { characterId: 'undergrad-anxious', to: 'wary' },
      ],
      forbiddenTopicAfter: `院士关系`,
      triggered: false,
    },
  ],

  // ==================== 信息差 ====================
  knowledgeItems: [
    {
      id: 'info-academician-jieqing-deal',
      content:
        `某院士和某杰青之间有一个私下协议：小张名义上在你这里注册，实际上做某杰青的课题、用某杰青的数据。院士需要一个"干净"的壳来安排这个亲戚——你就是这个壳。`,
      visibility: 'knownToOthersButNotUser',
      holders: ['academician-gentle', 'jieqing-returnee'],
      revealCondition: {
        type: 'option_selected',
        value: 's10-rival-03-opt-b',
      },
      exposureConsequence:
        `你是一颗棋子。院士和某杰青的协议早在你收到推荐之前就已经达成。你的"招生资格"不是你的资源——是他们的工具。知道真相后，你面临一个选择：继续当壳，或者退出这场游戏。`,
    },
    {
      id: 'info-student-reserved',
      content:
        `小张实际上已经被某杰青"预定"了。某杰青的名额虽然满了，但他已经通过院士确保小张最终会做他的课题。你只是一个用来走流程的通道。`,
      visibility: 'knownToOthersButNotUser',
      holders: ['jieqing-returnee', 'secretary-process'],
      revealCondition: {
        type: 'option_selected',
        value: 's10-rival-02-opt-a',
      },
      exposureConsequence:
        `你名义上是导师，实际上是通道。小张在你组里注册、在某杰青组里工作。你承担指导的责任，却得不到指导的成果。这是学术圈最常见的寄生模式之一。`,
    },
    {
      id: 'info-not-occupy-quota',
      content:
        `"不占你的指标"是一个精心设计的话术。实际上，小张占的就是你的指标——你的名额、你的导师身份、你的毕业责任。但他的课题、数据、论文都归某杰青。你出了人头，某杰青出了内容。`,
      visibility: 'knownToOthersButNotUser',
      holders: ['jieqing-returnee', 'academician-gentle'],
      revealCondition: {
        type: 'option_selected',
        value: 's10-student-04b-opt-b',
      },
      exposureConsequence:
        `"不占指标"的真相是：名义上你带学生，实际上某杰青用学生。你付出了导师的时间、精力和责任，换来的是别人的成果和一个"配合"的名声。`,
    },
    {
      id: 'info-student-wants-jieqing',
      content:
        `小张自己其实想去某杰青的组——因为某杰青的方向更前沿、毕业后就业更好。他不敢违抗院士的安排，但他内心深处希望能做某杰青的课题。如果你收了他，他会成为一个心不在焉的学生——人在你这里，心在某杰青那里。`,
      visibility: 'aboutToExpose',
      holders: ['undergrad-anxious', 'jieqing-returnee'],
      revealCondition: {
        type: 'option_selected',
        value: 's10-student-02b-opt-b',
      },
      exposureConsequence:
        `学生自己想去某杰青组——这意味着即使你收了他，他也不会全心投入你的方向。你将面对一个最尴尬的局面：你的第一个学生，不想做你的课题。`,
    },
  ],

  // ==================== 结局 ====================
  endings: [
    {
      id: 'ending-spy',
      name: `收了卧底传数据`,
      description:
        `你收了小张。一开始一切看起来正常——他按时来组会、做实验、写报告。但半年后你逐渐发现异常：他的实验记录里有一些你没有安排的内容，他经常去某杰青的实验室"借设备"，他的论文初稿里引用了你没有见过的数据。你终于明白了——他是某杰青安插在你组里的"节点"。你的研究进展、数据、想法，通过他源源不断地流向某杰青。你的第一个学生，是别人的间谍。而你发现这一切时，论文已经发了——通讯作者是某杰青。`,
      conditions: {
        forbiddenMines: ['mine-ask-relation'],
        maxConsistency: 60,
      },
      priority: 2,
    },
    {
      id: 'ending-offend',
      name: `婉拒被院士记恨`,
      description:
        `你婉拒了小张——用"方向不匹配"作为理由。院士没有发火，只是"嗯"了一声就挂了电话。但从那以后，你发现一些微妙的变化：你的项目申报书在同行评议中总是"差一点"；你申请的学术会议邀请报告被"遗憾地取消"；你的论文在某些期刊的审稿周期变得异常漫长。没有人会告诉你这些跟院士有关——但你心里知道。在学术圈，得罪一个院士的代价不是当场的惩罚，而是长期的、系统性的边缘化。`,
      conditions: {
        requiredMines: ['mine-hesitate'],
        requiredAttitudes: [
          { characterId: 'academician-gentle', attitude: 'wary' },
        ],
      },
      priority: 3,
    },
    {
      id: 'ending-stolen',
      name: `被某杰青截胡`,
      description:
        `你犹豫了太久。在你还在纠结"收不收"的时候，某杰青已经行动了——他让另一个刚入职的青椒收了小张，然后和那个青椒签了"联合培养协议"。你失去了小张，也失去了院士的资源。更让你难受的是，你的第一年招生指标白白浪费了——保研季结束后，好学生早被抢光了。你今年将面对一个没有学生的实验室、一个空荡荡的组会、和一个对你失望的院士。独立PI的第一步，你跌了一跤。`,
      conditions: {
        maxConsistency: 40,
      },
      priority: 1,
    },
    {
      id: 'ending-see-through',
      name: `看穿暗示成边缘人`,
      description:
        `你看穿了一切——院士的安排、某杰青的布局、"不占指标"的谎言。你拒绝了这个交易，收了另一个真正对你方向感兴趣的学生。你的选择在学术上无可指摘，但在关系上代价惨重。院士不再关注你，某杰青把你列入了"不好合作"的名单，甚至院长也暗示你"太较真了"。你成了学院里的边缘人——学术上独立但社交上孤立。三年后，当你的论文发表在顶刊上时，没有人来祝贺你——因为你早已被排除在所有的圈子之外。你赢了学术，输了世界。`,
      conditions: {
        minConsistency: 80,
        requiredExposures: ['info-academician-jieqing-deal'],
        forbiddenMines: ['mine-flatter'],
      },
      priority: 4,
    },
  ],

  // ==================== 身后评价 ====================
  behindEvaluationTemplates: [
    {
      characterId: 'academician-gentle',
      characterName: `某院士（温和型）`,
      channel: `某院士和老伴的晚饭闲聊`,
      content:
        `今天跟那个小某打了个电话，让他带小张。这个年轻人......怎么说呢，不太会来事。我都说那么清楚了，他还在那犹犹豫豫"再考虑考虑"。当年我帮他弄的那个实验室，他是不是忘了？算了，年轻人嘛，不懂人情世故也正常。我再跟某杰青那边说说，实在不行换一个人收小张。`,
      tone: 'negative',
      revealedInfo:
        `院士的"温和推荐"背后是一个完整的备选方案——如果你不配合，他立刻启动Plan B。你以为你有选择权，但院士的世界里没有"被拒绝"这个选项，只有"换一个人"。`,
    },
    {
      characterId: 'undergrad-anxious',
      characterName: `某本科生（保研焦虑型）`,
      channel: `小张和室友的深夜吐槽`,
      content:
        `今天去面谈那个老师了......怎么说呢，办公室好小，学生也没几个。他还问我和院士什么关系——当时我差点钻到地底下去。其实我真的更想去某杰青老师组，人家发的文章多、出路好。但院士非要我去那边......唉，我就是一颗棋子。谁关心棋子想去哪个格子？`,
      tone: 'negative',
      revealedInfo:
        `在这场博弈中，小张是最无力的参与者。他既不能违抗院士的安排，也不能直接去想去的地方。他和你一样被困在权力的网里——区别是，你至少还有说"不"的理论可能。`,
    },
    {
      characterId: 'jieqing-returnee',
      characterName: `某杰青（海归严厉型）`,
      channel: `某杰青和自己组里博后的工作安排`,
      content:
        `那个新来的青椒——小某——院士让小张去他那里。我跟他谈了"不占指标"的方案，他好像有点犹豫。算了，反正不管他答不答应，小张最终还是做我们的课题。如果他不配合，我让老刘那边收。你帮我把XX方向的数据整理一下，到时候不管小张在哪个组，都得用我们的数据。渠道变了，结果不变。`,
      tone: 'sarcastic',
      revealedInfo:
        `在某杰青的棋盘上，你是一个可替换的节点。他不在乎你是否配合——他在乎的是数据和成果的流向。你答应了，他多一个听话的壳；你拒绝了，他换一个壳。对他来说，这只是一道简单的排列组合题。`,
    },
    {
      characterId: 'secretary-process',
      characterName: `某秘书（流程型）`,
      channel: `某秘书和教务处同事的工作聊天`,
      content:
        `今年保研又是一出大戏。院士推荐了个亲戚，某杰青在背后操盘，新来的青椒被推到前面当挡箭牌。我提醒他了——"这个学生情况比较特殊"——但我也只能说到这里了。多说一个字我就得卷进去。做教务的人最重要的品质是什么？看见了当没看见。唉，替那个青椒捏把汗吧。`,
      tone: 'neutral',
      revealedInfo:
        `某秘书是整个事件中唯一能帮你但选择不帮你的人——不是因为她冷漠，而是因为她太清楚"多管闲事"的代价。她的沉默是一种自我保护，也是这个系统的缩影：每个人都看到了不公平，但没有人敢站出来说。`,
    },
  ],
}
