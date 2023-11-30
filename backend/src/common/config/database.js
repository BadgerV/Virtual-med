import mongoose from "mongoose";
import { ENVIRONMENT } from "./environment.js";
import AppError from "../utils/appError.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(ENVIRONMENT.DB.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected: " + conn.connection.host);
  } catch (error) {
    console.log("Error: " + error.message);
    throw new AppError("Could not connect to databse", 500);
    process.exit(1);
  }
};
