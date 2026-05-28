'use client'

import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-4xl mb-4">💥</div>
        <h1 className="text-xl font-bold text-text-primary">社交地雷触发</h1>
        <p className="text-sm text-text-muted mt-2">
          系统遇到了一个意外错误。就像学术圈一样，有些事情超出了预期。
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-academic-blue text-white text-sm hover:bg-academic-blue-light transition-colors"
          >
            重试
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-surface-lighter text-text-secondary text-sm hover:bg-surface-light transition-colors"
          >
            回到首页
          </Link>
        </div>
      </div>
    </div>
  )
}
