import mongoose from "mongoose";

export default interface IComment extends Document {
  _id: string;
  content: string;
  postRelatedId: mongoose.Types.ObjectId;
  creator: mongoose.Types.ObjectId;
}