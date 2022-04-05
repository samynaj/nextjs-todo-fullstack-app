import mongoose, { Model } from "mongoose"

const { DATABASE_URL } = process.env

export const connect = async () => {
    const connection = await mongoose
      .connect(DATABASE_URL as string)
      .catch(err => console.log(err))
    console.log("Connected to MongoDB successfully")
  
    // TODO SCHEMA
    const TodoSchema = new mongoose.Schema({
      title: String,
      body: String,
      date: String,
      completed: Boolean,
    })
  
    // TODO MODEL
    const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
  
    return { connection, Todo }
  }