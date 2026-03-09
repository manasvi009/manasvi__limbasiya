import mongoose, { Schema, Document } from 'mongoose'

export interface INewsletterSubscriber extends Document {
  email: string
  subscribed: boolean
  createdAt: Date
  updatedAt: Date
}

const newsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

// Index for finding by email
newsletterSubscriberSchema.index({ email: 1 })
newsletterSubscriberSchema.index({ subscribed: 1 })

export default mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', newsletterSubscriberSchema)
