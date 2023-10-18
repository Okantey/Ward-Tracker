import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB connected on:  ${conn.connection.host}`)
  }
  catch (err) {
    console.log(err.message)
    process.exit(1);
  }
}

export default connectDB