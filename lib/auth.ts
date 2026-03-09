import { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from './mongodb'
import User from '@/models/User'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        try {
          await connectDB()

          const user = await User.findOne({
            email: parsedCredentials.data.email,
          }).select('+password')

          if (!user) {
            return null
          }

          const isPasswordValid = await user.comparePassword(
            parsedCredentials.data.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('[v0] Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
} satisfies NextAuthConfig

export async function getUserSession() {
  const { auth } = await import('next-auth')
  return await auth()
}
