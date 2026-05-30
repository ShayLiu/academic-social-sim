import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function GET() {
  try {
    const count = (await redis.get<number>('play_count')) || 0
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST() {
  try {
    const count = await redis.incr('play_count')
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
