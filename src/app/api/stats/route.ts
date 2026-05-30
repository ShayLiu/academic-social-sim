import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const count = (await kv.get<number>('play_count')) || 0
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST() {
  try {
    const count = await kv.incr('play_count')
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
