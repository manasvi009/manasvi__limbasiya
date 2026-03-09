import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  content: z.string().min(50),
  excerpt: z.string().min(10).max(500),
  tags: z.array(z.string()).default([]),
  category: z.string().default('General'),
  image: z.string().url().optional(),
  published: z.boolean().default(false),
})

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const published = searchParams.get('published') !== 'false'

    const skip = (page - 1) * limit

    const query = published ? { published: true } : {}

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate('author', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[v0] Get posts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication (basic check - should be enhanced with session)
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const parsedData = createPostSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedData.error.flatten() },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if slug exists
    const existingPost = await BlogPost.findOne({ slug: parsedData.data.slug })
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      )
    }

    // Calculate read time (approximately 200 words per minute)
    const readTime = Math.ceil(parsedData.data.content.split(' ').length / 200)

    const post = new BlogPost({
      ...parsedData.data,
      readTime,
      author: body.authorId, // Should come from session
    })

    await post.save()

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('[v0] Create post error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
