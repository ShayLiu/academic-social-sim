import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function POST(request: NextRequest) {
  try {
    const { scenarioId, score } = await request.json()
    if (!scenarioId || typeof score !== 'number') {
      return NextResponse.json({ error: '参数错误' }, { status: 400 })
    }

    const key = `scores:${scenarioId}`
    await redis.lpush(key, score)
    await redis.ltrim(key, 0, 999)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}

export async function GET(request: NextRequest) {
  try {
    const scenarioId = request.nextUrl.searchParams.get('scenarioId')
    if (!scenarioId) {
      return NextResponse.json({ error: '缺少scenarioId' }, { status: 400 })
    }

    const key = `scores:${scenarioId}`
    const scores = await redis.lrange<number>(key, 0, -1)

    if (!scores || scores.length === 0) {
      return NextResponse.json({ totalPlayers: 0, avgScore: 0, topScore: 0 })
    }

    const total = scores.length
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / total)
    const top = Math.max(...scores)

    return NextResponse.json({ totalPlayers: total, avgScore: avg, topScore: top })
  } catch {
    return NextResponse.json({ totalPlayers: 0, avgScore: 0, topScore: 0 })
  }
}
