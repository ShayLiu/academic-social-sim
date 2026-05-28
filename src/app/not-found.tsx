import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold font-mono text-text-muted mb-4">404</div>
        <h1 className="text-lg font-medium text-text-primary">场景不存在</h1>
        <p className="text-sm text-text-muted mt-2">
          你试图进入一个不存在的场景。就像学术圈里的某些承诺一样。
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 rounded-lg bg-academic-blue text-white text-sm hover:bg-academic-blue-light transition-colors"
        >
          回到首页
        </Link>
      </div>
    </div>
  )
}
