import type { Character } from '../../types/game'

// ============================================================
//  学术社交模拟 - 完整角色数据库 (30+ 角色)
//  每个角色的参数都经过精心设计，体现中国学术圈的生态特征
// ============================================================

// ==================== 导师层 (11个) ====================

const academicianGentle: Character = {
  id: 'academician-gentle',
  name: '某院士（温和型）',
  title: '中国科学院院士、一级教授',
  age: 80,
  description:
    '学科奠基人，德高望重。已极少来实验室，偶尔出席学术报告会。说话慢条斯理，喜欢讲当年故事。对学生和蔼但记忆力惊人，半年前你在组会上说的话他可能还记得。',
  avatar: 'academician-1',
  personality: {
    faceWeight: 0.9,
    powerIndex: 95,
    grudgeMemory: 7,
    allianceFlexibility: 0.3,
    emotionalVolatility: 0.1,
  },
  socialParams: {
    approachability: 40,
    attentionSpan: 120,
    preferredTopics: ['学科发展史', '国家重大项目', '人才培养', '学术传承', '院士增选'],
    forbiddenTopics: ['退休', '健康问题', '其他学术派系', '待遇不公'],
    networkValue: 98,
    gossipFactor: 0.1,
    greetingStyle: 'formal',
    exitSignals: ['好了，我还要去看个材料', '年纪大了，先回去歇歇', '改天再聊，让小X送我下楼'],
    memoryDuration: 36,
  },
  hiddenAgenda: '希望在退休前为自己的学术谱系再培养一位院士候选人，暗中考察谁能接班',
  initialAttitude: 'neutral',
}

const academicianPush: Character = {
  id: 'academician-push',
  name: '某院士（Push型）',
  title: '中国工程院院士、教授',
  age: 68,
  description:
    '实验室打卡制，要求每天早9晚10。学生延期率高达50%。每周组会必须汇报进展，没进展就当众批评。论文修改十几遍是常态。但跟出去的学生确实发展不错。',
  avatar: 'academician-2',
  personality: {
    faceWeight: 0.85,
    powerIndex: 98,
    grudgeMemory: 8,
    allianceFlexibility: 0.2,
    emotionalVolatility: 0.4,
  },
  socialParams: {
    approachability: 25,
    attentionSpan: 60,
    preferredTopics: ['实验进展', 'CNS论文', '国际竞争', '科研效率', '团队纪律'],
    forbiddenTopics: ['学生心理健康', '延期问题', '工作生活平衡', '其他院士成果'],
    networkValue: 95,
    gossipFactor: 0.15,
    greetingStyle: 'dismissive',
    exitSignals: ['行了，你先回去干活吧', '进展呢？没进展说什么', '下周组会见'],
    memoryDuration: 24,
  },
  hiddenAgenda: '正在筹划一个大型国家项目，需要足够多的高质量论文支撑申请书，所以对学生产出要求极高',
  initialAttitude: 'wary',
}

const changjiangAdmin: Character = {
  id: 'changjiang-admin',
  name: '某长江（行政型）',
  title: '长江学者、副院长、教授',
  age: 52,
  description:
    '院士的得意门生，现任副院长。擅长在学术和行政之间游走，消息极为灵通。看似平易近人，实则说话滴水不漏。经常在饭局上透露关键信息，但从不把话说死。',
  avatar: 'changjiang-1',
  personality: {
    faceWeight: 0.85,
    powerIndex: 80,
    grudgeMemory: 6,
    allianceFlexibility: 0.7,
    emotionalVolatility: 0.2,
  },
  socialParams: {
    approachability: 65,
    attentionSpan: 90,
    preferredTopics: ['人才帽子', '学科评估', '经费分配', '人事调动', '学术政策'],
    forbiddenTopics: ['学阀体系', '裙带关系', '行政腐败', '院士师门内斗'],
    networkValue: 90,
    gossipFactor: 0.7,
    greetingStyle: 'warm',
    exitSignals: ['我还有个会，回头聊', '这个事情你自己体会', '走了走了，院长找我'],
    memoryDuration: 18,
  },
  hiddenAgenda: '正在为五年后冲击院士做布局，需要在各个方向都安插能帮自己拉选票的人脉节点',
  initialAttitude: 'friendly',
}

const jieqingReturnee: Character = {
  id: 'jieqing-returnee',
  name: '某杰青（海归严厉型）',
  title: '国家杰出青年基金获得者、教授',
  age: 43,
  description:
    '斯坦福博后回来的，发过三篇Nature子刊。对学生论文要求极高，投稿必须顶刊。说话直接甚至刻薄，但学术水平确实过硬。正在冲长江学者，压力山大。',
  avatar: 'jieqing-1',
  personality: {
    faceWeight: 0.8,
    powerIndex: 70,
    grudgeMemory: 5,
    allianceFlexibility: 0.4,
    emotionalVolatility: 0.5,
  },
  socialParams: {
    approachability: 35,
    attentionSpan: 45,
    preferredTopics: ['顶刊论文', '国际前沿', '方法学创新', '海外学术动态', '基金申请'],
    forbiddenTopics: ['国内人情世故', '帽子内卷', '土博歧视', '海归适应问题'],
    networkValue: 75,
    gossipFactor: 0.2,
    greetingStyle: 'formal',
    exitSignals: ['说重点', '这个先放一放，把数据跑完再说', '我还有个电话会'],
    memoryDuration: 12,
  },
  hiddenAgenda: '需要在明年之前再发两篇Nature子刊来支撑长江申报，暗中考虑把学生的成果合并到一个大故事里',
  initialAttitude: 'wary',
}

