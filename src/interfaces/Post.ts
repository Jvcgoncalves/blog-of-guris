import mongoose, { Document } from "mongoose";

export default interface IPost extends Document {
  _id: string;
  author: mongoose.Types.ObjectId;
  title: string;
  content: string;
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  likes: number;
  dislikes: number;
  lastEdit: Date;
}