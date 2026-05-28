import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'

interface AuthUser {
  id: string
  email: string
  name: string
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions)

  if (!session?.user) return null

  const user = session.user as { id?: string; email?: string; name?: string }
  if (!user.id) return null

  return {
    id: user.id,
    email: user.email ?? '',
    name: user.name ?? '',
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized: user is not logged in')
  }

  return user
}