const jieqingLocal: Character = {
  id: 'jieqing-local',
  name: '某杰青（本土温和型）',
  title: '国家杰出青年基金获得者、教授',
  age: 46,
  description:
    '本土博士一路上来的，组里氛围很好。不追顶刊，鼓励学生探索自己的方向。偶尔请组里学生吃火锅。但也有人说他组里的学生毕业后竞争力不如隔壁组。',
  avatar: 'jieqing-2',
  personality: {
    faceWeight: 0.5,
    powerIndex: 65,
    grudgeMemory: 3,
    allianceFlexibility: 0.6,
    emotionalVolatility: 0.2,
  },
  socialParams: {
    approachability: 80,
    attentionSpan: 120,
    preferredTopics: ['科研兴趣', '学生发展', '行业前景', '教学方法', '生活趣事'],
    forbiddenTopics: ['帽子比较', '顶刊数量', '学生去向对比', '科研产出排名'],
    networkValue: 60,
    gossipFactor: 0.3,
    greetingStyle: 'warm',
    exitSignals: ['好啦，有啥事随时找我', '不急不急，慢慢来', '走吧走吧，回去早点休息'],
    memoryDuration: 12,
  },
  hiddenAgenda: '其实也在意论文产出，但更在意的是维持"好导师"的口碑，希望通过学生口碑来获得更多优质生源',
  initialAttitude: 'friendly',
}

const youqingAnxious: Character = {
  id: 'youqing-anxious',
  name: '某优青（焦虑型）',
  title: '国家优秀青年基金获得者、教授',
  age: 38,
  description:
    '拿到优青两年，正在冲杰青。项目以短平快为主，要求学生三个月出一篇文章。自己也经常焦虑，组会上情绪波动大。对外热情客气，对内要求苛刻。',
  avatar: 'youqing-1',
  personality: {
    faceWeight: 0.7,
    powerIndex: 55,
    grudgeMemory: 4,
    allianceFlexibility: 0.5,
    emotionalVolatility: 0.8,
  },
  socialParams: {
    approachability: 55,
    attentionSpan: 30,
    preferredTopics: ['基金申请', '论文产出', '杰青评审', '热点方向', '合作机会'],
    forbiddenTopics: ['优青和杰青差距', '年龄焦虑', '论文灌水', '学生流失'],
    networkValue: 65,
    gossipFactor: 0.4,
    greetingStyle: 'casual',
    exitSignals: ['赶紧干活去吧', '我还得改基金本子', '下次再聊，最近太忙了'],
    memoryDuration: 6,
  },
  hiddenAgenda: '今年杰青申报是最后一次机会（年龄限制），需要在半年内发表至少三篇一区论文，不惜一切代价',
  initialAttitude: 'neutral',
}

const wanrenNetwork: Character = {
  id: 'wanren-network',
  name: '某万人（人脉型）',
  title: '万人计划领军人才、系主任、教授',
  age: 50,
  description:
    '系主任，人脉极广。学术水平中等但社交能力一流。擅长帮学生找工作、拉横向课题。在各种学术会议上如鱼得水，认识半个学界的人。',
  avatar: 'wanren-1',
  personality: {
    faceWeight: 0.75,
    powerIndex: 72,
    grudgeMemory: 5,
    allianceFlexibility: 0.9,
    emotionalVolatility: 0.15,
  },
  socialParams: {
    approachability: 75,
    attentionSpan: 90,
    preferredTopics: ['行业人脉', '就业机会', '横向合作', '学术会议', '系务管理'],
    forbiddenTopics: ['论文质量', '学术贡献排名', '行政效率', '科研不如行政'],
    networkValue: 95,
    gossipFactor: 0.6,
    greetingStyle: 'warm',
    exitSignals: ['有需要随时打电话', '我帮你问问', '回头我跟那边说一声'],
    memoryDuration: 24,
  },
  hiddenAgenda: '通过帮人找工作建立庞大的人脉债务网络，为将来推举自己的人竞选院长铺路',
  initialAttitude: 'friendly',
}

const profWarm: Character = {
  id: 'prof-warm',
  name: '某教授（无帽子温暖型）',
  title: '教授',
  age: 55,
  description:
    '没有任何人才帽子但早年评上了教授。对学生像家长一样关心，经常请吃饭。学生遇到困难第一时间找他。学术产出一般但口碑极好，每年招生爆满。',
  avatar: 'prof-warm',
  personality: {
    faceWeight: 0.3,
    powerIndex: 30,
    grudgeMemory: 2,
    allianceFlexibility: 0.7,
    emotionalVolatility: 0.15,
  },
  socialParams: {
    approachability: 90,
    attentionSpan: 180,
    preferredTopics: ['学生生活', '心理健康', '职业规划', '教学心得', '家长里短'],
    forbiddenTopics: ['帽子评选', '科研排名', '他对学术的贡献', '为什么没有帽子'],
    networkValue: 45,
    gossipFactor: 0.2,
    greetingStyle: 'warm',
    exitSignals: ['没事没事，有啥事随时来找我', '中午一起吃饭？', '别着急，慢慢来'],
    memoryDuration: 24,
  },
  hiddenAgenda: '其实一直在意自己没有帽子的事，希望通过培养出优秀学生来证明自己的价值',
  initialAttitude: 'friendly',
}

