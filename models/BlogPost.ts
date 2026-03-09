import mongoose, { Schema, Document } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  author: mongoose.Types.ObjectId
  tags: string[]
  category?: string
  image?: string
  published: boolean
  views: number
  readTime: number
  createdAt: Date
  updatedAt: Date
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'General',
    },
    image: {
      type: String,
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
)

// Index for search
blogPostSchema.index({ title: 'text', content: 'text', tags: 'text' })
blogPostSchema.index({ slug: 1 })
blogPostSchema.index({ published: 1, createdAt: -1 })

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', blogPostSchema)
