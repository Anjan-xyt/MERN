import mongoose from "mongoose";

const connectDataBase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DATABASE_NAME}`);
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDataBase;