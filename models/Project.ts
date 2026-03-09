import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  title: string
  slug: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    longDescription: {
      type: String,
      required: [true, 'Please provide a detailed description'],
    },
    image: {
      type: String,
      required: [true, 'Please provide a project image'],
    },
    technologies: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
      default: null,
    },
    githubUrl: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// Index for search and filtering
projectSchema.index({ title: 'text', description: 'text' })
projectSchema.index({ technologies: 1 })
projectSchema.index({ category: 1 })

export default mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema)
