import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '学术社交模拟器'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 64, fontWeight: 'bold', color: '#e8e8f0' }}>
            学术社交模拟器
          </div>
          <div style={{ fontSize: 28, color: '#9ca3af', marginTop: 16 }}>
            没有正确答案，只有不同代价的输法
          </div>
          <div style={{ fontSize: 18, color: '#6b7280', marginTop: 24 }}>
            10个场景 · 30+角色 · 6大核心机制
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