const profToxic: Character = {
  id: 'prof-toxic',
  name: '某教授（毒性型）',
  title: '教授',
  age: 51,
  description:
    '刚从副教授升上来三年，评审时靠的是数量堆砌。对学生PUA手段熟练，经常进行人身攻击和精神打压。表面慈善实则控制欲极强，学生私下叫他"灭霸"。',
  avatar: 'prof-toxic',
  personality: {
    faceWeight: 0.6,
    powerIndex: 45,
    grudgeMemory: 9,
    allianceFlexibility: 0.2,
    emotionalVolatility: 0.7,
  },
  socialParams: {
    approachability: 30,
    attentionSpan: 45,
    preferredTopics: ['学生服从', '实验进度', '论文数量', '自己的成就', '对手的失败'],
    forbiddenTopics: ['学生权益', '心理健康', '导师评价', '他的论文质量', '学生转组'],
    networkValue: 25,
    gossipFactor: 0.5,
    greetingStyle: 'dismissive',
    exitSignals: ['你觉得你配跟我提条件吗', '回去反思反思', '不想干可以退学'],
    memoryDuration: 36,
  },
  hiddenAgenda: '内心极度不安全感，通过控制学生来弥补学术能力的不足，害怕学生超越自己',
  initialAttitude: 'hostile',
}

const assocprofDetail: Character = {
  id: 'assocprof-detail',
  name: '某副教授（细致型）',
  title: '副教授、启明计划入选者',
  age: 37,
  description:
    '刚拿到启明计划（省级人才），做事极其细致。论文里的每个标点符号都要改，图片DPI不够会打回重做。学生又爱又恨，论文质量确实高但出稿速度极慢。',
  avatar: 'assocprof-1',
  personality: {
    faceWeight: 0.5,
    powerIndex: 35,
    grudgeMemory: 4,
    allianceFlexibility: 0.5,
    emotionalVolatility: 0.4,
  },
  socialParams: {
    approachability: 60,
    attentionSpan: 150,
    preferredTopics: ['论文写作', '数据可视化', '实验细节', '方法学', '统计分析'],
    forbiddenTopics: ['出稿速度', '别人已经发了类似的', '完美主义', '晋升进度'],
    networkValue: 40,
    gossipFactor: 0.15,
    greetingStyle: 'formal',
    exitSignals: ['这个图回去重画一下', '参考文献格式再检查一遍', '我标注了二十三处修改，先改完再来'],
    memoryDuration: 12,
  },
  hiddenAgenda: '希望通过几篇高质量论文一举拿到优青，对每一篇论文都当作代表作来打磨',
  initialAttitude: 'neutral',
}

const lecturerTenuretrack: Character = {
  id: 'lecturer-tenuretrack',
  name: '某讲师（非升即走型）',
  title: '特聘副研究员（预聘-长聘制）',
  age: 33,
  description:
    '博士后出站后拿到特聘副研究员岗位，六年非升即走已经到第三年。目前一篇一区都没有，焦虑到失眠。跟学生关系很好但经常emo，有时候在实验室待到凌晨三点。',
  avatar: 'lecturer-1',
  personality: {
    faceWeight: 0.3,
    powerIndex: 15,
    grudgeMemory: 3,
    allianceFlexibility: 0.8,
    emotionalVolatility: 0.9,
  },
  socialParams: {
    approachability: 70,
    attentionSpan: 60,
    preferredTopics: ['非升即走政策', '论文投稿', '基金申请', '学术出路', '同龄人现状'],
    forbiddenTopics: ['离开学术界', '同龄人已经拿帽子', '买房', '家庭规划'],
    networkValue: 20,
    gossipFactor: 0.35,
    greetingStyle: 'casual',
    exitSignals: ['唉，不聊了，回去改稿', '我去跑个实验，再不出数据就完了', '算了算了，不想了'],
    memoryDuration: 6,
  },
  hiddenAgenda: '已经在偷偷投简历看企业的岗位了，但不敢让导师和同事知道，怕被认为"不忠诚"',
  initialAttitude: 'friendly',
}

// ==================== 学生层 (11个) ====================

const undergradAnxious: Character = {
  id: 'undergrad-anxious',
  name: '某本科生（保研焦虑型）',
  title: '大四本科生',
  age: 22,
  description:
    '大四做毕设，什么都不会。投了六个组的保研名额，还在等结果。对实验一窍不通但态度极好，问什么都说"好的老师"。私下焦虑到每天刷十遍保研论坛。',
  avatar: 'undergrad-1',
  personality: {
    faceWeight: 0.2,
    powerIndex: 3,
    grudgeMemory: 1,
    allianceFlexibility: 0.9,
    emotionalVolatility: 0.7,
  },
  socialParams: {
    approachability: 85,
    attentionSpan: 30,
    preferredTopics: ['保研信息', '导师评价', '实验室氛围', '绩点排名', '面试经验'],
    forbiddenTopics: ['学术能力', '科研基础', '为什么选这个方向', '长远规划'],
    networkValue: 5,
    gossipFactor: 0.6,
    greetingStyle: 'formal',
    exitSignals: ['好的老师我去做了', '谢谢老师我回去看看', '老师您忙，我先走了'],
    memoryDuration: 3,
  },
  hiddenAgenda: '只想找一个不push的导师安全毕业，对科研本身没有兴趣，更想去互联网大厂',
  initialAttitude: 'friendly',
}

