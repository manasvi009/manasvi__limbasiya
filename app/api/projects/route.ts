import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Project from '@/models/Project'
import { z } from 'zod'

const createProjectSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(200),
  longDescription: z.string().min(50),
  image: z.string().url(),
  technologies: z.array(z.string()).min(1),
  category: z.string().min(2),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
})

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    let query: any = {}
    if (category) {
      query.category = category
    }
    if (featured === 'true') {
      query.featured = true
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query),
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[v0] Get projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsedData = createProjectSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedData.error.flatten() },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if slug exists
    const existingProject = await Project.findOne({ slug: parsedData.data.slug })
    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 409 }
      )
    }

    const project = new Project(parsedData.data)
    await project.save()

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('[v0] Create project error:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
