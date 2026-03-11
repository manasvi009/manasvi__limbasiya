import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/800x600?text=Project',
    },
    technologies: [String],
    links: {
      github: String,
      live: String,
      demo: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

export default mongoose.model('Project', projectSchema);