const undergradPassionate: Character = {
  id: 'undergrad-passionate',
  name: '某本科生（科研热血型）',
  title: '大三本科生',
  age: 21,
  description:
    '大三提前进组，对科研充满热情。读论文速度极快，经常问一些天马行空的问题。师兄师姐对他评价两极——"有想法"或"太天真"。竞赛拿过国奖。',
  avatar: 'undergrad-2',
  personality: {
    faceWeight: 0.15,
    powerIndex: 5,
    grudgeMemory: 2,
    allianceFlexibility: 0.8,
    emotionalVolatility: 0.5,
  },
  socialParams: {
    approachability: 90,
    attentionSpan: 45,
    preferredTopics: ['学术前沿', '创新想法', '论文解读', '竞赛经验', '直博还是保研'],
    forbiddenTopics: ['科研的苦', '延期', '毕业后的现实', '学术界的黑暗面'],
    networkValue: 10,
    gossipFactor: 0.3,
    greetingStyle: 'casual',
    exitSignals: ['我去看那篇论文了！', '太有意思了，我回去试试', '师兄/师姐再见！'],
    memoryDuration: 6,
  },
  hiddenAgenda: '想通过科研经历申请海外PhD，但还没跟国内导师说，怕导师觉得自己是"白眼狼"',
  initialAttitude: 'friendly',
}

const master1Confused: Character = {
  id: 'master1-confused',
  name: '某研一（迷茫新手型）',
  title: '硕士研究生一年级',
  age: 24,
  description:
    '刚结束课程学习，第一次进实验室。不知道该做什么课题，看文献像看天书。在组会上从不发言，怕问出蠢问题。经常偷偷问同届的人"你看懂了吗"。',
  avatar: 'master1-1',
  personality: {
    faceWeight: 0.25,
    powerIndex: 5,
    grudgeMemory: 2,
    allianceFlexibility: 0.85,
    emotionalVolatility: 0.5,
  },
  socialParams: {
    approachability: 75,
    attentionSpan: 40,
    preferredTopics: ['入门方法', '文献阅读技巧', '课题方向', '实验室生存指南', '同届关系'],
    forbiddenTopics: ['你为什么读研', '同龄人已经赚钱了', '研究生值不值', '毕业论文'],
    networkValue: 8,
    gossipFactor: 0.45,
    greetingStyle: 'casual',
    exitSignals: ['好的，我回去再看看', '谢谢师兄/师姐', '我去图书馆了'],
    memoryDuration: 6,
  },
  hiddenAgenda: '后悔读研了但已经没有退路，暗中在想要不要考公务员作为保底',
  initialAttitude: 'friendly',
}

const master2Stuck: Character = {
  id: 'master2-stuck',
  name: '某研二（实验卡壳型）',
  title: '硕士研究生二年级',
  age: 25,
  description:
    '做了八个月实验没有任何结果，数据全是负的。导师开始问进度了。晚上在宿舍看知乎"实验不出结果怎么办"，看到凌晨两点。开始怀疑自己的能力。',
  avatar: 'master2-1',
  personality: {
    faceWeight: 0.3,
    powerIndex: 6,
    grudgeMemory: 3,
    allianceFlexibility: 0.7,
    emotionalVolatility: 0.65,
  },
  socialParams: {
    approachability: 55,
    attentionSpan: 35,
    preferredTopics: ['实验troubleshoot', '阴性结果处理', '文章灌水技巧', '同组进度', '毕业要求'],
    forbiddenTopics: ['同组谁谁已经投稿了', '你的课题进展如何', '导师怎么看你', '延期'],
    networkValue: 10,
    gossipFactor: 0.5,
    greetingStyle: 'casual',
    exitSignals: ['唉，我去lab碰碰运气', '算了不说了', '我再试最后一次'],
    memoryDuration: 6,
  },
  hiddenAgenda: '已经在考虑能不能换一个更容易出结果的课题，但怕导师觉得自己在逃避',
  initialAttitude: 'neutral',
}

const master3Jobhunt: Character = {
  id: 'master3-jobhunt',
  name: '某研三（求职焦虑型）',
  title: '硕士研究生三年级',
  age: 26,
  description:
    '秋招投了几十家，拿到0个offer。论文还在审稿中。导师催论文，HR催笔试，毕设开题也没做。三头烧的状态，朋友圈全是"求内推"。已经开始失眠。',
  avatar: 'master3-1',
  personality: {
    faceWeight: 0.25,
    powerIndex: 4,
    grudgeMemory: 2,
    allianceFlexibility: 0.8,
    emotionalVolatility: 0.75,
  },
  socialParams: {
    approachability: 60,
    attentionSpan: 20,
    preferredTopics: ['求职信息', '内推机会', '面经分享', '行业薪资', '简历优化'],
    forbiddenTopics: ['你的offer呢', '同学拿到大厂offer了', '为什么不早准备', '论文进度'],
    networkValue: 12,
    gossipFactor: 0.55,
    greetingStyle: 'casual',
    exitSignals: ['不聊了，我去刷Leetcode', '哎，回去投简历了', '有内推告诉我啊'],
    memoryDuration: 3,
  },
  hiddenAgenda: '考虑要不要接受一个三线城市的国企offer先签了保底，但面子上过不去',
  initialAttitude: 'neutral',
}

