import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Comment from '@/models/Comment'
import { Types } from 'mongoose'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid comment ID' },
        { status: 400 }
      )
    }

    await connectDB()

    const comment = await Comment.findByIdAndDelete(id)

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('[v0] Delete comment error:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
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
        { error: 'Invalid comment ID' },
        { status: 400 }
      )
    }

    const body = await request.json()

    await connectDB()

    const comment = await Comment.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    )

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(comment)
  } catch (error) {
    console.error('[v0] Update comment error:', error)
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}
