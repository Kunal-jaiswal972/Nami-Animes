import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.MONGO_PROD_URI);
  console.log("Mongoose connected! Hurray");
  return db;
}

export default connect;