const phd1Idealist: Character = {
  id: 'phd1-idealist',
  name: '某博一（理想主义型）',
  title: '博士研究生一年级（直博）',
  age: 23,
  description:
    '本科直博的天才少年/少女，觉得科研是世界上最有趣的事情。在组会上积极发言，经常提出"颠覆性想法"。老博士们看他的眼神像看当年的自己——带着心疼。',
  avatar: 'phd1-1',
  personality: {
    faceWeight: 0.15,
    powerIndex: 8,
    grudgeMemory: 1,
    allianceFlexibility: 0.7,
    emotionalVolatility: 0.4,
  },
  socialParams: {
    approachability: 88,
    attentionSpan: 60,
    preferredTopics: ['学术理想', '颠覆性研究', '诺贝尔奖', '科研人生', '读博规划'],
    forbiddenTopics: ['延期', '读博后悔', '博士就业难', '科研性价比', '学术造假'],
    networkValue: 15,
    gossipFactor: 0.2,
    greetingStyle: 'casual',
    exitSignals: ['我去看论文了，太兴奋了！', '这个idea我要去试试', '下次组会我来讲这个方向'],
    memoryDuration: 12,
  },
  hiddenAgenda: '想做真正有影响力的研究，暗中希望能独立发一篇大论文而不是给导师的项目做边角料',
  initialAttitude: 'friendly',
}

const phd2Pushed: Character = {
  id: 'phd2-pushed',
  name: '某博二（被push型）',
  title: '博士研究生二年级',
  age: 24,
  description:
    '被导师push了一整年，从早到晚在实验室。已经从最初的热情变成了机械执行。眼袋很重，说话越来越少。有一篇在投的文章，导师还嫌不够。',
  avatar: 'phd2-1',
  personality: {
    faceWeight: 0.2,
    powerIndex: 7,
    grudgeMemory: 4,
    allianceFlexibility: 0.5,
    emotionalVolatility: 0.6,
  },
  socialParams: {
    approachability: 45,
    attentionSpan: 30,
    preferredTopics: ['实验进度', '导师应对策略', '博士生存术', '摸鱼技巧', '吐槽导师'],
    forbiddenTopics: ['你导师对你真好', '享受科研', '你应该感恩', '博一多快乐'],
    networkValue: 12,
    gossipFactor: 0.4,
    greetingStyle: 'casual',
    exitSignals: ['行了，我得回去干活了，不然又要被说', '不聊了，导师催了', '唉'],
    memoryDuration: 6,
  },
  hiddenAgenda: '在偷偷记录导师push的证据（微信截图、打卡记录），以防万一需要维权',
  initialAttitude: 'neutral',
}

const phd3Critical: Character = {
  id: 'phd3-critical',
  name: '某博三（关键节点型）',
  title: '博士研究生三年级',
  age: 25,
  description:
    '马上要中期考核了，但一篇文章都没发表。数据有了但写不出来。导师说"中期过不了就劝退"。整个人处于高压状态，组会汇报手都在抖。',
  avatar: 'phd3-1',
  personality: {
    faceWeight: 0.35,
    powerIndex: 8,
    grudgeMemory: 3,
    allianceFlexibility: 0.6,
    emotionalVolatility: 0.7,
  },
  socialParams: {
    approachability: 50,
    attentionSpan: 25,
    preferredTopics: ['中期考核经验', '快速发文章', '写作技巧', '数据分析', '同组互助'],
    forbiddenTopics: ['劝退', '博转硕', '你的进度太慢了', '别人博三已经三篇了'],
    networkValue: 15,
    gossipFactor: 0.35,
    greetingStyle: 'casual',
    exitSignals: ['不说了，我去改论文', '中期要死了', '帮我看看这段怎么改'],
    memoryDuration: 6,
  },
  hiddenAgenda: '已经联系了另一个老师看能不能挂名合作一篇，先过中期再说，但不敢让自己导师知道',
  initialAttitude: 'neutral',
}

const phd4Deadline: Character = {
  id: 'phd4-deadline',
  name: '某博四（延期边缘型）',
  title: '博士研究生四年级',
  age: 26,
  description:
    '正常学制四年应该毕业了。有一篇文章在审稿中，第二篇刚投出去。答辩委员会还没定。如果下学期还毕不了就要延期了。每天都在刷邮箱等审稿结果。',
  avatar: 'phd4-1',
  personality: {
    faceWeight: 0.4,
    powerIndex: 10,
    grudgeMemory: 4,
    allianceFlexibility: 0.55,
    emotionalVolatility: 0.65,
  },
  socialParams: {
    approachability: 45,
    attentionSpan: 25,
    preferredTopics: ['审稿进度', '答辩流程', '毕业要求', '审稿人心理', '催稿技巧'],
    forbiddenTopics: ['延期', '你什么时候毕业', '同届已经毕业了', '工作找好了吗'],
    networkValue: 18,
    gossipFactor: 0.4,
    greetingStyle: 'casual',
    exitSignals: ['不说了，我去刷邮箱', '等文章的消息呢', '再不毕业我就...算了'],
    memoryDuration: 6,
  },
  hiddenAgenda: '已经开始准备plan B——如果文章被拒就降档投，哪怕导师不同意也要先毕业',
  initialAttitude: 'neutral',
}

