import type { ScenarioData } from '../../types/scenario'

export const s08GrantEve: ScenarioData = {
  id: 's08',
  phase: 'postdoc',
  title: `青基答辩前夜`,
  subtitle: `大老板的最后一击`,
  description: `国自然青年基金答辩前一晚。你的PPT已经打磨了两周，信心满满准备明天的汇报。然而深夜11点，大老板突然要求大改PPT框架；隔壁办公室的讲师同事情绪崩溃向你求助；而你的博后师弟刚发现PPT里一张关键数据图有错误。三条线同时爆发，你只有一个晚上。`,
  briefing: `你是某高校的助理研究员，明天上午要参加国自然青年基金的现场答辩。这是你独立申请的第一个国家级项目，评审意见整体正面，通过概率很大——只要答辩不出差错。你的PPT已经反复修改了两周，今晚本打算早点休息。但深夜11点，大老板某长江突然打来电话，要求把PPT的技术路线整页重做；隔壁办公室的讲师同事在非升即走的压力下情绪崩溃，半夜敲你的门求助；而你信任的博后师弟刚刚发现PPT第7页的柱状图数据标注有一个不大不小的错误——改了安全但要重新排版，不改可能没人注意但万一被问到就是学术不端。你只有6个小时。`,
  difficulty: 4,
  estimatedMinutes: 12,
  playerRole: `助理研究员，青基答辩候选人`,
  setting: `高校科研楼办公室`,
  timeOfDay: `深夜11点`,
  atmosphere: `办公室只亮着你的台灯。走廊空荡荡的，偶尔传来隔壁办公室的低声啜泣。手机屏幕上大老板的未接来电不断闪烁。桌上散落着打印的PPT和红牛空罐。`,

  characters: [
    {
      id: 'changjiang-admin',
      name: `某长江（行政型）`,
      title: `教授/长江学者/课题组大老板`,
      age: 55,
      description: `你的大老板，长江学者。习惯深夜办公，控制欲极强，认为你的一切成果都是课题组的。`,
      avatar: 'changjiang-admin',
      personality: { faceWeight: 0.9, powerIndex: 95, grudgeMemory: 8, allianceFlexibility: 0.3, emotionalVolatility: 0.4 },
      socialParams: { approachability: 30, attentionSpan: 40, preferredTopics: ['课题进展', '经费', '发表计划'], forbiddenTopics: ['独立', '自主', '换组'], networkValue: 95, gossipFactor: 0.5, greetingStyle: 'dismissive', exitSignals: ['就这样吧', '明天再说——不，今晚改完'], memoryDuration: 24 },
      hiddenAgenda: `想通过修改你的PPT把自己课题组的整体方向植入进去，让评审专家看到"团队实力"而非你的个人能力。如果你拿到青基，经费管理权要在他手里。`,
      initialAttitude: 'neutral',
      role: 'antagonist',
      initialPosition: `电话那头/可能突然出现在办公室`,
      relationship: `课题组大老板`,
    },
    {
      id: 'lecturer-tenuretrack',
      name: `某讲师（崩溃型）`,
      title: `讲师/非升即走第五年`,
      age: 34,
      description: `隔壁办公室的讲师，非升即走最后一年，今晚情绪彻底崩溃。`,
      avatar: 'lecturer-tenuretrack',
      personality: { faceWeight: 0.3, powerIndex: 15, grudgeMemory: 2, allianceFlexibility: 0.9, emotionalVolatility: 0.9 },
      socialParams: { approachability: 90, attentionSpan: 20, preferredTopics: ['论文进度', '考核压力', '家庭'], forbiddenTopics: ['成功案例', '你的成果', '前途光明'], networkValue: 25, gossipFactor: 0.1, greetingStyle: 'casual', exitSignals: ['算了不打扰你了', '我没事...'], memoryDuration: 2 },
      hiddenAgenda: `今晚收到了系里的非正式通知——中期考核很可能不通过。他需要有人倾听，但也可能在情绪失控时说出一些不该说的话，比如大老板曾经挪用学生经费的事。`,
      initialAttitude: 'friendly',
      role: 'wildcard',
      initialPosition: `隔壁办公室/你的门口`,
      relationship: `同事/朋友`,
    },
    {
      id: 'postdoc-limbo',
      name: `某博后（细心型）`,
      title: `博士后`,
      age: 29,
      description: `你的博后师弟，做事极其细心，刚发现你PPT里的数据标注错误。`,
      avatar: 'postdoc-limbo',
      personality: { faceWeight: 0.2, powerIndex: 10, grudgeMemory: 1, allianceFlexibility: 0.7, emotionalVolatility: 0.3 },
      socialParams: { approachability: 85, attentionSpan: 95, preferredTopics: ['数据', '方法论', '统计'], forbiddenTopics: ['学术不端', '造假'], networkValue: 35, gossipFactor: 0.1, greetingStyle: 'warm', exitSignals: ['你决定吧', '我帮你改'], memoryDuration: 6 },
      hiddenAgenda: `真心想帮你，但也担心如果错误被发现会连累自己——那张图的原始数据是他处理的。他希望你改正，但不想把事情闹大。`,
      initialAttitude: 'friendly',
      role: 'ally',
      initialPosition: `微信消息/随后赶到办公室`,
      relationship: `博后师弟/数据协作者`,
    },
  ],

  threads: [
    { id: 'thread-boss', characterId: 'changjiang-admin', label: `大老板深夜要改PPT`, urgency: 0, status: 'active', currentNodeId: 's08-boss-01', lastInteractedAt: 0, autoMessages: [`手机又响了——大老板的来电`, `微信弹出消息："改了没？发我看看。"`], deteriorateEvent: `大老板直接出现在你办公室门口："你是不是没把我的话当回事？"` },
    { id: 'thread-colleague', characterId: 'lecturer-tenuretrack', label: `讲师崩溃求助`, urgency: 0, status: 'active', currentNodeId: 's08-col-01', lastInteractedAt: 0, autoMessages: [`隔壁传来压抑的哭声`, `某讲师又敲了敲你的门`], deteriorateEvent: `某讲师在走廊大声哭泣，声音传遍整层楼——如果被值班保安发现，事情会闹大。` },
    { id: 'thread-postdoc', characterId: 'postdoc-limbo', label: `博后发现PPT错误`, urgency: 0, status: 'active', currentNodeId: 's08-pd-01', lastInteractedAt: 0, autoMessages: [`微信消息："师兄，那个图你看了没？"`, `博后又发来一条："真的有问题，你再看看原始数据"`], deteriorateEvent: `博后在朋友圈发了一条意味深长的动态："做学术最怕的不是错误，是明知有错还要上场。"` },
  ],

  dialogNodes: [
    // === 大老板深夜要改PPT线 ===
    { id: 's08-boss-01', threadId: 'thread-boss', speaker: 'changjiang-admin', text: `手机响了。大老板的声音带着不容置疑的权威："我刚看了你的PPT，技术路线那页不行。评审专家里有两个是做系统生物学的，你得把咱们组的平台优势加进去。今晚改完发我。"`, emotion: `命令式`, options: [
      { id: 's08-boss-01-a', text: `立刻答应："好的老师，我马上改。"`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's08-boss-02', characterReaction: `大老板："嗯。改完先发我，我再提意见。别睡太晚——算了，改完再说。"` },
      { id: 's08-boss-01-b', text: `委婉解释："老师，这版已经改了两周了，框架动太大明天来不及消化..."`, energyCost: 12, consistencyImpact: 5, nextNodeId: 's08-boss-02', characterReaction: `大老板语气冷了："你是想拿青基还是不想？我说改就有我的道理。"` },
      { id: 's08-boss-01-c', text: `直接拒绝："老师，我觉得现在的版本逻辑更清楚，不太想大改了。"`, energyCost: 18, consistencyImpact: 10, triggersMine: 'mine-refuse-boss', nextNodeId: 's08-boss-02', characterReaction: `电话那头沉默了五秒。"你翅膀硬了？行，明天你自己上。出了问题别来找我。"` },
    ]},
    { id: 's08-boss-02', threadId: 'thread-boss', speaker: 'changjiang-admin', text: `大老板继续说："还有，答辩的时候记得提一句咱们组的国重项目。评审专家会看你背后有没有平台支撑。"`, options: [
      { id: 's08-boss-02-a', text: `答应提，但心里犯嘀咕——这不是在暗示青基经费要归组里管吗`, energyCost: 5, consistencyImpact: -5, nextNodeId: 's08-boss-03', characterReaction: `大老板："很好。你聪明，知道怎么做。"` },
      { id: 's08-boss-02-b', text: `说："老师，青基强调的是个人独立性，提太多团队会不会减分？"`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's08-boss-03', characterReaction: `大老板不耐烦："你才工作几年？评审怎么运作你比我清楚？"` },
    ]},
    { id: 's08-boss-03', threadId: 'thread-boss', speaker: 'changjiang-admin', text: `大老板话锋一转："对了，小张的事你听说了吗？就隔壁那个讲师，考核估计过不了。你跟他关系不错吧？劝劝他别闹，体面点走。"`, options: [
      { id: 's08-boss-03-a', text: `含糊应付："嗯，我有空跟他聊聊。"`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's08-boss-04', characterReaction: `大老板："别花太多精力在这种事上。你先把自己的PPT弄好。"` },
      { id: 's08-boss-03-b', text: `为同事说话："老师，他其实很努力，能不能再给一次机会？"`, energyCost: 12, consistencyImpact: 5, nextNodeId: 's08-boss-04', characterReaction: `大老板冷哼："制度就是制度。你管好自己就行。"` },
      { id: 's08-boss-03-c', text: `附和大老板："确实，他产出不够，也怨不得别人。"`, energyCost: 3, consistencyImpact: -10, nextNodeId: 's08-boss-04', characterReaction: `大老板："嗯，你比他看得清。行了，改PPT吧。"` },
    ]},
    { id: 's08-boss-04', threadId: 'thread-boss', speaker: 'changjiang-admin', text: `凌晨1点，你发了修改版。大老板秒回："第3页的图太小，字号不统一。另外'研究基础'那段把我的973项目加上。"`, options: [
      { id: 's08-boss-04-a', text: `继续改，把大老板的要求全部照做`, energyCost: 15, consistencyImpact: -5, nextNodeId: 's08-boss-05', characterReaction: `大老板："差不多了。但我还是觉得技术路线不够清晰。"` },
      { id: 's08-boss-04-b', text: `改了格式，但没加973项目："老师，评审可能会问这个项目和我的关系，我怕答不上来。"`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's08-boss-05', characterReaction: `大老板："你就说是前期基础。行吧，你自己把握。"` },
      { id: 's08-boss-04-c', text: `敷衍地说改了，实际没动——打算用自己的版本上场`, energyCost: 8, consistencyImpact: -5, triggersMine: 'mine-fake-revision', nextNodeId: 's08-boss-05', characterReaction: `大老板："嗯，发来我看看最终版。"——他一定会发现的。` },
    ]},
    { id: 's08-boss-05', threadId: 'thread-boss', speaker: 'changjiang-admin', text: `凌晨2点半。大老板发来语音："最后一版我看了，凑合吧。明天我不去现场了，你自己上。但记住——拿到经费，管理权放在组里。这是规矩。"`, options: [
      { id: 's08-boss-05-a', text: `回复："谢谢老师指导，我明白。"`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's08-boss-06', characterReaction: `大老板："嗯，早点睡。"（挂了电话）` },
      { id: 's08-boss-05-b', text: `鼓起勇气："老师，青基经费按规定应该由申请人自主管理。"`, energyCost: 18, consistencyImpact: 10, triggersMine: 'mine-refuse-boss', nextNodeId: 's08-boss-06', characterReaction: `大老板的语音条很长："你想好了？你现在的实验室、你的编制、你学生的名额，哪个不是我给的？"` },
    ]},
    { id: 's08-boss-06', threadId: 'thread-boss', speaker: 'changjiang-admin', text: `大老板挂了电话。屏幕上是改到面目全非的PPT和你原来精心打磨的版本。`, options: [
      { id: 's08-boss-06-a', text: `保存两个版本，明天到现场再决定用哪个`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's08-boss-07', characterReaction: `` },
      { id: 's08-boss-06-b', text: `删掉大老板版本，坚持用自己的`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's08-boss-07', characterReaction: `` },
    ]},
    { id: 's08-boss-07', threadId: 'thread-boss', speaker: 'narrator', text: `[大老板通话结束。你的能量在持续消耗。]`, options: [
      { id: 's08-boss-07-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's08-boss-08', characterReaction: `` },
    ]},
    { id: 's08-boss-08', threadId: 'thread-boss', speaker: 'narrator', text: `[窗外的天已经开始发白。]`, options: [
      { id: 's08-boss-08-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's08-boss-08', characterReaction: `` },
    ]},

    // === 讲师崩溃求助线 ===
    { id: 's08-col-01', threadId: 'thread-colleague', speaker: 'lecturer-tenuretrack', text: `凌晨12点，有人轻轻敲你的门。某讲师红着眼站在门口，声音发抖："你还没睡？能...能聊两句吗？"`, emotion: `崩溃边缘`, options: [
      { id: 's08-col-01-a', text: `让他进来坐下，倒杯水`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's08-col-02', characterReaction: `某讲师坐在椅子上，手一直在抖。` },
      { id: 's08-col-01-b', text: `说自己在改PPT，能不能明天再聊`, energyCost: 5, consistencyImpact: -5, triggersMine: 'mine-dismiss-colleague', nextNodeId: 's08-col-02', characterReaction: `某讲师愣了一下，嘴唇动了动："哦...好，那...明天吧。"他转身要走。` },
      { id: 's08-col-01-c', text: `注意到他状态不对，放下手头工作认真对待`, energyCost: 12, consistencyImpact: 5, nextNodeId: 's08-col-02', characterReaction: `某讲师红了眼眶，终于坐了下来。` },
    ]},
    { id: 's08-col-02', threadId: 'thread-colleague', speaker: 'lecturer-tenuretrack', text: `某讲师深吸一口气："系里今天下午通知我了...中期考核没过。我差一篇SCI。一篇！五年了，就差一篇..."他的声音开始颤抖。`, options: [
      { id: 's08-col-02-a', text: `安慰他："还有申诉机会，别放弃。"`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's08-col-03', characterReaction: `某讲师苦笑："申诉？你信？系主任——就是某长江，他早就想清理我这个方向了。"` },
      { id: 's08-col-02-b', text: `实际一点："你手上有在投的文章吗？能不能加急？"`, energyCost: 10, consistencyImpact: 0, nextNodeId: 's08-col-03', characterReaction: `某讲师："有一篇在三审，但审稿人要大修。我没精力改了..."` },
      { id: 's08-col-02-c', text: `沉默陪伴，什么都不说`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's08-col-03', characterReaction: `某讲师沉默了很久，然后轻声说："谢谢你愿意听。"` },
    ]},
    { id: 's08-col-03', threadId: 'thread-colleague', speaker: 'lecturer-tenuretrack', text: `某讲师突然压低声音，眼神变了："你知道吗...某长江去年挪用了学生的横向经费，买了那辆车。我有证据。他如果敢卡我，我就把这事捅出去。"`, emotion: `激动`, options: [
      { id: 's08-col-03-a', text: `震惊但冷静："你确定？这种事不能乱说。"`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's08-col-04', characterReaction: `某讲师从口袋掏出手机："报销单的照片，我都留着。"` },
      { id: 's08-col-03-b', text: `劝他别冲动："你现在情绪不稳，别做让自己后悔的事。"`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's08-col-04', characterReaction: `某讲师手在发抖："我知道...但我被逼到绝路了。"` },
      { id: 's08-col-03-c', text: `不想掺和："这是你和他的事，我不太方便参与。"`, energyCost: 5, consistencyImpact: -5, nextNodeId: 's08-col-04', characterReaction: `某讲师苦笑："是啊，你们都是'他的人'。"` },
    ]},
    { id: 's08-col-04', threadId: 'thread-colleague', speaker: 'lecturer-tenuretrack', text: `某讲师看着窗外，声音低沉："五年。我把最好的五年留在这里了。老婆带着孩子回了娘家，说我要是丢了工作就别回来。你说我还能去哪？"`, options: [
      { id: 's08-col-04-a', text: `认真帮他分析出路："企业、二本院校、博后都可以考虑。"`, energyCost: 12, consistencyImpact: 0, nextNodeId: 's08-col-05', characterReaction: `某讲师："企业不要35岁以上的，二本...我放不下面子。你说得对，但我今晚想不了这些。"` },
      { id: 's08-col-04-b', text: `说："你先休息，别一个人待着。要不要我陪你走走？"`, energyCost: 15, consistencyImpact: 5, nextNodeId: 's08-col-05', characterReaction: `某讲师眼眶红了："你明天还要答辩...算了，我不拖你了。"` },
      { id: 's08-col-04-c', text: `回到现实提醒他："现在最重要的是那篇三审的文章，你改不改？我可以帮你看看。"`, energyCost: 10, consistencyImpact: 0, nextNodeId: 's08-col-05', characterReaction: `某讲师犹豫了一下："你帮我看？...你自己还有PPT要改呢。"` },
    ]},
    { id: 's08-col-05', threadId: 'thread-colleague', speaker: 'lecturer-tenuretrack', text: `某讲师站起来擦了擦眼角："对不起...大半夜来打扰你。你明天好好答辩。我...我再想想吧。"`, options: [
      { id: 's08-col-05-a', text: `拍拍他肩膀："随时可以找我。你不是一个人。"`, energyCost: 5, consistencyImpact: 5, nextNodeId: 's08-col-06', characterReaction: `某讲师重重点了一下头，走了出去。走廊里传来关门声。` },
      { id: 's08-col-05-b', text: `说完保重之后，提醒他那个经费的事别冲动`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's08-col-06', characterReaction: `某讲师回头看了你一眼："放心，我没那么蠢。但如果他逼我...我也没什么好失去的了。"` },
    ]},
    { id: 's08-col-06', threadId: 'thread-colleague', speaker: 'lecturer-tenuretrack', text: `某讲师走后，你坐在椅子上发了一会儿呆。隔壁安静了。`, options: [
      { id: 's08-col-06-a', text: `回到PPT，继续工作`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's08-col-07', characterReaction: `` },
    ]},
    { id: 's08-col-07', threadId: 'thread-colleague', speaker: 'narrator', text: `[讲师已离开。你不确定他今晚会不会做什么傻事。]`, options: [
      { id: 's08-col-07-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's08-col-08', characterReaction: `` },
    ]},
    { id: 's08-col-08', threadId: 'thread-colleague', speaker: 'narrator', text: `[凌晨3点，隔壁的灯又亮了。至少他还在。]`, options: [
      { id: 's08-col-08-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's08-col-08', characterReaction: `` },
    ]},

    // === 博后发现PPT错误线 ===
    { id: 's08-pd-01', threadId: 'thread-postdoc', speaker: 'postdoc-limbo', text: `凌晨12点半，微信弹出消息。博后师弟发来一张截图——你PPT第7页的柱状图，其中一组数据的标注和原始数据对不上。师弟说："师兄，这个图的p值标注好像有问题。我刚核对了原始数据，应该是0.06，不是0.04。差别不大，但...严格来说这个结果不显著了。"`, options: [
      { id: 's08-pd-01-a', text: `马上打开原始数据核对`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's08-pd-02', characterReaction: `师弟："我把原始数据的截图发你了。确实对不上。"` },
      { id: 's08-pd-01-b', text: `先问师弟："这个图是你跑的？当时用的什么参数？"`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's08-pd-02', characterReaction: `师弟有点紧张："参数没问题，是后来作图的时候标注标错了...我也有责任。"` },
      { id: 's08-pd-01-c', text: `安抚师弟："0.04和0.06差别不大，可能就是保留位数的问题。"`, energyCost: 5, consistencyImpact: -10, triggersMine: 'mine-accept-error', nextNodeId: 's08-pd-02', characterReaction: `师弟沉默了一会儿："师兄...0.05是红线，这个你比我清楚。"` },
    ]},
    { id: 's08-pd-02', threadId: 'thread-postdoc', speaker: 'postdoc-limbo', text: `师弟发来完整的分析日志。确认了——正确的p值是0.058，PPT上标的是0.038。不是四舍五入的问题，是作图时复制粘贴搞错了一组数据。师弟说："改的话要重新跑一遍统计，重新排版那页。大概需要1-2个小时。"`, options: [
      { id: 's08-pd-02-a', text: `决定改正："安全第一，我们现在就改。你帮我重跑数据。"`, energyCost: 15, consistencyImpact: 10, nextNodeId: 's08-pd-03', characterReaction: `师弟松了一口气："好的师兄，我马上跑。数据在服务器上，半小时出结果。"` },
      { id: 's08-pd-02-b', text: `纠结："现在改的话，其他地方的逻辑也要跟着调...时间够吗？"`, energyCost: 10, consistencyImpact: 0, nextNodeId: 's08-pd-03', characterReaction: `师弟："如果只改图和标注，1小时够。但如果结论也要改...那确实很紧张。"` },
      { id: 's08-pd-03-skip', text: `决定不改："这只是辅助数据，不影响主要结论。评审不会细看这页。"`, energyCost: 5, consistencyImpact: -15, triggersMine: 'mine-accept-error', nextNodeId: 's08-pd-03', characterReaction: `师弟在微信那头打了很长一段话，又撤回了。最后只发了一个"好"。` },
    ]},
    { id: 's08-pd-03', threadId: 'thread-postdoc', speaker: 'postdoc-limbo', text: `师弟犹豫着又发了一条消息："师兄，还有一件事...这组数据在你去年发的那篇论文里也用了同一张图。如果答辩时改了PPT但论文里没改...会不会被注意到不一致？"`, options: [
      { id: 's08-pd-03-a', text: `深吸一口气："论文的事之后再说。先把PPT改对。"`, energyCost: 8, consistencyImpact: 5, nextNodeId: 's08-pd-04', characterReaction: `师弟："好。答辩完了我帮你联系编辑部发勘误。"` },
      { id: 's08-pd-03-b', text: `头皮发麻："那篇论文...审稿人当时也没看出来？"`, energyCost: 12, consistencyImpact: 0, nextNodeId: 's08-pd-04', characterReaction: `师弟："没有。但现在知道了就不一样了..."` },
      { id: 's08-pd-03-c', text: `说："论文和PPT用不同的图，答辩完再统一处理。"`, energyCost: 5, consistencyImpact: -5, nextNodeId: 's08-pd-04', characterReaction: `师弟没有回复。过了一会儿发了个"嗯"。` },
    ]},
    { id: 's08-pd-04', threadId: 'thread-postdoc', speaker: 'postdoc-limbo', text: `凌晨2点。师弟发来消息："数据重跑完了。新的图已经做好了，p=0.058，我标注成了'接近显著趋势(p=0.058)'。你看看措辞行不行？"`, options: [
      { id: 's08-pd-04-a', text: `认可师弟的方案，替换PPT中的图`, energyCost: 8, consistencyImpact: 5, nextNodeId: 's08-pd-05', characterReaction: `师弟："替换好了。排版我也调了，你检查一下。"` },
      { id: 's08-pd-04-b', text: `修改措辞为"边缘显著"，弱化不显著的印象`, energyCost: 5, consistencyImpact: -5, nextNodeId: 's08-pd-05', characterReaction: `师弟迟疑："'边缘显著'...这个说法在领域里有争议。但你定吧。"` },
    ]},
    { id: 's08-pd-05', threadId: 'thread-postdoc', speaker: 'postdoc-limbo', text: `师弟最后发了一条："师兄，不管怎样，明天加油。数据的事是我的疏忽，对不起。如果有人问到这个图，就说是数据更新后的修正版。"`, options: [
      { id: 's08-pd-05-a', text: `安慰师弟："不怪你，幸好你发现了。好好休息。"`, energyCost: 5, consistencyImpact: 5, nextNodeId: 's08-pd-06', characterReaction: `师弟："嗯。晚安师兄。"` },
      { id: 's08-pd-05-b', text: `认真说："以后所有数据出图前要双人核查。"`, energyCost: 5, consistencyImpact: 5, nextNodeId: 's08-pd-06', characterReaction: `师弟："一定。我已经在建核查清单了。"` },
    ]},
    { id: 's08-pd-06', threadId: 'thread-postdoc', speaker: 'narrator', text: `[数据问题暂时处理完毕。窗外的天际线开始发白。你已经精疲力尽。]`, options: [
      { id: 's08-pd-06-a', text: `看看时间——凌晨3点半。答辩是上午9点。`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's08-pd-07', characterReaction: `` },
    ]},
    { id: 's08-pd-07', threadId: 'thread-postdoc', speaker: 'narrator', text: `[你打开最终版PPT，看了一遍又一遍。这一夜，你到底失去了什么，得到了什么？]`, options: [
      { id: 's08-pd-07-a', text: `闭眼休息两小时`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's08-pd-08', characterReaction: `` },
    ]},
    { id: 's08-pd-08', threadId: 'thread-postdoc', speaker: 'narrator', text: `[闹钟响了。该出发了。]`, options: [
      { id: 's08-pd-08-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's08-pd-08', characterReaction: `` },
    ]},
  ],

  mines: [
    { id: 'mine-refuse-boss', name: `拒绝大老板`, description: `直接拒绝大老板的修改要求或经费安排，触怒了他`, triggerOptionIds: ['s08-boss-01-c', 's08-boss-05-b'], triggerKeywords: ['不改了', '我自己决定', '自主管理'], severity: 3, consequence: `大老板震怒，暗示会在今后的资源分配上"记住今晚的对话"`, affectedCharacterIds: ['changjiang-admin'], attitudeShifts: [{ characterId: 'changjiang-admin', to: 'hostile' }], forbiddenTopicAfter: `团队支持`, triggered: false },
    { id: 'mine-dismiss-colleague', name: `敷衍崩溃讲师`, description: `在同事情绪崩溃时敷衍拒绝，可能导致严重后果`, triggerOptionIds: ['s08-col-01-b'], triggerKeywords: ['明天再说', '没空', '我很忙'], severity: 1, consequence: `某讲师独自回到办公室，你不确定他今晚会做什么`, affectedCharacterIds: ['lecturer-tenuretrack'], attitudeShifts: [{ characterId: 'lecturer-tenuretrack', to: 'wary' }], triggered: false },
    { id: 'mine-accept-error', name: `带着错误数据上场`, description: `明知PPT数据有误仍决定不修改，留下学术不端隐患`, triggerOptionIds: ['s08-pd-01-c', 's08-pd-03-skip'], triggerKeywords: ['差别不大', '不影响', '没人看'], severity: 2, consequence: `你带着错误的p值上了答辩台。也许没人注意——但你自己知道。`, affectedCharacterIds: ['postdoc-limbo'], attitudeShifts: [{ characterId: 'postdoc-limbo', to: 'wary' }], forbiddenTopicAfter: `数据严谨性`, triggered: false },
  ],

  knowledgeItems: [
    { id: 'info-boss-embezzle', content: `大老板曾挪用学生横向经费购买私人物品`, visibility: 'knownToOthersButNotUser', holders: ['lecturer-tenuretrack'] },
    { id: 'info-lecturer-doomed', content: `讲师的考核结果其实已经定了，系里只是走流程`, visibility: 'knownToOthersButNotUser', holders: ['changjiang-admin'], exposureConsequence: `你会意识到大老板让你"劝劝他"不是善意，是想让他安静走人` },
    { id: 'info-reviewer-identity', content: `明天的答辩评审组里有一位是大老板的师兄`, visibility: 'knownToOthersButNotUser', holders: ['changjiang-admin'], exposureConsequence: `你会明白大老板坚持改PPT加团队内容的真正原因——那位评审会"配合"` },
    { id: 'info-data-in-paper', content: `那个错误的数据图同样出现在你已发表的论文中`, visibility: 'aboutToExpose', holders: ['postdoc-limbo'], revealCondition: { type: 'time_elapsed', value: 180 } },
  ],

  endings: [
    { id: 'ending-puppet-win', name: `拿到青基·失去自主`, description: `你照大老板的要求改了PPT，答辩顺利通过——评审组里大老板的师兄果然投了赞成票。青基到手，但经费管理权归了课题组。你用一个国家级项目换来了三年的"高级打工人"身份。大老板在组会上说："青基是团队的成果。"`, conditions: { forbiddenMines: ['mine-refuse-boss', 'mine-accept-error'] }, priority: 2 },
    { id: 'ending-integrity-risk', name: `带伤上阵·定时炸弹`, description: `你没改那张图就上了答辩台。评审没人注意到p值的问题，青基通过了。但三个月后，一个同行在复现你的工作时发现了数据不一致。一封质疑邮件发到了期刊编辑部和你的单位学术委员会。这颗定时炸弹终于爆了。`, conditions: { requiredMines: ['mine-accept-error'] }, priority: 4 },
    { id: 'ending-independent-hard', name: `独立但孤立`, description: `你拒绝了大老板的控制，坚持用自己的PPT版本。答辩发挥正常，但没有大老板的"运作"，结果变成了候补。更麻烦的是，回去后大老板开始在资源分配上处处刁难你——实验室空间缩小，研究生名额被砍。你赢了一场战役，但战争才刚开始。`, conditions: { requiredMines: ['mine-refuse-boss'], forbiddenMines: ['mine-accept-error'] }, priority: 3 },
    { id: 'ending-balanced-survivor', name: `疲惫但完整`, description: `你在这个漫长的夜晚里做了所有正确的事：认真对待同事的崩溃，修正了数据错误，在大老板的压力下保持了底线但没有撕破脸。答辩结果未知，但你带着一份干净的PPT和清醒的良心走进了会场。不管结果如何，你今晚没有对不起任何人——包括你自己。`, conditions: { minConsistency: 75, forbiddenMines: ['mine-accept-error', 'mine-dismiss-colleague'] }, priority: 1 },
  ],

  behindEvaluationTemplates: [
    { characterId: 'changjiang-admin', characterName: `某长江（行政型）`, channel: `和师兄（评审专家）电话`, content: `"那个小年轻不太听话。不过你明天该怎么评就怎么评吧——我不想落人口实。年轻人嘛，磨一磨就好了。"`, tone: 'neutral', revealedInfo: `大老板其实不会因为你的反抗而真的搞你——他更怕留下把柄` },
    { characterId: 'lecturer-tenuretrack', characterName: `某讲师（崩溃型）`, channel: `凌晨4点的日记`, content: `"今晚去找了隔壁的人聊了聊。他明天还要答辩，还是陪我说了很久。这个世界还是有好人的。那些证据...先留着吧。不到万不得已不用。"`, tone: 'positive', revealedInfo: `讲师最终没有冲动举报——你的陪伴让他冷静了下来` },
    { characterId: 'postdoc-limbo', characterName: `某博后（细心型）`, channel: `给女朋友的微信`, content: `"今晚发现一个数据错误，还好师兄同意改了。有些人可能会选择装不知道，但他没有。跟对人了。"`, tone: 'positive', revealedInfo: `师弟在纠结要不要告诉你之前犹豫了三个小时——他怕你怪他` },
    { characterId: 'changjiang-admin', characterName: `某长江（行政型）`, channel: `第二天组会上`, content: `"某某的青基答辩是我们组的大事。PPT是我亲自把关的，大家要向他学习——当然，成果是团队的。"`, tone: 'sarcastic', revealedInfo: `不管你用了谁的版本，大老板都会对外宣称是他指导的` },
  ],
}
