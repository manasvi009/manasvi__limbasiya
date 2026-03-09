import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Comment from '@/models/Comment'
import BlogPost from '@/models/BlogPost'
import { z } from 'zod'

const createCommentSchema = z.object({
  postId: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  content: z.string().min(1).max(5000),
  parentCommentId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsedData = createCommentSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedData.error.flatten() },
        { status: 400 }
      )
    }

    await connectDB()

    // Verify post exists
    const post = await BlogPost.findById(parsedData.data.postId)
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Create comment
    const comment = new Comment({
      post: parsedData.data.postId,
      author: {
        name: parsedData.data.name,
        email: parsedData.data.email,
      },
      content: parsedData.data.content,
      parentComment: parsedData.data.parentCommentId || undefined,
    })

    await comment.save()

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('[v0] Create comment error:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const postId = searchParams.get('postId')
    const approved = searchParams.get('approved') !== 'false'

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      )
    }

    const query: any = { post: postId }
    if (approved) {
      query.approved = true
    }

    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('[v0] Get comments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