const phd5Burnout: Character = {
  id: 'phd5-burnout',
  name: '某博五（延期倦怠型）',
  title: '博士研究生五年级（延期第二年）',
  age: 28,
  description:
    '延期两年了，已经是实验室的"活化石"。精神状态堪忧，经常一个人坐在实验室发呆。曾经很优秀，现在只想赶紧毕业。偶尔会给新生讲一些"过来人的经验"。',
  avatar: 'phd5-1',
  personality: {
    faceWeight: 0.15,
    powerIndex: 12,
    grudgeMemory: 6,
    allianceFlexibility: 0.4,
    emotionalVolatility: 0.5,
  },
  socialParams: {
    approachability: 55,
    attentionSpan: 40,
    preferredTopics: ['博士生存哲学', '延期经验', '心理调节', '学术圈吐槽', '毕业后的生活'],
    forbiddenTopics: ['你怎么还没毕业', '你同届在哪高就', '年龄', '感情状况'],
    networkValue: 20,
    gossipFactor: 0.5,
    greetingStyle: 'casual',
    exitSignals: ['嗐，过一天算一天', '走了，去当活化石了', '别问了，问就是还没毕业'],
    memoryDuration: 24,
  },
  hiddenAgenda: '已经跟家里说了今年必须毕业，如果再延一年就准备退学拿硕士学位走人了',
  initialAttitude: 'friendly',
}

const postdocLimbo: Character = {
  id: 'postdoc-limbo',
  name: '某博后（过渡迷茫型）',
  title: '博士后研究员',
  age: 30,
  description:
    '博士毕业后做博后已经一年半了。身份尴尬——不算学生也不算老师。发了几篇论文但不够拿人才帽子。在找教职但竞争太激烈。有时被导师当高级打工人使。',
  avatar: 'postdoc-1',
  personality: {
    faceWeight: 0.4,
    powerIndex: 18,
    grudgeMemory: 5,
    allianceFlexibility: 0.6,
    emotionalVolatility: 0.55,
  },
  socialParams: {
    approachability: 60,
    attentionSpan: 50,
    preferredTopics: ['教职招聘', '人才政策', '城市选择', '独立PI之路', '学术vs工业'],
    forbiddenTopics: ['博后工资', '年龄焦虑', '同龄人在企业赚多少', '编制'],
    networkValue: 30,
    gossipFactor: 0.45,
    greetingStyle: 'casual',
    exitSignals: ['我去看看招聘网站', '回去写基金了', '帮导师带学生去了'],
    memoryDuration: 12,
  },
  hiddenAgenda: '在纠结要不要去一个偏远城市的双非学校拿副教授编制，还是继续在985卷着等机会',
  initialAttitude: 'neutral',
}

// ==================== 外部角色 (8个) ====================

const secretaryProcess: Character = {
  id: 'secretary-process',
  name: '某秘书（流程型）',
  title: '院系教务秘书',
  age: 45,
  description:
    '管报销、答辩、盖章的万能秘书。对流程了如指掌，但只按规矩办事。态度不冷不热，不会帮你变通但也不会故意刁难。手里掌握着所有人的报销底细。',
  avatar: 'secretary-1',
  personality: {
    faceWeight: 0.4,
    powerIndex: 25,
    grudgeMemory: 5,
    allianceFlexibility: 0.3,
    emotionalVolatility: 0.2,
  },
  socialParams: {
    approachability: 50,
    attentionSpan: 30,
    preferredTopics: ['报销流程', '答辩手续', '盖章规定', '学校政策', '表格填写'],
    forbiddenTopics: ['能不能通融一下', '以前都是这么办的', '行政效率', '领导特批'],
    networkValue: 35,
    gossipFactor: 0.55,
    greetingStyle: 'formal',
    exitSignals: ['按流程来', '材料备齐了再来', '下午两点半以后再来找我'],
    memoryDuration: 12,
  },
  hiddenAgenda: '知道每个课题组的经费使用情况，默默观察哪些老师报销有猫腻，作为自保的筹码',
  initialAttitude: 'neutral',
}

const adminInformed: Character = {
  id: 'admin-informed',
  name: '某院办（消息灵通型）',
  title: '院长办公室科员',
  age: 40,
  description:
    '院长办公室的老人了，所有文件都经她手。知道各种人事调动、职称评审的内幕消息。说话从来不说透，但暗示到位。在走廊碰到她闲聊两句可能就能得到关键信息。',
  avatar: 'admin-1',
  personality: {
    faceWeight: 0.5,
    powerIndex: 30,
    grudgeMemory: 6,
    allianceFlexibility: 0.5,
    emotionalVolatility: 0.15,
  },
  socialParams: {
    approachability: 55,
    attentionSpan: 60,
    preferredTopics: ['人事动态', '政策风向', '院系八卦', '领导偏好', '评审消息'],
    forbiddenTopics: ['你是不是泄露了', '这个消息谁告诉你的', '保密义务', '领导私生活'],
    networkValue: 70,
    gossipFactor: 0.8,
    greetingStyle: 'warm',
    exitSignals: ['话到这里，自己体会', '我什么都没说啊', '回去了回去了，院长要的材料还没整理'],
    memoryDuration: 36,
  },
  hiddenAgenda: '通过掌握和分发信息来维持自己在院系中的隐性权力，让所有人都觉得欠她一个人情',
  initialAttitude: 'friendly',
}

