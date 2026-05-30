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
    q: '可以反复游玩吗？',
    a: '可以。每个场景都有多条分支和多种结局，不同选择会解锁不同的身后评价和隐藏信息。',
  },
  {
    q: '数据安全吗？',
    a: '游戏数据仅存储在你的浏览器中，不会上传到任何服务器。你的社交惨败只有你自己知道。',
  },
  {
    q: '可以扮演导师/院士吗？',
    a: '部分场景支持切换视角，体验权力端的社交博弈。是的，你可以当那个让学生难受的人。',
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
              className="card-game p-4 rounded-xl"
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
