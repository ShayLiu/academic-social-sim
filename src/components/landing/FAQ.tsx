'use client'

const faqs = [
  {
    q: '这是一个社交礼仪教学工具吗？',
    a: '不是。这是一个学术生存压力模拟器。没有标准答案，每个选择都有代价。我们模拟的是中国学术圈的真实社交博弈，不是教你怎么说话得体。',
  },
  {
    q: '场景是真实的吗？',
    a: '场景基于大量真实经历提炼而成，但所有角色和情节均为虚构。如有雷同，说明你懂的。',
  },
  {
    q: '为什么没有正确答案？',
    a: '因为现实就没有正确答案。每个选择都是在不同利益之间权衡。我们提供的是训练你在压力下做出判断的能力，而不是背诵话术。',
  },
  {
    q: '免费用户能体验多少？',
    a: '每月5次场景体验，通关后可查看简版报告（结局+生存分+一句话评价）。解锁完整诊断报告需要购买。',
  },
  {
    q: '数据安全吗？',
    a: '你的游戏数据存储在加密数据库中，我们不会向任何第三方分享。你的社交惨败只有你自己知道。',
  },
  {
    q: '可以扮演导师/院士吗？',
    a: 'Pro用户可以切换视角，体验权力端的社交博弈。是的，你可以当那个让学生难受的人。',
  },
]

export function FAQ() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-text-primary text-center mb-8">
          常见问题
        </h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="p-4 rounded-lg bg-surface-light border border-surface-lighter"
            >
              <p className="text-sm font-medium text-text-primary">{item.q}</p>
              <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
