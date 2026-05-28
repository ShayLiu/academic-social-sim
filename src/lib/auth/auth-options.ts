import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createServerClient } from '@/lib/supabase/server'
import { upsertProfile } from '@/lib/db/user-profiles'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '邮箱', type: 'email', placeholder: 'you@example.com' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const supabase = createServerClient()
        const { data: user, error } = await supabase
          .from('user_profiles')
          .select('id, user_id, email, display_name, avatar_url')
          .eq('email', credentials.email)
          .single()

        if (error || !user) return null

        // Check password from a separate credentials store or hashed field
        const { data: cred } = await supabase
          .from('user_credentials')
          .select('password_hash')
          .eq('user_id', user.user_id)
          .single()

        if (!cred?.password_hash) return null

        const isValid = await bcrypt.compare(
          credentials.password,
          cred.password_hash
        )
        if (!isValid) return null

        return {
          id: user.user_id,
          email: user.email,
          name: user.display_name,
          image: user.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        ;(session.user as { id?: string }).id = token.sub
      }
      return session
    },
    async signIn({ user, account }) {
      if (!user.id) return false

      try {
        await upsertProfile(user.id, {
          display_name: user.name ?? null,
          email: user.email ?? null,
          avatar_url: user.image ?? null,
        })
      } catch {
        // Don't block sign-in if profile upsert fails
        console.error('Failed to upsert user profile on sign-in')
      }

      return true
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
