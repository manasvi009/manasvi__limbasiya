import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`[v0] MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('[v0] MongoDB connection error:', error.message);
    process.exit(1);
  }
};
