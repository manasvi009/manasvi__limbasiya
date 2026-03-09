import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const tags = searchParams.getAll('tags')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    let dbQuery: any = { published: true }

    // Text search
    if (query) {
      dbQuery.$text = { $search: query }
    }

    // Filter by tags
    if (tags.length > 0) {
      dbQuery.tags = { $in: tags }
    }

    // Filter by category
    if (category) {
      dbQuery.category = category
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(dbQuery)
        .populate('author', 'name email avatar')
        .sort(query ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(dbQuery),
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
    console.error('[v0] Search posts error:', error)
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    )
  }
}
