import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE}`);
    console.log(`MongoDB Connected: HOST_NAME: ${connection.connection.host}`);
  } catch (error) {
     console.log(error);
     process.exit(1);
  }
};

export default connectDB;