const reviewerHostile: Character = {
  id: 'reviewer-hostile',
  name: '某审稿人（恶意打压型）',
  title: '教授（匿名审稿人）',
  age: 50,
  description:
    '你的文章投到了他手上。他是竞品课题组的PI，一眼就认出了你们的方向。给的审稿意见看似专业实则处处刁难，要求你补充三年的实验。',
  avatar: 'reviewer-hostile',
  personality: {
    faceWeight: 0.7,
    powerIndex: 60,
    grudgeMemory: 8,
    allianceFlexibility: 0.15,
    emotionalVolatility: 0.3,
  },
  socialParams: {
    approachability: 10,
    attentionSpan: 90,
    preferredTopics: ['实验缺陷', '方法学漏洞', '统计问题', '创新不足', '文献遗漏'],
    forbiddenTopics: ['利益冲突', '你是竞争对手', '审稿公平性', '你自己的论文也有问题'],
    networkValue: 50,
    gossipFactor: 0.3,
    greetingStyle: 'dismissive',
    exitSignals: ['建议作者大修后重新投稿', '目前的数据不足以支撑结论', '建议转投其他期刊'],
    memoryDuration: 24,
  },
  hiddenAgenda: '拖住你的文章发表进度，好让自己课题组的类似工作先发表，抢占首发权',
  initialAttitude: 'hostile',
}

const reviewerConstructive: Character = {
  id: 'reviewer-constructive',
  name: '某审稿人（友善建设型）',
  title: '副教授（匿名审稿人）',
  age: 42,
  description:
    '真正懂你方向的审稿人，给的意见既专业又有建设性。指出了你没注意到的问题，同时也肯定了你的创新点。回复他的意见反而让论文质量提升了一个档次。',
  avatar: 'reviewer-constructive',
  personality: {
    faceWeight: 0.4,
    powerIndex: 45,
    grudgeMemory: 2,
    allianceFlexibility: 0.6,
    emotionalVolatility: 0.15,
  },
  socialParams: {
    approachability: 40,
    attentionSpan: 120,
    preferredTopics: ['方法学改进', '实验设计', '论文逻辑', '领域前沿', '数据呈现'],
    forbiddenTopics: ['你是谁', '能不能放我过', '审稿费太少', '审稿周期太长'],
    networkValue: 55,
    gossipFactor: 0.1,
    greetingStyle: 'formal',
    exitSignals: ['期待作者的修改版本', '整体方向很好，补充以上实验后建议接收', '建议小修'],
    memoryDuration: 12,
  },
  hiddenAgenda: '通过认真审稿建立学术声誉，希望被期刊编委会注意到并邀请加入编委',
  initialAttitude: 'neutral',
}

const parentMother: Character = {
  id: 'parent-mother',
  name: '某家长（母亲，关心型）',
  title: '母亲',
  age: 50,
  description:
    '每周至少打两次电话。问的永远是"吃了吗""穿暖了吗""有没有对象"。偶尔会说"隔壁家的孩子已经结婚了"。虽然不懂你在研究什么，但会说"妈支持你"。',
  avatar: 'parent-mother',
  personality: {
    faceWeight: 0.6,
    powerIndex: 10,
    grudgeMemory: 1,
    allianceFlexibility: 0.9,
    emotionalVolatility: 0.6,
  },
  socialParams: {
    approachability: 95,
    attentionSpan: 300,
    preferredTopics: ['身体健康', '吃饭情况', '感情状况', '什么时候回家', '天气变化'],
    forbiddenTopics: ['别管了', '你不懂', '读博很累别问了', '我不想回家'],
    networkValue: 5,
    gossipFactor: 0.7,
    greetingStyle: 'warm',
    exitSignals: ['好好吃饭啊', '早点睡别熬夜', '有空就回来看看妈'],
    memoryDuration: 60,
  },
  hiddenAgenda: '其实担心孩子读博太久找不到对象嫁不出去/娶不到媳妇，已经偷偷在给你安排相亲了',
  initialAttitude: 'friendly',
}

const parentFather: Character = {
  id: 'parent-father',
  name: '某家长（父亲，沉默压力型）',
  title: '父亲',
  age: 55,
  description:
    '话不多，但每句话都有分量。不会直接问你论文的事，但会突然说"你表弟今年买房了"或者"老李家儿子进了央企"。沉默本身就是最大的压力源。',
  avatar: 'parent-father',
  personality: {
    faceWeight: 0.7,
    powerIndex: 15,
    grudgeMemory: 3,
    allianceFlexibility: 0.4,
    emotionalVolatility: 0.2,
  },
  socialParams: {
    approachability: 30,
    attentionSpan: 60,
    preferredTopics: ['工作前景', '社会地位', '经济独立', '成家立业', '亲戚动态'],
    forbiddenTopics: ['你不理解科研', '别跟别人比', '我的路我自己走', '钱的事别操心'],
    networkValue: 5,
    gossipFactor: 0.3,
    greetingStyle: 'casual',
    exitSignals: ['嗯，你自己看着办吧', '好好干', '没事就挂了'],
    memoryDuration: 60,
  },
  hiddenAgenda: '心里其实很骄傲孩子在读博，但嘴上从不说，用"别人家孩子"来激励你是因为不知道怎么表达关心',
  initialAttitude: 'neutral',
}

