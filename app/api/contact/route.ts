import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsedData = contactSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedData.error.flatten() },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, just validate and return success
    // In production, you would:
    // 1. Send email to admin
    // 2. Send confirmation email to user
    // 3. Save message to database

    console.log('[v0] Contact form submission:', {
      name: parsedData.data.name,
      email: parsedData.data.email,
      message: parsedData.data.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        message:
          'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
