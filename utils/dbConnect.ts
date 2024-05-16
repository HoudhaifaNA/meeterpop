import mongoose from "mongoose";

let dbUri = "mongodb://127.0.0.1:27017/test";

if (process.env.NODE_ENV === "production" && process.env.DB_URI) {
  dbUri = process.env.DB_URI;
}

export default async function connect() {
  try {
    const db = await mongoose.connect(dbUri, {});
    console.log(dbUri);
    console.log(`Connected to db successfully ✔`);
    return db;
  } catch (err) {
    console.log(`Error connecting to db 🔥`);
    console.log(err);
  }
}
