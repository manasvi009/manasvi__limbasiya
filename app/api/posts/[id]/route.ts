import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { Types } from 'mongoose'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name email avatar')

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('[v0] Get post error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    const body = await request.json()

    await connectDB()

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    )

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('[v0] Update post error:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const post = await BlogPost.findByIdAndDelete(id)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('[v0] Delete post error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
