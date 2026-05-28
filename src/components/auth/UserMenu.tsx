'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export function UserMenu() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!session?.user) return null

  const user = session.user

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
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
        <svg
          className={`h-4 w-4 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-surface-lighter bg-surface shadow-lg">
          {/* User info header */}
          <div className="border-b border-surface-lighter px-4 py-3">
            <p className="text-sm font-medium text-text-primary">
              {user.name ?? '用户'}
            </p>
            {user.email && (
              <p className="mt-0.5 text-xs text-text-muted truncate">
                {user.email}
              </p>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex w-full items-center px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-lighter hover:text-text-primary"
            >
              个人主页
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="flex w-full items-center px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-lighter hover:text-text-primary"
            >
              定价
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-surface-lighter py-1">
            <button
              onClick={() => {
                setOpen(false)
                signOut({ callbackUrl: '/' })
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-400 transition-colors hover:bg-surface-lighter hover:text-red-300"
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
