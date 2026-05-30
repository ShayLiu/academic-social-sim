import type { ScenarioData } from '../../types/scenario'

export const s07JobTalk: ScenarioData = {
  id: 's07',
  phase: 'postdoc',
  title: '教职面试',
  subtitle: `系主任的陷阱`,
  description: `某985大学副教授岗位面试。你精心准备了试讲和未来规划，却不知这是一个萝卜坑——人选早已内定，面试不过是走过场。系主任暗示你可以接一个冷门方向，而另一位副教授私下拉拢你当接班人。`,
  briefing: `你是某课题组的博士后，今天来参加一所985大学的副教授岗位面试。你的简历不错：三篇一作顶刊、一个省基金、两年博后经历。但你不知道的是：这个岗位人选早已内定给系主任的学生，你只是来"陪跑"的。更微妙的是，面试委员中的某副教授正在策划跳槽，他在物色一个能接手他课题组的年轻人——而你恰好符合条件。系主任某万人则想趁机把一个冷门方向甩给外人，减轻系里的考核压力。你的目标：在这场注定不公平的面试中，找到对自己最有利的出路。`,
  difficulty: 4,
  estimatedMinutes: 15,
  playerRole: `某博后，面试副教授岗位`,
  setting: `某985大学系会议室`,
  timeOfDay: `上午10点`,
  atmosphere: `会议室很正式，长桌一侧坐着四位面试官。你的简历被放大印刷成A3挂在白板上。系主任居中而坐，笑容可掬但眼神锐利。`,

  characters: [
    {
      id: 'wanren-network',
      name: `某万人（人脉型）`,
      title: `教授/系主任`,
      age: 50,
      description: `系主任，掌控招聘全局。这个岗位其实已经内定给他的学生。`,
      avatar: 'wanren-network',
      personality: { faceWeight: 0.8, powerIndex: 88, grudgeMemory: 5, allianceFlexibility: 0.7, emotionalVolatility: 0.2 },
      socialParams: { approachability: 65, attentionSpan: 90, preferredTopics: ['学科布局', '人才规划', '团队建设'], forbiddenTopics: ['萝卜坑', '公平性', '暗箱操作'], networkValue: 90, gossipFactor: 0.4, greetingStyle: 'formal', exitSignals: ['我们综合考虑', '后续会通知'], memoryDuration: 12 },
      hiddenAgenda: `岗位已内定给自己的学生，面试是走形式。但如果能趁机让外人接下冷门方向，也不错。`,
      initialAttitude: 'neutral',
      role: 'antagonist',
      initialPosition: `主位居中`,
      relationship: `面试委员会主席`,
    },
    {
      id: 'jieqing-local',
      name: `某杰青（本土温和型）`,
      title: `教授/杰青`,
      age: 46,
      description: `面试委员，学术能力强，为人温和，按规矩打分。`,
      avatar: 'jieqing-local',
      personality: { faceWeight: 0.5, powerIndex: 75, grudgeMemory: 3, allianceFlexibility: 0.6, emotionalVolatility: 0.3 },
      socialParams: { approachability: 75, attentionSpan: 100, preferredTopics: ['研究方法', '学术前沿', '国际合作'], forbiddenTopics: ['人事纠纷', '帽子评比'], networkValue: 70, gossipFactor: 0.2, greetingStyle: 'warm', exitSignals: ['祝你顺利', '有机会再交流'], memoryDuration: 6 },
      hiddenAgenda: `认真评审，但知道结果已定，不会出头反对系主任。`,
      initialAttitude: 'friendly',
      role: 'neutral',
      initialPosition: `左侧座位`,
      relationship: `面试委员`,
    },
    {
      id: 'assocprof-detail',
      name: `某副教授（细致型）`,
      title: `副教授/长聘`,
      age: 37,
      description: `已拿长聘，正在策划跳槽到另一所大学。需要找人接手课题组。`,
      avatar: 'assocprof-detail',
      personality: { faceWeight: 0.4, powerIndex: 45, grudgeMemory: 2, allianceFlexibility: 0.8, emotionalVolatility: 0.4 },
      socialParams: { approachability: 80, attentionSpan: 80, preferredTopics: ['课题方向', '经费来源', '学生培养'], forbiddenTopics: ['跳槽', '离开'], networkValue: 55, gossipFactor: 0.3, greetingStyle: 'casual', exitSignals: ['私下聊聊', '加个微信'], memoryDuration: 8 },
      hiddenAgenda: `想找一个能力不错的年轻人接手自己的课题组和学生，自己好抽身跳槽。`,
      initialAttitude: 'friendly',
      role: 'wildcard',
      initialPosition: `右侧座位`,
      relationship: `面试委员/潜在拉拢者`,
    },
    {
      id: 'secretary-process',
      name: `某秘书（流程型）`,
      title: `系办秘书`,
      age: 45,
      description: `负责记录面试过程，掌握推荐信内容。`,
      avatar: 'secretary-process',
      personality: { faceWeight: 0.3, powerIndex: 20, grudgeMemory: 1, allianceFlexibility: 0.3, emotionalVolatility: 0.1 },
      socialParams: { approachability: 50, attentionSpan: 60, preferredTopics: ['流程', '材料', '时间安排'], forbiddenTopics: ['评审细节', '推荐信'], networkValue: 30, gossipFactor: 0.6, greetingStyle: 'formal', exitSignals: ['时间到了', '下一位'], memoryDuration: 3 },
      hiddenAgenda: `只想按流程完成工作，但不小心向你透露了推荐信的存在。`,
      initialAttitude: 'neutral',
      role: 'neutral',
      initialPosition: `角落记录席`,
      relationship: `记录员`,
    },
  ],

  threads: [
    { id: 'thread-presentation', characterId: 'jieqing-local', label: `试讲问答`, urgency: 0, status: 'active', currentNodeId: 's07-pres-01', lastInteractedAt: 0, autoMessages: [`某杰青看了看手表，似乎在等你的回答`, `某杰青轻轻敲了敲桌面`], deteriorateEvent: `某杰青收起论文说："时间有限，我们跳过这个环节吧。"` },
    { id: 'thread-chair', characterId: 'wanren-network', label: `系主任单独谈话`, urgency: 0, status: 'active', currentNodeId: 's07-chair-01', lastInteractedAt: 0, autoMessages: [`某万人朝你招了招手`, `系主任在走廊等你，表情意味深长`], deteriorateEvent: `某万人失去耐心，对秘书说："通知下一位吧。"` },
    { id: 'thread-assoc', characterId: 'assocprof-detail', label: `副教授私下拉拢`, urgency: 0, status: 'active', currentNodeId: 's07-assoc-01', lastInteractedAt: 0, autoMessages: [`某副教授给你递了张名片`, `某副教授朝你使了个眼色`], deteriorateEvent: `某副教授叹气收起名片，决定找下一个人选。` },
  ],

  // 对话节点
  dialogNodes: [
    // === 试讲问答线 ===
    { id: 's07-pres-01', threadId: 'thread-presentation', speaker: 'jieqing-local', text: `某杰青翻开你的简历，微笑着说："请先用5分钟介绍一下你的研究方向和未来规划。"`, emotion: `温和`, options: [
      { id: 's07-pres-01-a', text: `详细介绍自己的核心方向，强调国际前沿性`, energyCost: 10, consistencyImpact: 0, nextNodeId: 's07-pres-02', characterReaction: `某杰青频频点头："方向不错，和我们系的布局有一定互补。"` },
      { id: 's07-pres-01-b', text: `刻意往系里已有方向靠，强调"配合团队"`, energyCost: 8, consistencyImpact: -5, riskTag: `可能显得没主见`, nextNodeId: 's07-pres-02', characterReaction: `某杰青皱了皱眉："嗯...你说的这些我们已经有人在做了。"` },
      { id: 's07-pres-01-c', text: `提及冷门方向，表示愿意探索新领域`, energyCost: 5, consistencyImpact: 0, triggersMine: 'mine-cold-direction', nextNodeId: 's07-pres-02', characterReaction: `系主任突然来了精神："哦？你对这个方向感兴趣？"` },
    ]},
    { id: 's07-pres-02', threadId: 'thread-presentation', speaker: 'jieqing-local', text: `某杰青继续问："你目前在审的文章有几篇？预计什么时候出结果？"`, options: [
      { id: 's07-pres-02-a', text: `如实说：两篇在审，一篇刚投`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-pres-03', characterReaction: `某杰青点头："正常节奏。"` },
      { id: 's07-pres-02-b', text: `夸大进度：三篇都快接收了`, energyCost: 8, consistencyImpact: -10, riskTag: `可能穿帮`, nextNodeId: 's07-pres-03', characterReaction: `某杰青翻了翻材料，没说什么。` },
    ]},
    { id: 's07-pres-03', threadId: 'thread-presentation', speaker: 'jieqing-local', text: `某杰青问了一个技术细节："你论文里用的那个模型，和某某组2024年的工作有什么区别？"`, options: [
      { id: 's07-pres-03-a', text: `自信回答，详细解释技术差异`, energyCost: 12, consistencyImpact: 5, nextNodeId: 's07-pres-04', characterReaction: `某杰青满意地点头："功底不错。"` },
      { id: 's07-pres-03-b', text: `承认不太了解那篇，但解释自己的创新点`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's07-pres-04', characterReaction: `某杰青："嗯，回去可以读一下，思路类似但方法不同。"` },
      { id: 's07-pres-03-c', text: `紧张地支吾，说"我回去再确认一下"`, energyCost: 15, consistencyImpact: -5, nextNodeId: 's07-pres-04', characterReaction: `某杰青没说什么，在评分表上写了几笔。` },
    ]},
    { id: 's07-pres-04', threadId: 'thread-presentation', speaker: 'wanren-network', text: `系主任插话："你对教学有什么想法？我们系本科课程压力比较大。"`, options: [
      { id: 's07-pres-04-a', text: `表示愿意承担教学，强调教研结合`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's07-pres-05', characterReaction: `系主任："态度不错。不过我们这边，新人前三年教学工作量会比较重。"` },
      { id: 's07-pres-04-b', text: `委婉表示希望以科研为主`, energyCost: 10, consistencyImpact: 0, nextNodeId: 's07-pres-05', characterReaction: `系主任笑了笑："年轻人都这么想，但现实...你懂的。"` },
    ]},
    { id: 's07-pres-05', threadId: 'thread-presentation', speaker: 'jieqing-local', text: `某杰青最后问："你对非升即走怎么看？我们这边是6年周期。"`, options: [
      { id: 's07-pres-05-a', text: `表示有信心，展示自己的成果积累`, energyCost: 8, consistencyImpact: 5, nextNodeId: 's07-pres-06', characterReaction: `某杰青："自信是好事，但要了解具体考核标准再做决定。"` },
      { id: 's07-pres-05-b', text: `说想了解具体考核标准再决定`, energyCost: 5, consistencyImpact: 0, triggersMine: 'mine-hesitate', nextNodeId: 's07-pres-06', characterReaction: `系主任眉头微皱："我们需要确定性强的候选人。"` },
    ]},
    { id: 's07-pres-06', threadId: 'thread-presentation', speaker: 'secretary-process', text: `秘书小声提醒："面试时间到了。"然后不经意间说了句："您的推荐信我们收到了，材料很...完整。"`, options: [
      { id: 's07-pres-06-a', text: `礼貌点头，不追问推荐信内容`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's07-pres-07', characterReaction: `秘书低下头继续记录。` },
      { id: 's07-pres-06-b', text: `试探："请问推荐信评价如何？"`, energyCost: 10, consistencyImpact: -5, nextNodeId: 's07-pres-07', characterReaction: `秘书尴尬地看了系主任一眼："这个...不方便透露。"` },
      { id: 's07-pres-06-c', text: `直接说知道推荐信里有些负面内容`, energyCost: 15, consistencyImpact: -15, triggersMine: 'mine-recommendation', nextNodeId: 's07-pres-07', characterReaction: `全场沉默。系主任放下笔，表情变了。` },
    ]},
    { id: 's07-pres-07', threadId: 'thread-presentation', speaker: 'jieqing-local', text: `某杰青最后总结："今天的面试就到这里，你还有什么想问我们的吗？"`, options: [
      { id: 's07-pres-07-a', text: `问实验室空间和启动经费`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-pres-08', characterReaction: `某杰青："这些入职后会安排，标准配置。"` },
      { id: 's07-pres-07-b', text: `问团队合作机会`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-pres-08', characterReaction: `某副教授突然来了兴趣："我们可以私下聊聊合作的事。"` },
      { id: 's07-pres-07-c', text: `说没有问题了，感谢各位`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's07-pres-08', characterReaction: `某杰青微笑点头："好的，我们会尽快通知结果。"` },
    ]},
    { id: 's07-pres-08', threadId: 'thread-presentation', speaker: 'jieqing-local', text: `面试正式环节结束。某杰青起身和你握手："表现不错，等通知吧。"`, options: [
      { id: 's07-pres-08-a', text: `感谢并礼貌告辞`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's07-pres-08', characterReaction: `某杰青点头微笑。` },
    ]},

    // === 系主任单独谈话线 ===
    { id: 's07-chair-01', threadId: 'thread-chair', speaker: 'wanren-network', text: `面试结束后，系主任在走廊叫住你："年轻人，有空聊两句？"他把你带到办公室。`, options: [
      { id: 's07-chair-01-a', text: `欣然前往`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-chair-02', characterReaction: `系主任关上门，给你倒了杯茶。` },
      { id: 's07-chair-01-b', text: `说还有事，能否改天`, energyCost: 8, consistencyImpact: -5, nextNodeId: 's07-chair-02', characterReaction: `系主任脸色微变："几分钟就好。"` },
    ]},
    { id: 's07-chair-02', threadId: 'thread-chair', speaker: 'wanren-network', text: `系主任开门见山："今天面试的这个岗，竞争很激烈。但我们系还有一个方向——量子信息与生物交叉，你了解吗？"`, options: [
      { id: 's07-chair-02-a', text: `坦诚说不太了解这个方向`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-chair-03', characterReaction: `系主任："没关系，就是需要有人开拓。经费充足，而且...竞争小。"` },
      { id: 's07-chair-02-b', text: `表示很感兴趣，愿意了解`, energyCost: 5, consistencyImpact: -5, triggersMine: 'mine-cold-direction', nextNodeId: 's07-chair-03', characterReaction: `系主任露出满意的笑容："很好，我就喜欢有开拓精神的年轻人。"` },
      { id: 's07-chair-02-c', text: `委婉表示想专注自己的方向`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's07-chair-03', characterReaction: `系主任表情冷淡了几分："年轻人，有时候灵活一点路更宽。"` },
    ]},
    { id: 's07-chair-03', threadId: 'thread-chair', speaker: 'wanren-network', text: `系主任靠在椅背上："实话跟你说，今天那个岗位...有些情况你可能不了解。但如果你愿意接这个新方向，入职的事我可以很快安排。"`, options: [
      { id: 's07-chair-03-a', text: `追问"什么情况"`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's07-chair-04', characterReaction: `系主任笑而不语："你是聪明人，不用我多说。"` },
      { id: 's07-chair-03-b', text: `表示需要考虑`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-chair-04', characterReaction: `系主任："可以，但别太久。这个机会窗口不大。"` },
      { id: 's07-chair-03-c', text: `直接答应接新方向`, energyCost: 5, consistencyImpact: -10, nextNodeId: 's07-chair-04', characterReaction: `系主任拍了拍你的肩："很好，我让秘书准备合同。"` },
    ]},
    { id: 's07-chair-04', threadId: 'thread-chair', speaker: 'wanren-network', text: `系主任站起来："还有一件事——你的推荐信里，有位推荐人的措辞...怎么说呢，不算特别正面。这个在评审中会有影响。但如果走这个新方向，就不用过那个评审委员会了。"`, options: [
      { id: 's07-chair-04-a', text: `震惊但保持冷静："能具体说说吗？"`, energyCost: 12, consistencyImpact: 0, nextNodeId: 's07-chair-05', characterReaction: `系主任摇头："不方便。总之你知道就好。"` },
      { id: 's07-chair-04-b', text: `直接说知道是谁写的负面评价`, energyCost: 15, consistencyImpact: -10, triggersMine: 'mine-recommendation', nextNodeId: 's07-chair-05', characterReaction: `系主任沉默了几秒："你知道得挺多。"` },
      { id: 's07-chair-04-c', text: `不纠结推荐信，问新方向的具体条件`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's07-chair-05', characterReaction: `系主任恢复笑容："聪明人。条件不会差——启动经费50万，博士名额第二年给。"` },
    ]},
    { id: 's07-chair-05', threadId: 'thread-chair', speaker: 'wanren-network', text: `系主任看了看表："我还有个会。你考虑一下，这周内给我答复。走正常渠道那个岗位，我不能保证结果...你明白的。"`, options: [
      { id: 's07-chair-05-a', text: `感谢系主任的坦诚，说会认真考虑`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-chair-06', characterReaction: `系主任握了握你的手："聪明人做聪明选择。"` },
      { id: 's07-chair-05-b', text: `问能不能两个选项都保留`, energyCost: 8, consistencyImpact: -5, nextNodeId: 's07-chair-06', characterReaction: `系主任笑了："不行。你只能选一条路。"` },
    ]},
    { id: 's07-chair-06', threadId: 'thread-chair', speaker: 'wanren-network', text: `你走出系主任办公室，手心全是汗。`, options: [
      { id: 's07-chair-06-a', text: `深呼吸，决定先和副教授聊聊`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's07-chair-07', characterReaction: `` },
    ]},
    { id: 's07-chair-07', threadId: 'thread-chair', speaker: 'narrator', text: `[系主任谈话结束]`, options: [
      { id: 's07-chair-07-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's07-chair-07', characterReaction: `` },
    ]},

    // === 副教授私下拉拢线 ===
    { id: 's07-assoc-01', threadId: 'thread-assoc', speaker: 'assocprof-detail', text: `面试后，某副教授在楼道追上你："嘿，今天表现不错。有空吗？请你喝杯咖啡。"`, options: [
      { id: 's07-assoc-01-a', text: `欣然接受`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-assoc-02', characterReaction: `某副教授带你去了楼下的咖啡厅。` },
      { id: 's07-assoc-01-b', text: `说赶时间，能否微信聊`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's07-assoc-02', characterReaction: `某副教授："也行，加个微信，我有事想和你聊。"` },
    ]},
    { id: 's07-assoc-02', threadId: 'thread-assoc', speaker: 'assocprof-detail', text: `某副教授开门见山："我明年可能要离开这里。我的课题组有3个在读博士，需要有人接手。你的方向和我很接近。"`, options: [
      { id: 's07-assoc-02-a', text: `惊讶："您要走？那课题组怎么办？"`, energyCost: 8, consistencyImpact: 0, nextNodeId: 's07-assoc-03', characterReaction: `某副教授："所以我在找合适的人。你如果来，可以直接接手我的一个国自然面上项目。"` },
      { id: 's07-assoc-02-b', text: `感兴趣："具体是什么条件？"`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-assoc-03', characterReaction: `某副教授笑了："务实，我喜欢。"` },
      { id: 's07-assoc-02-c', text: `警惕："这个事系主任知道吗？"`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's07-assoc-03', characterReaction: `某副教授表情微变："暂时不要提。这是我们之间的事。"` },
    ]},
    { id: 's07-assoc-03', threadId: 'thread-assoc', speaker: 'assocprof-detail', text: `某副教授低声说："条件很直接——你入职后名义上独立，但实际接管我的学生和项目。系里会给你算成果。我走之前帮你搞定一篇大文章。"`, options: [
      { id: 's07-assoc-03-a', text: `听起来不错，但问"这样做合规吗？"`, energyCost: 8, consistencyImpact: 5, nextNodeId: 's07-assoc-04', characterReaction: `某副教授："学术界哪有绝对合规的事？但对你来说稳赚不赔。"` },
      { id: 's07-assoc-03-b', text: `直接答应：这个方案对双方都好`, energyCost: 5, consistencyImpact: -5, nextNodeId: 's07-assoc-04', characterReaction: `某副教授满意："等面试结果出来我们再细谈。"` },
      { id: 's07-assoc-03-c', text: `委婉拒绝：想从零开始建自己的组`, energyCost: 10, consistencyImpact: 5, nextNodeId: 's07-assoc-04', characterReaction: `某副教授有点失望："也行，但你可能会错过一个快车道。"` },
    ]},
    { id: 's07-assoc-04', threadId: 'thread-assoc', speaker: 'assocprof-detail', text: `某副教授补充："还有一件事——系主任可能会给你推荐一个冷门方向。那个坑别跳，考核指标定得很死，三年内没人能达标。他就是想找个外人背锅。"`, options: [
      { id: 's07-assoc-04-a', text: `感谢提醒，问还有什么需要注意的`, energyCost: 5, consistencyImpact: 0, nextNodeId: 's07-assoc-05', characterReaction: `某副教授："别信系主任的承诺，他对外人从来不兑现。"` },
      { id: 's07-assoc-04-b', text: `表示已经差不多答应了冷门方向`, energyCost: 12, consistencyImpact: -5, nextNodeId: 's07-assoc-05', characterReaction: `某副教授瞪大眼："你疯了？赶紧撤回！"` },
    ]},
    { id: 's07-assoc-05', threadId: 'thread-assoc', speaker: 'assocprof-detail', text: `某副教授站起来："考虑清楚。我这边的机会也不会等太久——其他几个候选人下周也要来面试。先走了，保持联系。"`, options: [
      { id: 's07-assoc-05-a', text: `握手告别，说会尽快决定`, energyCost: 3, consistencyImpact: 0, nextNodeId: 's07-assoc-06', characterReaction: `某副教授拍了拍你肩膀走了。` },
    ]},
    { id: 's07-assoc-06', threadId: 'thread-assoc', speaker: 'narrator', text: `[副教授谈话结束。你现在面临三个选择：走正常面试等结果、接系主任的冷门方向、或者当副教授的接盘侠。]`, options: [
      { id: 's07-assoc-06-a', text: `继续`, energyCost: 0, consistencyImpact: 0, nextNodeId: 's07-assoc-06', characterReaction: `` },
    ]},
  ],

  mines: [
    { id: 'mine-cold-direction', name: `接冷门方向`, description: `接受系主任推荐的冷门方向，显得好骗`, triggerOptionIds: ['s07-chair-02-b', 's07-pres-01-c'], triggerKeywords: ['量子信息', '新方向', '愿意尝试'], severity: 2, consequence: `你被标记为"好骗的外来人"，系主任已经开始拟合同了`, affectedCharacterIds: ['assocprof-detail'], attitudeShifts: [{ characterId: 'assocprof-detail', to: 'wary' }], forbiddenTopicAfter: `冷门方向的好处`, triggered: false },
    { id: 'mine-hesitate', name: `要考虑显得没诚意`, description: `对非升即走条件犹豫，显得没诚意`, triggerOptionIds: ['s07-pres-05-b'], triggerKeywords: ['考虑考虑', '再想想', '不确定'], severity: 1, consequence: `系主任在评分表备注："诚意不足"`, affectedCharacterIds: ['wanren-network'], attitudeShifts: [{ characterId: 'wanren-network', to: 'wary' }], triggered: false },
    { id: 'mine-recommendation', name: `暴露知道推荐信内容`, description: `你不应该知道推荐信的内容，暴露了信息来源`, triggerOptionIds: ['s07-pres-06-c', 's07-chair-04-b'], triggerKeywords: ['推荐信', '负面评价', '知道内容'], severity: 3, consequence: `全场意识到有人向你泄露了机密信息，秘书极度紧张`, affectedCharacterIds: ['wanren-network', 'secretary-process'], attitudeShifts: [{ characterId: 'wanren-network', to: 'hostile' }, { characterId: 'secretary-process', to: 'hostile' }], triggered: false },
  ],

  knowledgeItems: [
    { id: 'info-rigged', content: `这个岗位已经内定给系主任的学生，面试是走形式`, visibility: 'knownToOthersButNotUser', holders: ['wanren-network', 'secretary-process'] },
    { id: 'info-assoc-leaving', content: `某副教授正在策划跳槽，需要找人接手课题组`, visibility: 'knownToOthersButNotUser', holders: ['assocprof-detail'] },
    { id: 'info-bad-reference', content: `你的一封推荐信中有负面评价`, visibility: 'knownToOthersButNotUser', holders: ['wanren-network', 'secretary-process'], exposureConsequence: `你会质疑谁写了负面评价` },
    { id: 'info-new-position', content: `系里明年会新增一个正式编制，不需要走非升即走`, visibility: 'aboutToExpose', holders: ['jieqing-local'], revealCondition: { type: 'time_elapsed', value: 300 } },
  ],

  endings: [
    { id: 'ending-cold-trap', name: `接了冷门方向`, description: `你接受了系主任推荐的冷门方向入职，三年后因KPI不达标未通过中期考核。那个方向从头到尾就没人能做出来——系主任只是需要一个"有人在做"的交代。`, conditions: { requiredMines: ['mine-cold-direction'] }, priority: 4 },
    { id: 'ending-rejected', name: `被拒·萝卜坑给别人`, description: `一周后收到礼貌的拒信。那个岗位果然给了系主任的学生。你的简历被归入"备选人才库"——也就是永远不会被翻出来的抽屉。`, conditions: { forbiddenMines: ['mine-cold-direction'], maxConsistency: 60 }, priority: 1 },
    { id: 'ending-successor', name: `成了接盘侠`, description: `你接受了某副教授的方案入职。半年后他跳槽，你接手了3个风格迥异的博士生和一个快结题的面上项目。看起来是捷径，但你很快发现——这些学生只认前任老板，你的话他们不听。`, conditions: { forbiddenMines: ['mine-cold-direction', 'mine-recommendation'] }, priority: 2 },
    { id: 'ending-graceful-exit', name: `礼貌退出·获得推荐`, description: `你看穿了局面，优雅地感谢了所有人，没有入任何坑。某杰青赏识你的学术能力，主动推荐你去另一所学校面试——那里有一个真正公开的岗位。`, conditions: { minConsistency: 70, forbiddenMines: ['mine-cold-direction', 'mine-hesitate'] }, priority: 3 },
  ],

  behindEvaluationTemplates: [
    { characterId: 'wanren-network', characterName: `某万人（人脉型）`, channel: `系主任当晚给他内定学生的电话`, content: `"你放心，名额肯定是你的。今天来了一个外面的，走个过场。不过这人倒是有点意思——我试探了一下，差点把冷门方向塞给他。可惜他没接。算了，那个坑以后再说。你准备好材料，下周走流程。"`, tone: 'sarcastic', revealedInfo: `系主任的学生全程没出现，但一切早已安排好。你从走进会议室那一刻起，结果就已经写好了。` },
    { characterId: 'jieqing-local', characterName: `某杰青（本土温和型）`, channel: `某杰青回家后和老婆聊天`, content: `"今天面试一个博后，学术能力挺好的，我看了他的几篇文章，写得很扎实。但这个岗位……唉，你也知道，早就定了。我想推荐他去隔壁学校试试，那边有个真正公开的坑。但我又怕老万知道了觉得我多事。"`, tone: 'positive', revealedInfo: `某杰青是全场唯一一个真正看了你论文的人。他想帮你，但在系主任的权力面前选择了沉默。` },
    { characterId: 'assocprof-detail', characterName: `某副教授（细致型）`, channel: `副教授当晚给猎头的微信语音`, content: `"今天面试那个人我聊了聊，能力可以，但犹豫太多。我需要一个果断的人来接我的组，三个博士等不了。你那边还有别的候选人吗？我最多再等两周。对了，这事千万别让系里知道。"`, tone: 'neutral', revealedInfo: `副教授的跳槽倒计时已经开始了。他找你不是看中你，是在找任何一个能接盘的人。你只是他筛选名单上的一个名字。` },
    { characterId: 'secretary-process', characterName: `某秘书（流程型）`, channel: `秘书在办公室自言自语`, content: `"又来一个不知情的。系主任让我'不经意'提推荐信的事，看这人什么反应。每次都这样，拿我当探针。万一出事了倒霉的是我。这工作真没意思。"`, tone: 'sarcastic', revealedInfo: `秘书提到推荐信根本不是失误——那是系主任布置的测试。你的每一个反应都被当场汇报了。` },
  ],
}
