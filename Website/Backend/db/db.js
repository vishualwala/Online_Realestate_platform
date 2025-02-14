import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};
