import mongoose, { Schema, Document } from 'mongoose'
import bcryptjs from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  bio?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
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
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function (password: string) {
  return await bcryptjs.compare(password, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)
