import type { ScenarioData, ScenarioCharacter } from '../../types/scenario'
import type { DialogThread, DialogNode, SocialMine, KnowledgeItem, Ending, BehindEvaluation } from '../../types/game'

export const s06PaperRevision: ScenarioData = {
  id: 's06',
  phase: 'phd',
  title: '论文大修',
  subtitle: '审稿人是仇人',
  description:
    `你的论文收到了大修意见，审稿人的措辞恶毒到不像正常学术评审。你逐渐意识到，这个审稿人很可能是你导师的竞争对手——他不是在审你的论文，是在用你的论文打击你导师。`,
  briefing:
    `你是某985高校博士三年级学生，投出去的论文收到了大修。三个审稿人里，两个给了中规中矩的修改意见，第三个审稿人（Reviewer 3）的意见堪称恶毒：质疑方法论、否定创新性、甚至暗示你的数据有问题。你和博后师兄分析后几乎可以确定：Reviewer 3是竞品实验室的老板，和你导师有过节。更微妙的是，编辑给你发了一封措辞暧昧的邮件，似乎在暗示什么。回复信deadline还剩3天，你的导师只关心结果，不管你怎么搞定。深夜11点，你坐在实验室里，面前是三个同时需要处理的对话线程。`,
  difficulty: 4,
  estimatedMinutes: 15,
  playerRole: '某博三，论文大修回复deadline还剩3天',
  setting: '实验室+线上邮件',
  timeOfDay: '深夜11点',
  atmosphere:
    `实验室里只剩你一个人，荧光灯嗡嗡作响。电脑上开着三个窗口：回复信的LaTeX文档、编辑的邮件、导师的微信对话。博后师兄刚发来消息说他查到了一些关于Reviewer 3的信息。桌上是三杯喝了一半的咖啡和一包拆开的饼干。墙上的时钟指向11点，deadline倒计时72小时。`,

  // ==================== 角色 ====================
  characters: [
    {
      id: 'jieqing-returnee',
      name: '某杰青（海归严厉型）',
      title: '教授/国家杰出青年基金获得者',
      age: 44,
      description:
        '你的导师。海归，学术能力强但管理方式简单粗暴：只看结果，不管过程。他知道Reviewer 3可能是谁，但没有明说，只是反复催你赶紧改完交上去。',
      avatar: 'jieqing-male-stern',
      personality: {
        faceWeight: 0.7,
        powerIndex: 80,
        grudgeMemory: 9,
        allianceFlexibility: 0.2,
        emotionalVolatility: 0.6,
      },
      socialParams: {
        approachability: 30,
        attentionSpan: 60,
        preferredTopics: ['论文进度', '实验数据', '回复策略'],
        forbiddenTopics: ['延期', '审稿人身份', '换期刊'],
        networkValue: 85,
        gossipFactor: 0.3,
        greetingStyle: 'dismissive',
        exitSignals: ['改完发我', '别废话赶紧弄'],
        memoryDuration: 36,
      },
      hiddenAgenda:
        '他和Reviewer 3（竞品实验室老板A）十年前撕破脸，心里清楚这次审稿是公报私仇。但他不想亲自出面处理，希望你自己搞定——如果搞砸了，他可以撇清关系。',
      initialAttitude: 'neutral',
      role: 'neutral',
      initialPosition: '不在实验室，通过微信遥控',
      relationship: '你的博士生导师',
    },
    {
      id: 'postdoc-limbo',
      name: '某博后（过渡迷茫型）',
      title: '博士后',
      age: 30,
      description:
        `你的博后师兄。技术能力很强，但对学术圈已经厌倦，正在考虑离开。他通过学术八卦网络查到了Reviewer 3的一些软肋——一篇有争议的旧论文。他愿意帮你，但方法有点"灰色"。`,
      avatar: 'postdoc-male-tired',
      personality: {
        faceWeight: 0.3,
        powerIndex: 15,
        grudgeMemory: 2,
        allianceFlexibility: 0.8,
        emotionalVolatility: 0.3,
      },
      socialParams: {
        approachability: 75,
        attentionSpan: 120,
        preferredTopics: ['审稿人分析', '回复策略', '学术八卦'],
        forbiddenTopics: ['他的职业规划', '续聘'],
        networkValue: 20,
        gossipFactor: 0.7,
        greetingStyle: 'casual',
        exitSignals: ['你自己拿主意吧', '我先睡了'],
        memoryDuration: 6,
      },
      hiddenAgenda:
        '他的女朋友是Reviewer 3（老板A）的学生。他通过女朋友知道了A的审稿风格和软肋，但这个信息来源绝对不能暴露，否则女朋友会被开除。',
      initialAttitude: 'friendly',
      role: 'ally',
      initialPosition: '宿舍，通过微信联系',
      relationship: '博后师兄/信息提供者',
    },
    {
      id: 'editor-hinting',
      name: '某编辑（暗示型）',
      title: '副主编',
      age: 50,
      description:
        '期刊的副主编（handling editor）。他的邮件措辞异常微妙——不像正常的编辑函。他似乎在暗示你可以申请更换审稿人，但又不明说。',
      avatar: 'editor-male-subtle',
      personality: {
        faceWeight: 0.6,
        powerIndex: 70,
        grudgeMemory: 3,
        allianceFlexibility: 0.5,
        emotionalVolatility: 0.1,
      },
      socialParams: {
        approachability: 40,
        attentionSpan: 30,
        preferredTopics: ['稿件质量', '审稿流程', '学术规范'],
        forbiddenTopics: ['审稿人身份', '私下交易', '催稿'],
        networkValue: 75,
        gossipFactor: 0.2,
        greetingStyle: 'formal',
        exitSignals: ['期待您的修改稿', '请按流程提交'],
        memoryDuration: 12,
      },
      hiddenAgenda:
        '他认识你的导师某杰青——他们是同一个学术圈子的人。他注意到Reviewer 3的审稿意见异常尖刻，怀疑存在利益冲突。他在试探你是否知道审稿人的身份，如果你正式提出异议，他有理由启动换审稿人流程。但他不能主动提出。',
      initialAttitude: 'neutral',
      role: 'wildcard',
      initialPosition: '线上邮件',
      relationship: '期刊副主编/潜在帮助者',
    },
    {
      id: 'reviewer-hostile',
      name: '某审稿人（恶意打压型）',
      title: '教授/竞品实验室PI',
      age: 52,
      description:
        `Reviewer 3。你不应该知道他是谁，但他的审稿意见里充满了对你导师方法论的针对性攻击。他要求你引用的"关键文献"恰好全是他自己实验室的文章。他不是在审你的论文——他是在打击你的导师。`,
      avatar: 'reviewer-male-hostile',
      personality: {
        faceWeight: 0.8,
        powerIndex: 85,
        grudgeMemory: 10,
        allianceFlexibility: 0.1,
        emotionalVolatility: 0.4,
      },
      socialParams: {
        approachability: 10,
        attentionSpan: 45,
        preferredTopics: ['他自己的方法', '他自己的文章'],
        forbiddenTopics: ['利益冲突', '审稿公正性'],
        networkValue: 80,
        gossipFactor: 0.5,
        greetingStyle: 'formal',
        exitSignals: ['建议拒稿', '创新性不足'],
        memoryDuration: 60,
      },
      hiddenAgenda:
        `和某杰青十年前在同一个领域竞争，论文被某杰青抢先发表后一直怀恨在心。利用审稿权力打压某杰青组的学生论文，手段包括：提出不合理的实验要求、质疑方法论根基、要求引用自己的竞品文章。他的真实目的是让这篇论文被拒或无限拖延。`,
      initialAttitude: 'hostile',
      role: 'antagonist',
      initialPosition: '匿名审稿系统',
      relationship: '匿名审稿人/导师的竞争对手',
    },
  ],

  // ==================== 对话线程 ====================
  threads: [
    {
      id: 'thread-revision',
      characterId: 'postdoc-limbo',
      label: '回复信撰写线（和博后讨论策略）',
      urgency: 60,
      status: 'active',
      currentNodeId: 's06-rev-01',
      lastInteractedAt: 0,
      autoMessages: [
        '博后师兄发来一条消息：找到了一些有意思的东西，你先别睡。',
        '博后师兄转发了一篇论文链接：这篇文章的通讯作者看看眼不眼熟？',
        '博后师兄：你那个回复信写到哪了？Reviewer 3那部分我有个思路。',
      ],
      deteriorateEvent:
        '你在回复信中的措辞太过激进，博后师兄没来得及帮你审核就直接提交了。Reviewer 3看到回复信后向编辑投诉你"人身攻击"，论文被直接拒稿。',
    },
    {
      id: 'thread-editor',
      characterId: 'editor-hinting',
      label: '编辑暗示线（邮件往来）',
      urgency: 40,
      status: 'active',
      currentNodeId: 's06-edit-01',
      lastInteractedAt: 0,
      autoMessages: [
        '收到编辑的一封新邮件，标题是：Re: Manuscript Status Update。',
        '编辑在系统里更新了一条备注：Please feel free to contact me if you have any concerns regarding the review process.',
        '编辑又发了一封邮件：I noticed some unusual patterns in the review report. Please advise.',
      ],
      deteriorateEvent:
        '你没有回应编辑的暗示。编辑认为你对审稿流程没有异议，Reviewer 3的恶意审稿意见被正式采纳为修改依据。你必须按照他的每一条不合理要求修改，否则论文将被拒稿。',
    },
    {
      id: 'thread-advisor',
      characterId: 'jieqing-returnee',
      label: '导师催促线（微信消息）',
      urgency: 50,
      status: 'active',
      currentNodeId: 's06-adv-01',
      lastInteractedAt: 0,
      autoMessages: [
        '导师发来微信：回复信写到哪了？',
        '导师发来微信：明天之前把初稿发我。',
        '导师发来一条语音，你不敢点开。',
      ],
      deteriorateEvent:
        '导师失去耐心，自己写了一封措辞激烈的回复信直接提交，把和Reviewer 3的私人恩怨摆到了台面上。编辑不得不介入调查，论文被无限期搁置，你的毕业遥遥无期。',
    },
  ],

  // ==================== 对话节点 ====================
  dialogNodes: [
    // ========== 回复信撰写线 thread-revision ==========
    {
      id: 's06-rev-01',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄深夜发来一条微信："兄弟，我查了一下Reviewer 3要你引的那几篇文献，通讯作者都是同一个人——A。你猜A是谁？就是当年跟咱老板抢那篇Nature子刊的人。这审稿意见根本不是学术评审，是公报私仇。"`,
      emotion: 'conspiratorial',
      options: [
        {
          id: 's06-rev-01-opt-a',
          text: '师兄，那我们怎么办？直接在回复信里指出这个利益冲突？',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's06-rev-02',
          characterReaction:
            `博后师兄秒回："别冲动。指出利益冲突是一条路，但你得有证据。我这边有个思路，但风险有点大。"`,
          stanceRecord: { topic: '应对策略', stance: '考虑正面揭露' },
        },
        {
          id: 's06-rev-01-opt-b',
          text: '师兄，这种事不好说吧。万一我们猜错了呢？还是老老实实回复吧。',
          energyCost: 3,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-02b',
          characterReaction:
            '博后师兄发了个叹气的表情："你老实回复，他一样给你reject。他要的不是你改论文，是你这篇论文不能发。"',
          stanceRecord: { topic: '应对策略', stance: '保守应对' },
        },
        {
          id: 's06-rev-01-opt-c',
          text: '师兄，你说的那个"灰色方法"是什么？',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's06-rev-02c',
          characterReaction:
            '博后师兄犹豫了几秒才回复："你知道A五年前那篇文章吗？数据有问题。我有可靠消息源。"',
          stanceRecord: { topic: '应对策略', stance: '考虑灰色手段' },
        },
      ],
    },
    {
      id: 's06-rev-02',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄发来一段长消息："揭露利益冲突有两种方式。一是直接在回复信里写，风险是你没有实锤——你理论上不应该知道审稿人是谁。二是给编辑写一封confidential letter，礼貌地表达'对审稿公正性的关切'，让编辑自己去查。第二种更安全，但需要措辞非常讲究。"`,
      emotion: 'analytical',
      options: [
        {
          id: 's06-rev-02-opt-a',
          text: '第二种比较稳。师兄你帮我看看措辞？我先写一版给编辑的confidential letter。',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-03',
          characterReaction:
            '博后师兄："行。注意几个要点：不要点名、不要猜测身份、只说你观察到的客观事实——比如审稿意见中要求引用的文献高度集中于某一实验室。"',
          stanceRecord: { topic: '策略细节', stance: '走正规流程' },
        },
        {
          id: 's06-rev-02-opt-b',
          text: '直接在回复信里写。回复信本来就是给编辑和审稿人看的，我光明正大地提出质疑。',
          energyCost: 10,
          consistencyImpact: 0,
          riskTag: '高风险：回复信里公开质疑审稿人',
          nextNodeId: 's06-rev-03b',
          characterReaction:
            '博后师兄发了个捂脸的表情："兄弟你胆子够大的。这么写Reviewer 3会疯的。但如果编辑站你这边，也不是不行……"',
          stanceRecord: { topic: '策略细节', stance: '正面硬刚' },
        },
        {
          id: 's06-rev-02-opt-c',
          text: '两种都先不急。先把回复信正文写好，用学术水平碾压他。实力说话。',
          energyCost: 5,
          consistencyImpact: 8,
          nextNodeId: 's06-rev-03c',
          characterReaction:
            '博后师兄："用学术碾压？理想很美好，但你得想清楚——他要的不是学术回答，他要的是拒掉你。不过如果你真的能写出无懈可击的回复信，编辑也会看到的。"',
          stanceRecord: { topic: '策略细节', stance: '靠学术实力' },
        },
      ],
    },
    {
      id: 's06-rev-02b',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄又发来一条："你听我说完。A要你引的那几篇文献，其中有一篇五年前被人质疑过数据造假，但最后不了了之。如果你在回复信里'不经意'地提到这篇文献的可重复性问题，A会知道你查过他。这是一种无声的警告——你动我，我也有东西。但这招有风险。"`,
      emotion: 'calculating',
      options: [
        {
          id: 's06-rev-02b-opt-a',
          text: '师兄，这太危险了。学术圈里搞这种事被发现就是身败名裂。我还是正面回复吧。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-03c',
          characterReaction:
            '博后师兄："也对。那你就老老实实逐条回复，能答的答，答不了的说需要更多时间。起码态度要好。"',
          stanceRecord: { topic: '底线', stance: '拒绝灰色手段' },
        },
        {
          id: 's06-rev-02b-opt-b',
          text: '师兄，你说的"可重复性问题"具体是什么？让我先了解一下。',
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's06-rev-03d',
          characterReaction:
            `博后师兄犹豫了一会："我女……我一个朋友告诉我的。A那篇文章的Figure 3有些蹊跷。但这个信息你不能说是从我这听到的。"`,
          stanceRecord: { topic: '底线', stance: '想了解灰色手段' },
        },
      ],
    },
    {
      id: 's06-rev-02c',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄发来语音消息，你戴上耳机听："A五年前那篇文章的Figure 3，Western blot有复制粘贴的嫌疑。当时有人在PubPeer上指出过，但A用'图像处理误差'搪塞过去了。如果你在回复信里提一句'We note that some of the recommended references have been subject to post-publication discussions regarding data integrity'——他会懂的。但这是核武器，你得想好后果。"`,
      emotion: 'serious',
      options: [
        {
          id: 's06-rev-02c-opt-a',
          text: '师兄，这种事不能写在回复信里。如果被查出来我们掌握了审稿人的身份信息，我们自己也要完。',
          energyCost: 8,
          consistencyImpact: 8,
          nextNodeId: 's06-rev-03',
          characterReaction:
            '博后师兄沉默了一会："你说得对。这个信息只能当底牌，不能明打。那走正规路子——给编辑写confidential letter？"',
          stanceRecord: { topic: '灰色手段', stance: '拒绝使用' },
        },
        {
          id: 's06-rev-02c-opt-b',
          text: '如果我不写在回复信里，而是私下给编辑提醒呢？让编辑自己去查？',
          energyCost: 10,
          consistencyImpact: -3,
          nextNodeId: 's06-rev-03d',
          characterReaction:
            '博后师兄："这个……比直接写在回复信里好一点。但你给编辑提供的任何信息，编辑都可能追查来源。你确定你的消息源经得起追查？"',
          stanceRecord: { topic: '灰色手段', stance: '考虑变通使用' },
        },
        {
          id: 's06-rev-02c-opt-c',
          text: '写。就这么写。他不仁我不义。',
          energyCost: 5,
          consistencyImpact: -8,
          triggersMine: 'mine-disrespect-reviewer',
          nextNodeId: 's06-rev-03e',
          characterReaction:
            `博后师兄："你疯了？！你知道这意味着什么吗？你在一封正式的学术回复信里暗示审稿人数据造假——即使你说的是事实，你也会被学术圈打上'不可信'的标签。"`,
          riskTag: '雷区：暗指审稿人造假',
          stanceRecord: { topic: '灰色手段', stance: '直接使用' },
        },
      ],
    },
    {
      id: 's06-rev-03',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄帮你梳理了confidential letter的要点："第一，不猜测审稿人身份。第二，客观列出审稿意见中的异常模式——比如要求引用的文献集中度、对方法论的攻击与学术常规不符。第三，表达你对审稿公正性的关切。第四，请编辑酌情处理。措辞要恭敬但坚定。你先写，我帮你润色。"`,
      emotion: 'supportive',
      options: [
        {
          id: 's06-rev-03-opt-a',
          text: '好的师兄。我先把几个关键事实列出来：10条意见中7条要求引用同一实验室文献、对方法论的攻击缺乏具体技术依据……',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-04',
          characterReaction:
            '博后师兄："很好。这些都是客观事实，编辑看了会自己判断的。注意语气——你是在请求编辑审视流程，不是在控诉审稿人。"',
        },
        {
          id: 's06-rev-03-opt-b',
          text: '师兄，这封confidential letter要不要先给导师看看？',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's06-rev-04b',
          characterReaction:
            `博后师兄："这个……你得想清楚。老板看了可能有两种反应：一是觉得你很聪明，二是觉得你'小题大做'。而且他自己和A的恩怨，他可能不想在正式渠道上体现。"`,
        },
      ],
    },
    {
      id: 's06-rev-03b',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄发来一个"你牛"的表情，然后说："既然你要硬刚，那回复信的措辞就很关键。你不能直接说'Reviewer 3有利益冲突'，你要用学术语言包装。比如：'We respectfully note that the reviewer's comments appear to recommend an unusually high number of citations from a specific research group, which may warrant editorial consideration regarding potential conflicts of interest.'"`,
      emotion: 'nervous',
      options: [
        {
          id: 's06-rev-03b-opt-a',
          text: '就用这个措辞。学术得体但立场清晰。同时在正文回复里把每一条审稿意见都认真回答，让编辑看到我的态度。',
          energyCost: 12,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-04',
          characterReaction:
            '博后师兄："好。两手准备：正面回答显诚意，侧面质疑护底线。但你要做好心理准备——如果编辑不买账，你就同时得罪了审稿人和编辑。"',
          stanceRecord: { topic: '回复策略', stance: '正面质疑+认真回复' },
        },
        {
          id: 's06-rev-03b-opt-b',
          text: '再加一句：鉴于审稿意见的学术针对性与方法论层面的批评不匹配，我们恳请编辑重新评估本轮审稿意见的客观性。',
          energyCost: 8,
          consistencyImpact: -3,
          triggersMine: 'mine-disrespect-reviewer',
          nextNodeId: 's06-rev-04c',
          characterReaction:
            `博后师兄发来一个惊恐的表情："这句太重了！'重新评估客观性'等于直接说审稿人不客观。编辑会觉得你在挑战审稿流程的权威性。"`,
          riskTag: '雷区：措辞过激',
        },
      ],
    },
    {
      id: 's06-rev-03c',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄发来消息："行吧，那就靠学术实力说话。我帮你把Reviewer 3的每一条意见拆开来看——哪些是合理的、哪些是刁难的。合理的认真改，刁难的用数据和文献堵他。他要是真的懂行，你的回复他反驳不了；他要是公报私仇，他越挑刺越暴露自己。"`,
      emotion: 'supportive',
      options: [
        {
          id: 's06-rev-03c-opt-a',
          text: '好的。Reviewer 3一共提了10条意见，我觉得其中3条是合理的，4条是无理取闹，还有3条是在变相要求我引用他的文献。',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-04',
          characterReaction:
            '博后师兄："3条合理的先改，诚意到位。4条无理取闹的用数据反驳。3条引文要求——引一篇，拒两篇，给个合理理由。"',
        },
        {
          id: 's06-rev-03c-opt-b',
          text: '师兄，但是他那条"方法论根基有问题"的意见——如果我正面回复，等于承认他的质疑有道理。可如果我不回复，编辑会觉得我在回避。',
          energyCost: 10,
          consistencyImpact: 3,
          nextNodeId: 's06-rev-04d',
          characterReaction:
            '博后师兄："这条确实棘手。你不能承认，也不能回避。最好的办法是：补充一组新实验数据，用结果说话。但你还有三天——来得及吗？"',
        },
      ],
    },
    {
      id: 's06-rev-03d',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄犹豫了很久才发来消息："A那篇文章的Figure 3，有人在PubPeer上分析过——Western blot的条带有可疑的相似度。当时学术圈讨论了一阵子，但A给了个解释就过去了。这个信息是公开的，你自己去PubPeer上搜就能找到。但你怎么'碰巧'知道要去搜这个——这是关键。如果A意识到有人在针对他的旧账，他会发疯的。"`,
      emotion: 'cautious',
      options: [
        {
          id: 's06-rev-03d-opt-a',
          text: '我不用这个信息。知道就行了，心里有底。我还是正面回复，同时给编辑写confidential letter。',
          energyCost: 8,
          consistencyImpact: 8,
          nextNodeId: 's06-rev-04',
          characterReaction:
            '博后师兄松了口气："这样最好。这个信息当保险，万一真的走投无路了再说。"',
          stanceRecord: { topic: '灰色信息', stance: '留作底牌不使用' },
        },
        {
          id: 's06-rev-03d-opt-b',
          text: '师兄，如果我只是在给编辑的信里提一句"建议编辑关注审稿人推荐文献的post-publication讨论情况"呢？不点名、不指控，让编辑自己去查。',
          energyCost: 10,
          consistencyImpact: -5,
          triggersMine: 'mine-hint-reviewer-fraud',
          nextNodeId: 's06-rev-04c',
          characterReaction:
            `博后师兄沉默了整整两分钟，然后发来："你在走钢丝。这句话如果编辑看懂了，他会去查——然后Reviewer 3的身份就不再匿名了。你赢了这一局，但你在学术圈的名声……看你了。"`,
          riskTag: '灰色地带：暗示编辑查审稿人旧账',
        },
      ],
    },
    {
      id: 's06-rev-03e',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄直接打来电话："你冷静一下！你在一封正式的学术通信里暗示审稿人有数据问题——你知道这在学术界等于什么吗？等于你在说'审稿人是个骗子'。不管他是不是，你这样写你就完了。编辑会直接把你的投稿拉黑，以后别想在这个期刊发文章。你听我的，把那句话删了。"`,
      emotion: 'panicked',
      options: [
        {
          id: 's06-rev-03e-opt-a',
          text: '……你说得对。我冲动了。删掉。还是走正规路子，给编辑写confidential letter。',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's06-rev-04',
          characterReaction:
            '博后师兄长出一口气："吓死我了。兄弟，以后做决定之前先等五分钟。走，我们好好写这封confidential letter。"',
        },
        {
          id: 's06-rev-03e-opt-b',
          text: '不删。他可以恶意审稿，我就不能指出事实？学术公正是双向的。',
          energyCost: 5,
          consistencyImpact: -10,
          nextNodeId: 's06-rev-04c',
          characterReaction:
            '博后师兄在电话那头沉默了。然后说了一句："那你自己保重吧。这件事我不掺和了。"他挂了电话。',
          stanceRecord: { topic: '底线', stance: '坚持激进路线' },
          attitudeShift: { characterId: 'postdoc-limbo', from: 'friendly', to: 'wary' },
        },
      ],
    },
    {
      id: 's06-rev-04',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `凌晨1点，博后师兄帮你审完了回复信和confidential letter的初稿。他发来消息："回复信写得不错，逐条回答到位。Confidential letter措辞也可以——客观、克制、有理有据。但我最后提醒你一点：不管走哪条路，这篇论文最终能不能发，取决于编辑。如果编辑不作为，你还得有Plan B。"`,
      emotion: 'thoughtful',
      options: [
        {
          id: 's06-rev-04-opt-a',
          text: 'Plan B是什么？换期刊投？',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's06-rev-05',
          characterReaction:
            '博后师兄："换期刊是最后的退路。但在那之前，你还有一个选项——让导师出面。不过你知道咱老板的脾气……"',
        },
        {
          id: 's06-rev-04-opt-b',
          text: '先不想Plan B了。把A方案做到极致。凌晨2点之前我要把回复信定稿。',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-rev-05',
          characterReaction:
            '博后师兄："行。我陪你熬。有啥问题随时喊我。"',
          stanceRecord: { topic: '工作节奏', stance: '全力以赴' },
        },
      ],
    },
    {
      id: 's06-rev-04b',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄想了想说："给老板看的话……你得做好准备。老板如果知道你在背后搞这些操作，反应可能很极端。他要么觉得你能干，要么觉得你在搞事情。而且他和A的恩怨他自己清楚——你把这事摆到他面前，他可能直接接管回复信的控制权，写一封比你更激烈的版本。"`,
      emotion: 'warning',
      options: [
        {
          id: 's06-rev-04b-opt-a',
          text: '那还是不给导师看了。confidential letter我自己和编辑之间的事。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's06-rev-05',
          characterReaction:
            '博后师兄："明智的选择。你跟编辑之间的通信，导师不需要知道每一封。"',
          stanceRecord: { topic: '信息管理', stance: '不让导师介入' },
        },
        {
          id: 's06-rev-04b-opt-b',
          text: '还是给导师看吧。这事瞒不住的，早说比晚说好。',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's06-rev-05',
          characterReaction:
            '博后师兄叹了口气："那你准备好挨骂吧。还有，记得把我的名字从整个事件里抹掉——老板如果知道信息是从我这来的，我也吃不了兜着走。"',
          stanceRecord: { topic: '信息管理', stance: '让导师知情' },
        },
      ],
    },
    {
      id: 's06-rev-04c',
      threadId: 'thread-revision',
      speaker: 'narrator',
      text: '你的回复信措辞已经越过了安全线。不管结果如何，你在学术圈留下了一个"激进"的印象——编辑会记住你，审稿人会记住你，而学术圈的记忆比你以为的长得多。博后师兄选择了保持距离，你失去了最重要的同盟。',
      options: [],
    },
    {
      id: 's06-rev-04d',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `博后师兄帮你分析了那条"方法论根基有问题"的审稿意见："他说你的方法'缺乏理论基础'，但他引的反例全是他自己的方法。这不是在质疑你的方法论，是在推销他自己的。你的回复策略应该是：正面阐述你方法的理论依据，然后补充一组validation实验。数据说话。三天能跑完一组小实验吗？"`,
      emotion: 'analytical',
      options: [
        {
          id: 's06-rev-04d-opt-a',
          text: '三天跑完一组validation……勉强能行。我今晚写代码，明天跑实验，后天出结果写进去。',
          energyCost: 15,
          consistencyImpact: 8,
          nextNodeId: 's06-rev-05',
          characterReaction:
            '博后师兄："行。这样你的回复信就无懈可击了。学术水平碾压，是最好的反击。我帮你看代码。"',
          stanceRecord: { topic: '学术态度', stance: '用数据说话' },
        },
        {
          id: 's06-rev-04d-opt-b',
          text: '三天来不及。我先用已有的数据尽量补充，在回复信里承诺后续提供额外validation。',
          energyCost: 8,
          consistencyImpact: 3,
          nextNodeId: 's06-rev-05',
          characterReaction:
            `博后师兄："也行。但'承诺后续提供'在审稿人那里基本等于白说。能补多少补多少吧。"`,
        },
      ],
    },
    {
      id: 's06-rev-05',
      threadId: 'thread-revision',
      speaker: 'postdoc-limbo',
      text: `凌晨2点。博后师兄发来最后一条消息："兄弟，不管最后怎么样，记住一件事——一篇论文不值得毁掉你的职业生涯。Reviewer 3再怎么恶意，也只是一个审稿人。你的学术能力不会因为一次审稿就消失。先把能做的做好，剩下的交给运气和编辑的良心。我先睡了，明天继续。"`,
      emotion: 'warm',
      options: [
        {
          id: 's06-rev-05-opt-a',
          text: '谢谢师兄。你先睡吧。我再写一会。',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's06-rev-06',
          characterReaction:
            '博后师兄发了个加油的表情，然后灰了头像。',
        },
        {
          id: 's06-rev-05-opt-b',
          text: '师兄，说真的——你为什么帮我这么多？你自己的事情也够烦的了。',
          energyCost: 5,
          consistencyImpact: 0,
          nextNodeId: 's06-rev-06',
          characterReaction:
            '博后师兄过了一会才回："因为当年我也遇到过一样的事。没人帮我。所以我不想看你一个人扛。行了别煽情了，赶紧写你的论文。"',
        },
      ],
    },
    {
      id: 's06-rev-06',
      threadId: 'thread-revision',
      speaker: 'narrator',
      text: '实验室里只剩下键盘声和荧光灯的嗡嗡声。你盯着屏幕上的回复信，每一行字都像是在跟一个看不见的敌人过招。72小时的倒计时，已经过去了3个小时。你揉了揉眼睛，继续写。',
      options: [],
    },

    // ========== 编辑暗示线 thread-editor ==========
    {
      id: 's06-edit-01',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `你打开编辑的邮件。措辞非常微妙："Dear Author, I hope this message finds you well. I wanted to personally reach out regarding the review process of your manuscript. While all reviewer comments should be addressed in your revision, I also want to remind you that our journal has a formal procedure for authors to raise concerns about the review process, should any arise. Please do not hesitate to contact me directly. Best regards."`,
      emotion: 'subtle',
      options: [
        {
          id: 's06-edit-01-opt-a',
          text: '回复编辑：Thank you for your message. I would like to raise some concerns regarding the review process through the formal procedure you mentioned.',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-edit-02',
          characterReaction:
            '编辑很快回复了——对于一个学术编辑来说快得不寻常：Thank you for your response. Please outline your concerns in a confidential letter addressed to me.',
          stanceRecord: { topic: '编辑沟通', stance: '接收暗示' },
        },
        {
          id: 's06-edit-01-opt-b',
          text: '回复编辑：Thank you for the reminder. We will address all reviewer comments in our revision and submit on time.',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's06-edit-02b',
          characterReaction:
            '编辑过了一天才回复，只有一句：Thank you. We look forward to receiving your revision.',
          stanceRecord: { topic: '编辑沟通', stance: '忽略暗示' },
        },
        {
          id: 's06-edit-01-opt-c',
          text: '回复编辑：Thank you, Dr. XX. Actually, I do have some observations about the review report that I would like to discuss with you confidentially. May I request a brief call?',
          energyCost: 10,
          consistencyImpact: -3,
          nextNodeId: 's06-edit-02c',
          characterReaction:
            `编辑隔了两个小时回复："I appreciate your candor. However, I would prefer to handle this in writing to maintain proper documentation. Please send your concerns via email."`,
          stanceRecord: { topic: '编辑沟通', stance: '主动出击要求通话' },
        },
      ],
    },
    {
      id: 's06-edit-02',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `编辑回复后，你开始起草confidential letter。你需要决定写什么、怎么写。这封信将决定编辑是否启动换审稿人的流程。编辑又追加了一句话："For your reference, our journal's policy on reviewer conflicts of interest is outlined in Section 4.3 of our editorial guidelines."他甚至帮你找好了依据。`,
      emotion: 'encouraging',
      options: [
        {
          id: 's06-edit-02-opt-a',
          text: '写一封克制的confidential letter：列出审稿意见中的异常模式（文献引用集中度、攻击性措辞等），引用Section 4.3，请编辑审视。',
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's06-edit-03',
          characterReaction:
            '编辑当天就回复了："Thank you for bringing this to my attention. I will review the matter carefully and may consult with the Editor-in-Chief. You will hear from me within 48 hours."',
        },
        {
          id: 's06-edit-02-opt-b',
          text: '在confidential letter里直接点明你怀疑审稿人与你的导师存在竞争关系。',
          energyCost: 8,
          consistencyImpact: -5,
          exposesInfo: 'info-reviewer-identity',
          nextNodeId: 's06-edit-03b',
          characterReaction:
            `编辑的回复冷淡了很多："I must remind you that the identity of reviewers is confidential. Speculating on reviewer identity is a serious matter. I will note your concern, but I strongly advise against making such allegations without evidence."`,
          riskTag: '风险：暴露你知道审稿人身份',
          stanceRecord: { topic: '编辑沟通', stance: '直接指控' },
        },
      ],
    },
    {
      id: 's06-edit-02b',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `编辑没有再发邮件。你的回复关上了他暗示的那扇门。两天后，系统显示你的修改稿状态更新为"Awaiting Author Revision"——标准流程，没有任何特殊处理。Reviewer 3的全部意见将被视为有效修改建议。`,
      emotion: 'neutral',
      options: [
        {
          id: 's06-edit-02b-opt-a',
          text: '后悔了。重新给编辑写邮件，说我确实有一些concerns想反映。',
          energyCost: 10,
          consistencyImpact: -5,
          nextNodeId: 's06-edit-03c',
          characterReaction:
            '编辑过了很久才回复："Thank you. I am open to hearing your concerns. Please submit a formal letter." 语气比第一次冷淡了。',
          stanceRecord: { topic: '编辑沟通', stance: '犹豫后反悔' },
        },
        {
          id: 's06-edit-02b-opt-b',
          text: '算了。就按正常流程来吧。',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's06-edit-03d',
          characterReaction:
            '你关掉了编辑的邮件。窗外一阵风吹过，实验室的门"咣"地响了一声。',
        },
      ],
    },
    {
      id: 's06-edit-02c',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `编辑拒绝了电话通话的请求，但他的邮件措辞说明他依然开放。他补充道："I understand that discussing sensitive matters can be challenging in writing. Please take your time to compose your concerns. I assure you that any correspondence will be treated with the utmost confidentiality."`,
      emotion: 'professional',
      options: [
        {
          id: 's06-edit-02c-opt-a',
          text: '好的。那我就用邮件写一封正式的confidential letter，详细陈述我的observations。',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-edit-03',
          characterReaction:
            '编辑简短回复："Thank you. I look forward to your letter."',
        },
        {
          id: 's06-edit-02c-opt-b',
          text: '谢谢编辑。我再考虑一下要不要正式提出。也许我应该先把修改稿写好。',
          energyCost: 5,
          consistencyImpact: -3,
          nextNodeId: 's06-edit-03d',
          characterReaction:
            '编辑没有再回复。门关上了。',
        },
      ],
    },
    {
      id: 's06-edit-03',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `48小时后——也就是deadline前一天——编辑的邮件来了："Dear Author, Thank you for your detailed letter. After careful review, I have decided to seek an additional independent review for your manuscript. The deadline for your revision will be extended by two weeks. Please continue to address the comments from Reviewers 1 and 2. Regarding Reviewer 3's comments, you may address them at your discretion. I will handle the rest." 他换审稿人了。`,
      emotion: 'relieved',
      options: [
        {
          id: 's06-edit-03-opt-a',
          text: '太好了！立刻回复感谢编辑，然后集中精力回复Reviewer 1和2的意见，对Reviewer 3的意见选择性回复。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's06-edit-04',
          characterReaction:
            '编辑回复："You are welcome. Good luck with your revision."',
        },
        {
          id: 's06-edit-03-opt-b',
          text: '回复编辑感谢。但也认真回复Reviewer 3的合理意见——不是因为他值得尊重，而是因为这些修改确实能让论文更好。',
          energyCost: 10,
          consistencyImpact: 8,
          nextNodeId: 's06-edit-04',
          characterReaction:
            '编辑看到你对Reviewer 3合理意见的认真回复后，追加了一句："I appreciate your professional attitude."',
          stanceRecord: { topic: '学术态度', stance: '职业化处理' },
        },
      ],
    },
    {
      id: 's06-edit-03b',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `编辑的回复带着明显的不满："I must emphasize that speculating on reviewer identity undermines the peer review process. While I acknowledge your general concerns about the review quality, I cannot act on unsubstantiated allegations. I will proceed with the standard review process. Please submit your revision by the deadline." 你的直接指控适得其反了。`,
      emotion: 'cold',
      options: [
        {
          id: 's06-edit-03b-opt-a',
          text: '赶紧道歉并补救：Dear Editor, I apologize for the inappropriate speculation. I would like to withdraw my previous comments and instead focus on objective observations about the review report...',
          energyCost: 12,
          consistencyImpact: -3,
          nextNodeId: 's06-edit-04',
          characterReaction:
            '编辑过了一天才回："Noted. Please focus on your revision."',
        },
        {
          id: 's06-edit-03b-opt-b',
          text: '不道歉。我说的是事实。继续按原计划提交回复信。',
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's06-edit-04',
          characterReaction:
            '编辑不再回复任何邮件。你的manuscript在系统里的状态没有任何变化。',
          stanceRecord: { topic: '编辑关系', stance: '不退让' },
        },
      ],
    },
    {
      id: 's06-edit-03c',
      threadId: 'thread-editor',
      speaker: 'editor-hinting',
      text: `编辑回复了，但语气明显不如第一次热情："Thank you for your letter. I will review your concerns. However, please note that the revision deadline remains unchanged. I suggest you continue working on your revision while I assess the situation." 你错过了最佳窗口期，但还有一线希望。`,
      emotion: 'lukewarm',
      options: [
        {
          id: 's06-edit-03c-opt-a',
          text: '赶紧把confidential letter写得更详细，同时加紧回复信的撰写。两手一起抓。',
          energyCost: 15,
          consistencyImpact: 3,
          nextNodeId: 's06-edit-04',
          characterReaction:
            '编辑在deadline当天回复："I have noted your concerns. An additional review may be requested after the initial revision is processed."',
        },
      ],
    },
    {
      id: 's06-edit-03d',
      threadId: 'thread-editor',
      speaker: 'narrator',
      text: '你放弃了与编辑沟通的机会。Reviewer 3的全部意见将被视为有效修改建议，你必须逐条回复——包括那些不合理的要求。编辑不会主动帮你，因为你没有给他帮你的理由。',
      options: [],
    },
    {
      id: 's06-edit-04',
      threadId: 'thread-editor',
      speaker: 'narrator',
      text: '编辑的态度已经明确了。不管最终结果如何，你在这条线上能做的都做了。剩下的，交给时间和编辑的职业操守。你关掉邮件窗口，转向回复信的最后润色。',
      options: [],
    },

    // ========== 导师催促线 thread-advisor ==========
    {
      id: 's06-adv-01',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `深夜11:30，导师发来微信："回复信写到哪了？Reviewer 3那部分你打算怎么回？"导师很少在这个时间发消息——说明他也睡不着。`,
      emotion: 'pressing',
      options: [
        {
          id: 's06-adv-01-opt-a',
          text: '老师，Reviewer 3的意见我分了三类在回复。合理的改，不合理的用数据反驳，引文要求选择性引用。初稿明天给您。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's06-adv-02',
          characterReaction:
            `导师秒回："别'明天'，今晚写完。三天deadline你拖到明天？"`,
        },
        {
          id: 's06-adv-01-opt-b',
          text: '老师，我觉得Reviewer 3的审稿有问题。他要求引的文献全是同一个实验室的……我怀疑——',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's06-adv-02b',
          characterReaction:
            '导师的回复延迟了整整三分钟。然后只发来两个字："知道。"',
          stanceRecord: { topic: '审稿人身份', stance: '向导师暗示' },
        },
        {
          id: 's06-adv-01-opt-c',
          text: '老师，说实话我有点写不动了。Reviewer 3的意见太恶意了，我不知道怎么正面回复一个存心拒掉我的人。',
          energyCost: 3,
          consistencyImpact: -5,
          triggersMine: 'mine-cry-advisor',
          nextNodeId: 's06-adv-02c',
          characterReaction:
            `导师的回复冰冷："你是博三了，不是本科生。审稿人恶意你就不写了？那以后还怎么混学术圈？别跟我说'写不动'，给我写。"`,
          riskTag: '雷区：向导师哭诉',
          stanceRecord: { topic: '心态', stance: '示弱' },
        },
      ],
    },
    {
      id: 's06-adv-02',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `导师又追了一条消息："Reviewer 3那条关于方法论的意见，你不能硬顶。你得用数据说话。之前那组ablation实验的结果找出来，放在supplementary里。另外——他要的那些引文，引一两篇就行了，别全引。引多了编辑也看得出来。"导师的建议其实很专业——当他不发脾气的时候。`,
      emotion: 'instructive',
      options: [
        {
          id: 's06-adv-02-opt-a',
          text: '好的老师。ablation实验结果我找到了。但是有一个问题——Reviewer 3要求的新实验，三天做不完。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's06-adv-03',
          characterReaction:
            '导师想了想："做不完就在回复信里说clearly——we plan to include additional experiments in the revised manuscript. 先提交，后补。"',
        },
        {
          id: 's06-adv-02-opt-b',
          text: '老师，引他的文献——我查过了，其中一篇有过数据争议……',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's06-adv-03b',
          characterReaction:
            '导师沉默了很久。然后发来一条语音。你犹豫了几秒，点开了。',
        },
      ],
    },
    {
      id: 's06-adv-02b',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `导师发来了一条长消息，口吻罕见地平静："我知道你在说谁。十年前的事了。但现在不是翻旧账的时候。你的首要任务是让这篇论文发出来。不管审稿人是谁，你的回复信要做到无懈可击。至于其他的——我会处理。你不要插手。"`,
      emotion: 'serious',
      options: [
        {
          id: 's06-adv-02b-opt-a',
          text: '好的老师。回复信我会写到最好。其他的事我不管了。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's06-adv-03',
          characterReaction:
            '导师："嗯。写完发我。"简短但不再催促。你猜他今晚也不会睡了。',
        },
        {
          id: 's06-adv-02b-opt-b',
          text: '老师，编辑给我发了一封邮件，暗示我可以提出审稿异议。您觉得我应该——',
          energyCost: 8,
          consistencyImpact: -3,
          exposesInfo: 'info-editor-knows',
          nextNodeId: 's06-adv-03c',
          characterReaction:
            '导师的回复很快："编辑给你发邮件了？什么内容？转发给我看看。"他的语气变了——不再是催促，而是警觉。',
          stanceRecord: { topic: '信息透露', stance: '告知导师编辑暗示' },
        },
      ],
    },
    {
      id: 's06-adv-02c',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `导师又发来一条消息，语气稍微缓和了一点——但只是一点："我说重了。但你必须学会扛住压力。学术圈就是这样，审稿人恶意打压是常态。你现在学会怎么应对，以后受益终身。把回复信写好。不要情绪化。一条一条，冷静地回。"`,
      emotion: 'stern',
      options: [
        {
          id: 's06-adv-02c-opt-a',
          text: '老师，我知道了。对不起刚才说了丧气话。我现在状态调整好了，继续写。',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's06-adv-03',
          characterReaction:
            '导师发了一个"好"字。然后过了五分钟，追了一句："写完第一版先发我，我帮你看措辞。"这是他今晚说的最温暖的一句话。',
        },
        {
          id: 's06-adv-02c-opt-b',
          text: '老师，我想问一个问题——您知道Reviewer 3是谁吗？',
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's06-adv-03d',
          characterReaction:
            '导师发来一个"？"。然后是长达五分钟的沉默。你不知道他是在犹豫要不要回答，还是在生气。',
          stanceRecord: { topic: '审稿人身份', stance: '直接询问导师' },
        },
      ],
    },
    {
      id: 's06-adv-03',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `凌晨1点，导师发来消息："你给编辑回邮件了吗？"你不确定他是在问编辑的暗示邮件还是正常的流程邮件。导师的措辞有时候比审稿意见还难读懂。`,
      emotion: 'probing',
      options: [
        {
          id: 's06-adv-03-opt-a',
          text: '回了，确认会按时提交修改稿。',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's06-adv-04',
          characterReaction:
            '导师："嗯。继续写。写完直接发我。"',
        },
        {
          id: 's06-adv-03-opt-b',
          text: '老师，编辑那封邮件……您收到了吗？（试探导师是否也被CC了）',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's06-adv-04',
          characterReaction:
            '导师只回了一个字："嗯。"你无法判断他是在敷衍还是在隐瞒。',
        },
      ],
    },
    {
      id: 's06-adv-03b',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `你点开导师的语音。导师的声音压得很低，像是怕隔壁家人听到："那篇文章的事你知道就行了。不要写在任何文字里。不要跟任何人提。你只需要知道——他不是一个干净的人。但学术圈的规则是，你得用学术的方式打败他，不能用这种事。听懂了吗？"`,
      emotion: 'secretive',
      options: [
        {
          id: 's06-adv-03b-opt-a',
          text: '听懂了，老师。我用学术质量回应他。',
          energyCost: 5,
          consistencyImpact: 8,
          nextNodeId: 's06-adv-04',
          characterReaction:
            '导师又发来一条文字消息："好。去写吧。"语音的那条消息被他撤回了。',
          stanceRecord: { topic: '灰色信息处理', stance: '不使用' },
        },
        {
          id: 's06-adv-03b-opt-b',
          text: '老师，如果编辑自己发现了呢？我不说，但如果编辑去查——',
          energyCost: 8,
          consistencyImpact: -3,
          nextNodeId: 's06-adv-04',
          characterReaction:
            `导师的语气突然变厉了："编辑的事编辑自己会管。你不要当中间人。你只管写好你的回复信。听到没有？"`,
        },
      ],
    },
    {
      id: 's06-adv-03c',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `导师看了你转发的编辑邮件后，沉默了很久。然后发来一条消息："这个编辑我认识。他是好人。但你不要以为他是在帮你——他是在保护期刊的声誉。如果审稿流程出了问题，编辑部要负责。他让你提异议，是在走流程。你写就写，但不要在信里提我的名字。明白吗？"`,
      emotion: 'guarded',
      options: [
        {
          id: 's06-adv-03c-opt-a',
          text: '明白了老师。我会以第一作者的身份单独提出异议，不会牵扯到您。',
          energyCost: 5,
          consistencyImpact: 5,
          nextNodeId: 's06-adv-04',
          characterReaction:
            '导师："嗯。另外——写好了让我过目再发。所有对外的邮件。"他开始收紧控制了。',
        },
        {
          id: 's06-adv-03c-opt-b',
          text: '老师，如果您直接联系编辑会不会更有效？您们认识——',
          energyCost: 5,
          consistencyImpact: -5,
          nextNodeId: 's06-adv-04',
          characterReaction:
            `导师的回复很快也很冷："我出面？那不就坐实了'利用私人关系影响审稿'吗？你动动脑子。这件事必须由你来推动，以学生和第一作者的身份。我在幕后。"`,
          stanceRecord: { topic: '导师角色', stance: '想让导师出面' },
        },
      ],
    },
    {
      id: 's06-adv-03d',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `五分钟后，导师终于回复了。一条很长的文字消息："你不应该问这个问题。审稿是匿名的，你不应该知道审稿人是谁，我也不应该告诉你。但我只说一句——这个人审我的学生不是第一次了。每一次都是恶意拒稿。你不是第一个受害者。所以你现在要做的不是查他是谁，而是写一封让任何审稿人都挑不出毛病的回复信。去写。"`,
      emotion: 'bitter',
      options: [
        {
          id: 's06-adv-03d-opt-a',
          text: '老师，我知道了。谢谢您告诉我这些。我去写回复信了。',
          energyCost: 5,
          consistencyImpact: 3,
          nextNodeId: 's06-adv-04',
          characterReaction:
            '导师没有再回复。你看到他的微信状态从"在线"变成了"离线"——但你知道他没睡。',
        },
        {
          id: 's06-adv-03d-opt-b',
          text: '老师，他审您的学生不是第一次了？那之前的学生是怎么处理的？',
          energyCost: 8,
          consistencyImpact: 0,
          nextNodeId: 's06-adv-04',
          characterReaction:
            '导师过了一会回了一条简短的消息："有人过了，有人换了期刊。没有人投诉过。你想当第一个？"',
        },
      ],
    },
    {
      id: 's06-adv-04',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `凌晨3点，你把回复信初稿发给了导师。导师看了四十分钟，发来一段修改意见："第二条回复太defensive，改成assertive。第五条的数据图表分辨率不够，重做。Reviewer 3那部分——你的措辞已经很克制了。但这句话删掉：'We respectfully disagree with the reviewer.'改成'We appreciate the reviewer's perspective and provide additional evidence below.'学术圈的战争不是靠硬怼赢的，是靠让对方无话可说赢的。"`,
      emotion: 'focused',
      options: [
        {
          id: 's06-adv-04-opt-a',
          text: '收到老师。按您的意见改。图表我重新跑一版高分辨率的。',
          energyCost: 8,
          consistencyImpact: 5,
          nextNodeId: 's06-adv-05',
          characterReaction:
            '导师："改完再发我。睡前改完。"他大概忘了现在已经凌晨3点了——或者在他的世界里，凌晨3点还不算"该睡了"。',
        },
        {
          id: 's06-adv-04-opt-b',
          text: '老师，最后一条我同意。但前面那句"respectfully disagree"我想保留——这是对审稿意见的正当回应。',
          energyCost: 10,
          consistencyImpact: 3,
          nextNodeId: 's06-adv-05',
          characterReaction:
            '导师想了想："行。但把respectfully换成kindly。微妙的区别。respectfully太硬了。"他连措辞的力度都在帮你拿捏。',
          stanceRecord: { topic: '导师指导', stance: '有选择地接受' },
        },
      ],
    },
    {
      id: 's06-adv-05',
      threadId: 'thread-advisor',
      speaker: 'jieqing-returnee',
      text: `凌晨4点半，导师发来最后一条消息："改得不错。提交吧。不管结果怎么样，这篇论文的水平你心里有数。如果最后这个期刊发不了，我们投更好的——让他看着我们发Nature子刊。去睡吧。" 这是你读博以来导师说的最提气的一句话。`,
      emotion: 'encouraging',
      options: [
        {
          id: 's06-adv-05-opt-a',
          text: '谢谢老师。那我先睡了，明天早上最终校对一遍就提交。',
          energyCost: 3,
          consistencyImpact: 3,
          nextNodeId: 's06-adv-06',
          characterReaction:
            '导师发了一个罕见的"加油"表情。然后他的头像也暗了下去。',
        },
        {
          id: 's06-adv-05-opt-b',
          text: '老师，谢谢您今晚陪我熬夜。您也早点休息。',
          energyCost: 3,
          consistencyImpact: 0,
          nextNodeId: 's06-adv-06',
          characterReaction:
            '导师没有回复关心的话。但你看到他把微信签名改成了一句英文："Peer review is not perfect, but science prevails."你猜这是发给你看的。',
        },
      ],
    },
    {
      id: 's06-adv-06',
      threadId: 'thread-advisor',
      speaker: 'narrator',
      text: `天快亮了。实验室的窗户透进来第一缕光。你的回复信静静地躺在电脑屏幕上，每一个字都经过了深夜的拷问。在过去的六个小时里，你和博后师兄讨论策略、和编辑暗中博弈、和导师在凌晨的微信里学会了什么叫"学术圈的战争"。你不知道这篇论文最终能不能发表。但你知道，今晚过后你不再是那个单纯写论文的博士生了。`,
      options: [],
    },
  ],

  // ==================== 社交地雷 ====================
  mines: [
    {
      id: 'mine-disrespect-reviewer',
      name: '回复信语气不敬',
      description: '在回复信或给编辑的通信中使用攻击性措辞，暗示审稿人不公正或有数据造假',
      triggerOptionIds: [
        's06-rev-02c-opt-c',
        's06-rev-03b-opt-b',
        's06-rev-03e-opt-b',
      ],
      triggerKeywords: ['数据造假', '审稿不公', '恶意审稿', '公报私仇'],
      severity: 3,
      consequence:
        '你的回复信措辞越过了学术礼仪的底线。编辑会将此视为对审稿流程的攻击，Reviewer 3会以"人格攻击"为由要求编辑直接拒稿。你不仅丢了这篇论文，还会被这个期刊列入非正式的黑名单。更糟的是，学术圈很小——你的"激进名声"会传开。',
      affectedCharacterIds: ['editor-hinting', 'reviewer-hostile'],
      attitudeShifts: [
        { characterId: 'editor-hinting', to: 'hostile' },
      ],
      forbiddenTopicAfter: '审稿人数据问题',
      triggered: false,
    },
    {
      id: 'mine-hint-reviewer-fraud',
      name: '暗戳戳提审稿人拒稿率',
      description: '通过间接方式向编辑暗示审稿人的旧论文有数据争议，试图借刀杀人',
      triggerOptionIds: [
        's06-rev-03d-opt-b',
      ],
      triggerKeywords: ['post-publication', 'data integrity', '数据争议', 'PubPeer'],
      severity: 2,
      consequence:
        `你在给编辑的通信中暗示了审稿人的数据争议。如果编辑顺着线索查下去，可能会换掉审稿人——但你的信息来源也可能被追查到。一旦被发现你通过非正规渠道获取了审稿人的身份信息，你自己也违反了学术伦理。这是一步险棋：赢了是"正义的揭露"，输了是"违规的泄密"。`,
      affectedCharacterIds: ['postdoc-limbo', 'reviewer-hostile'],
      attitudeShifts: [
        { characterId: 'postdoc-limbo', to: 'wary' },
      ],
      forbiddenTopicAfter: '审稿人旧文章',
      triggered: false,
    },
    {
      id: 'mine-cry-advisor',
      name: '向导师哭诉',
      description: '在导师面前表现出情绪崩溃或软弱，向导师示弱或抱怨',
      triggerOptionIds: [
        's06-adv-01-opt-c',
      ],
      triggerKeywords: ['写不动了', '太累了', '受不了了', '想放弃'],
      severity: 1,
      consequence:
        `你在导师面前表现了软弱。在这位海归严厉型导师的价值观里，"写不动"不是理由——他当年做博后的时候一个人写四篇论文还没有任何人帮忙。你的示弱不会换来同情，只会换来他对你抗压能力的质疑。以后分配任务时他可能会"照顾你"——把难的课题给别人做，把容易但没有成果的活给你。`,
      affectedCharacterIds: ['jieqing-returnee'],
      attitudeShifts: [
        { characterId: 'jieqing-returnee', to: 'wary' },
      ],
      forbiddenTopicAfter: '情绪状态',
      triggered: false,
    },
  ],

  // ==================== 信息差 ====================
  knowledgeItems: [
    {
      id: 'info-editor-knows',
      content:
        '编辑认识某杰青——他们在国际会议上见过几次面，属于同一个学术圈子。编辑发那封暗示邮件不完全是出于公正，也有维护"自己人"的成分。但这种关系不会被公开承认。',
      visibility: 'knownToOthersButNotUser',
      holders: ['editor-hinting', 'jieqing-returnee'],
      revealCondition: {
        type: 'option_selected',
        value: 's06-adv-02b-opt-b',
      },
      exposureConsequence:
        '知道编辑和导师认识后，你意识到编辑的"公正"是有偏向的——他在暗中帮你的导师。这不一定是坏事，但你需要明白：在学术圈里，没有真正中立的人。',
    },
    {
      id: 'info-postdoc-girlfriend',
      content:
        '博后师兄的女朋友是Reviewer 3（老板A）的在读博士生。博后关于A的所有信息都来自女朋友。如果这个信息源被追查到，女朋友会被开除，博后的学术生涯也会终结。',
      visibility: 'knownToOthersButNotUser',
      holders: ['postdoc-limbo'],
      revealCondition: {
        type: 'option_selected',
        value: 's06-rev-02b-opt-b',
      },
      exposureConsequence:
        '了解到信息的真实来源后，你意识到博后师兄帮你的风险远比你以为的大——他在用自己和女朋友的前途为你背书。你使用的每一条关于A的信息，都可能成为伤害他们的武器。',
    },
    {
      id: 'info-reviewer-identity',
      content:
        '某杰青和Reviewer 3（老板A）十年前在同一个研究方向上竞争，某杰青的论文先发表，A一直怀恨在心。此后A在审稿中多次打压某杰青组的论文。学术圈的一些人心知肚明，但没人公开说。',
      visibility: 'knownToOthersButNotUser',
      holders: ['jieqing-returnee', 'postdoc-limbo', 'editor-hinting'],
      revealCondition: {
        type: 'option_selected',
        value: 's06-adv-02b-opt-a',
      },
      exposureConsequence:
        '导师和审稿人之间的恩怨远不止这一次审稿。你的论文只是他们十年战争中的一个小战场。不管这次结果如何，只要你是某杰青的学生，你就永远是A的攻击目标。',
    },
  ],

  // ==================== 结局 ====================
  endings: [
    {
      id: 'ending-head-on-enemy',
      name: '硬刚成功但结死仇',
      description:
        `你的回复信措辞强硬，直接在回复中质疑了审稿意见的公正性。编辑被迫介入调查，Reviewer 3被换掉，论文在新审稿人的评审下最终接收。但Reviewer 3（老板A）知道了是你搞的——从此你在这个领域多了一个终身仇人。他的学术影响力足以在你未来的基金申请、论文审稿、职位竞争中持续给你制造麻烦。你赢了一场战斗，但开启了一场战争。`,
      conditions: {
        requiredMines: ['mine-disrespect-reviewer'],
        forbiddenMines: ['mine-cry-advisor'],
        minConsistency: 40,
      },
      priority: 4,
    },
    {
      id: 'ending-switch-reviewer-backdoor',
      name: '换审稿人被导师觉得走后门',
      description:
        '你通过编辑的暗示成功启动了换审稿人流程，论文最终在新审稿人的评审下顺利修改。但导师事后得知你绕过他直接和编辑沟通——在他看来，你利用了他和编辑的私人关系而不告诉他。他嘴上没说什么，但心里记下了你"不够透明"。以后涉及论文投稿的决策，他不再信任你的独立判断。',
      conditions: {
        forbiddenMines: ['mine-disrespect-reviewer', 'mine-cry-advisor'],
        minConsistency: 60,
        requiredExposures: ['info-editor-knows'],
      },
      priority: 3,
    },
    {
      id: 'ending-hint-backfire',
      name: '暗戳戳反击被发现声誉受损',
      description:
        `你通过暗示的方式向编辑传递了Reviewer 3旧论文的数据争议。编辑去查了——结果不仅Reviewer 3被调查，你的信息来源也被追查。博后师兄的女朋友因此受到了A的严厉质问，被迫承认了泄露信息的事实。博后师兄和女朋友分手了。你在学术圈的名声受损——"那个暗地里搞审稿人的学生"。论文最终发了，但代价远超一篇论文的价值。`,
      conditions: {
        requiredMines: ['mine-hint-reviewer-fraud'],
      },
      priority: 5,
    },
    {
      id: 'ending-advisor-steps-in',
      name: '导师出面欠人情',
      description:
        '你在回复信上焦头烂额之际，导师看不下去了，决定亲自出面。他给编辑写了一封私人邮件，以"通讯作者"身份表达了对审稿公正性的关切。编辑因为和导师的私交，迅速启动了换审稿人流程。论文顺利接收。但导师为此欠了编辑一个人情——在学术圈里，人情是要还的。下次编辑投来的论文要导师审稿时，导师必须"友好"一点。而你在导师心里的评价多了一条："遇到困难就需要我出面。"',
      conditions: {
        requiredMines: ['mine-cry-advisor'],
        forbiddenMines: ['mine-disrespect-reviewer'],
        minConsistency: 50,
      },
      priority: 2,
    },
  ],

  // ==================== 身后评价 ====================
  behindEvaluationTemplates: [
    {
      characterId: 'jieqing-returnee',
      characterName: '某杰青（海归严厉型）',
      channel: '某杰青在学术同行群里的消息',
      content:
        '论文大修终于搞完了。Reviewer 3还是那个老对手——十年了，他审我学生的论文比审他自己学生的还认真。我那个博三倒是扛住了，没崩溃。这一行，心理素质比学术能力重要。',
      tone: 'sarcastic',
      revealedInfo:
        '导师对你扛住压力的能力有了基本的认可——但他也在暗示，这种事以后还会发生。在你跟着他的每一天，你都是他和对手之间战争的前线士兵。',
    },
    {
      characterId: 'postdoc-limbo',
      characterName: '某博后（过渡迷茫型）',
      channel: '博后和女朋友的深夜电话',
      content:
        '今天帮师弟搞那个审稿的事，差点暴露了你告诉我的那些东西。以后这种事我不能再掺和了。你也小心点——你们老板最近审稿越来越离谱了，迟早要出事。',
      tone: 'negative',
      revealedInfo:
        '博后师兄为了帮你承受了巨大的风险。他的女朋友作为A的学生，处境比你想象的危险得多。你的每一个决定，都在间接影响着你看不见的人。',
    },
    {
      characterId: 'editor-hinting',
      characterName: '某编辑（暗示型）',
      channel: '编辑给主编的内部备忘录',
      content:
        '关于 Manuscript #XXXX 的审稿流程：我注意到 Reviewer 3 的审稿意见存在异常模式（引文集中度过高、攻击性措辞等）。第一作者通过正规渠道提出了concerns。经调查，我建议更换 Reviewer 3 并引入独立审稿人。请批准。附：我需声明，我与通讯作者存在学术交集，但本决定完全基于审稿质量的客观评估。',
      tone: 'neutral',
      revealedInfo:
        `编辑在帮你的同时也在保护自己——他主动向主编声明了和你导师的关系。在学术圈里，每个人都在走钢丝。编辑的"帮忙"不是无条件的善意，而是一个经过风险计算的决策。`,
    },
    {
      characterId: 'reviewer-hostile',
      characterName: '某审稿人（恶意打压型）',
      channel: '审稿人A在自己实验室组会上的发言',
      content:
        `最近审了某杰青组的一篇论文，方法论漏洞百出，创新性为零。我写了详细的审稿意见，希望作者能认真修改。不过以某杰青的风格，他的学生大概会来硬的。没关系，让编辑看看谁的学术观点更站得住脚。另外——你们谁的论文要投那个期刊的，先发给我看看，我帮你们把关。`,
      tone: 'sarcastic',
      revealedInfo:
        `审稿人A不仅不觉得自己的审稿有问题，还在利用审稿权力为自己的学生铺路。他在自己的实验室里建立了一个"审稿情报网"——了解竞争对手的研究进展，同时为自己的学生投稿提供信息优势。这不是个人恩怨，这是系统性的学术霸权。`,
    },
  ],
}
