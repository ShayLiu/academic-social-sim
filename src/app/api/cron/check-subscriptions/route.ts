import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }
  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
}
