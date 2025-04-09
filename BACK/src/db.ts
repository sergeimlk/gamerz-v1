import mongoose from 'mongoose';
import "dotenv/config"

const connectDB = async () => {
  if (process.env.DB_URL) {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("[DB] MonogoDB connected.");
    }
    
    catch (error) {
      throw new Error('[DB][Error] MongoDB connection failed.');
    }
  }
}

export default connectDB;