import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import NewsletterSubscriber from '@/models/NewsletterSubscriber'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsedData = subscribeSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if already subscribed
    const existingSubscriber = await NewsletterSubscriber.findOne({
      email: parsedData.data.email,
    })

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        )
      } else {
        // Resubscribe
        existingSubscriber.subscribed = true
        await existingSubscriber.save()
        return NextResponse.json(
          { message: 'Successfully resubscribed to newsletter' },
          { status: 200 }
        )
      }
    }

    // Create new subscriber
    const subscriber = new NewsletterSubscriber({
      email: parsedData.data.email,
      subscribed: true,
    })

    await subscriber.save()

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Newsletter subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
