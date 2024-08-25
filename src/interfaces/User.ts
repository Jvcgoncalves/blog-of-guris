import mongoose, { Document } from "mongoose";

export default interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  posts: mongoose.Types.ObjectId[];
}