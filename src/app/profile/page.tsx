'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-text-muted mb-4">个人中心即将上线</p>
        <Link href="/" className="text-sm text-academic-blue-light hover:underline">
          返回首页
        </Link>
      </motion.div>
    </div>
  )
}
