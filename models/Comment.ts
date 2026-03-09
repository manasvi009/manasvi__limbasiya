import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  post: mongoose.Types.ObjectId
  author: {
    name: string
    email: string
  }
  content: string
  parentComment?: mongoose.Types.ObjectId
  approved: boolean
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
    },
    author: {
      name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Please provide an email'],
      },
    },
    content: {
      type: String,
      required: [true, 'Please provide comment content'],
      maxlength: [5000, 'Comment cannot be more than 5000 characters'],
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    approved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

// Index for finding comments by post
commentSchema.index({ post: 1, createdAt: -1 })
commentSchema.index({ approved: 1 })

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema)