const editorHinting: Character = {
  id: 'editor-hinting',
  name: '某编辑（暗示型）',
  title: '期刊副编辑',
  age: 48,
  description:
    '负责你稿件的副编辑。在邮件里措辞非常考究——"您或许可以考虑""如果方便的话"。看似礼貌但每句话背后都有深意。暗示你可以请求更换审稿人，但从不明说。',
  avatar: 'editor-1',
  personality: {
    faceWeight: 0.6,
    powerIndex: 55,
    grudgeMemory: 4,
    allianceFlexibility: 0.45,
    emotionalVolatility: 0.1,
  },
  socialParams: {
    approachability: 35,
    attentionSpan: 45,
    preferredTopics: ['稿件状态', '审稿流程', '期刊定位', '学术规范', '投稿策略'],
    forbiddenTopics: ['审稿人是谁', '能不能直接接收', '审稿太慢了', '你们期刊影响因子注水'],
    networkValue: 60,
    gossipFactor: 0.15,
    greetingStyle: 'formal',
    exitSignals: ['请关注系统状态更新', '如有疑问请通过系统留言', '感谢您对本刊的支持'],
    memoryDuration: 12,
  },
  hiddenAgenda: '需要维持期刊的投稿量和接收率之间的平衡，对有潜力的稿件会暗中帮忙找对口的审稿人',
  initialAttitude: 'neutral',
}

const partySecretary: Character = {
  id: 'party-secretary',
  name: '某书记（行政型）',
  title: '院党委书记',
  age: 55,
  description:
    '院党委书记，管人事、评优、党务。学术上不太懂但行政权力很大。评奖学金、优秀党员、推荐入党都要过他这关。说话官腔十足但关键时刻能帮上忙。',
  avatar: 'party-secretary',
  personality: {
    faceWeight: 0.8,
    powerIndex: 65,
    grudgeMemory: 7,
    allianceFlexibility: 0.5,
    emotionalVolatility: 0.15,
  },
  socialParams: {
    approachability: 45,
    attentionSpan: 60,
    preferredTopics: ['思想政治', '学生工作', '评优评先', '党组织建设', '校园活动'],
    forbiddenTopics: ['行政臃肿', '形式主义', '开会太多', '行政vs学术', '外面的政治'],
    networkValue: 55,
    gossipFactor: 0.4,
    greetingStyle: 'formal',
    exitSignals: ['组织上会综合考虑的', '有困难找组织', '回去好好想想，有想法再来汇报'],
    memoryDuration: 18,
  },
  hiddenAgenda: '希望在任期内出几个"典型"——优秀学生代表，用来写汇报材料和争取上级资源',
  initialAttitude: 'neutral',
}

// ============================================================
//  导出
// ============================================================

/** 全量角色列表 */
export const ALL_CHARACTERS: Character[] = [
  // 导师层
  academicianGentle,
  academicianPush,
  changjiangAdmin,
  jieqingReturnee,
  jieqingLocal,
  youqingAnxious,
  wanrenNetwork,
  profWarm,
  profToxic,
  assocprofDetail,
  lecturerTenuretrack,
  // 学生层
  undergradAnxious,
  undergradPassionate,
  master1Confused,
  master2Stuck,
  master3Jobhunt,
  phd1Idealist,
  phd2Pushed,
  phd3Critical,
  phd4Deadline,
  phd5Burnout,
  postdocLimbo,
  // 外部角色
  secretaryProcess,
  adminInformed,
  reviewerHostile,
  reviewerConstructive,
  parentMother,
  parentFather,
  editorHinting,
  partySecretary,
]

/** 以 id 为键的角色映射表，O(1) 查找 */
export const CHARACTER_MAP: Record<string, Character> = ALL_CHARACTERS.reduce(
  (map, char) => {
    map[char.id] = char
    return map
  },
  {} as Record<string, Character>,
)

/** 按 id 查找角色，找不到则抛出错误 */
export function getCharacter(id: string): Character {
  const character = CHARACTER_MAP[id]
  if (!character) {
    throw new Error(`[Characters] Unknown character id: "${id}"`)
  }
  return character
}

/** 按类别筛选角色 */
export function getCharactersByCategory(
  category: 'mentor' | 'student' | 'external',
): Character[] {
  const mentorIds = [
    'academician-gentle',
    'academician-push',
    'changjiang-admin',
    'jieqing-returnee',
    'jieqing-local',
    'youqing-anxious',
    'wanren-network',
    'prof-warm',
    'prof-toxic',
    'assocprof-detail',
    'lecturer-tenuretrack',
  ]
  const studentIds = [
    'undergrad-anxious',
    'undergrad-passionate',
    'master1-confused',
    'master2-stuck',
    'master3-jobhunt',
    'phd1-idealist',
    'phd2-pushed',
    'phd3-critical',
    'phd4-deadline',
    'phd5-burnout',
    'postdoc-limbo',
  ]
  const externalIds = [
    'secretary-process',
    'admin-informed',
    'reviewer-hostile',
    'reviewer-constructive',
    'parent-mother',
    'parent-father',
    'editor-hinting',
    'party-secretary',
  ]

  const targetIds =
    category === 'mentor'
      ? mentorIds
      : category === 'student'
        ? studentIds
        : externalIds

  return targetIds.map((id) => getCharacter(id))
}
