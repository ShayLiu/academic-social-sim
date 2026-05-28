'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function LoginButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="h-8 w-16 animate-pulse rounded bg-surface-lighter" />
    )
  }

  if (!session?.user) {
    return (
      <Link
        href="/api/auth/signin"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/80"
      >
        登录
      </Link>
    )
  }

  const user = session.user

  return (
    <Link
      href="/profile"
      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-surface-lighter"
    >
      {user.image ? (
        <img
          src={user.image}
          alt={user.name ?? '用户头像'}
          className="h-7 w-7 rounded-full"
        />
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          {(user.name ?? user.email ?? '?')[0].toUpperCase()}
        </div>
      )}
      <span className="text-text-primary">
        {user.name ?? user.email ?? '用户'}
      </span>
    </Link>
  )
}
