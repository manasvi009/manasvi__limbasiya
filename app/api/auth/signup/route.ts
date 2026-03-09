import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsedData = signupSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedData.error.flatten() },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: parsedData.data.email })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const user = new User(parsedData.data)
    await user.save()

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
