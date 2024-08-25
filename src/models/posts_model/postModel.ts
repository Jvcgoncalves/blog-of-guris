import mongoose, { Schema } from "mongoose";
import IPost from "../../interfaces/Post";

const postSchema: Schema = new Schema<IPost>({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "comments", required: true }
  ],
  createdAt: { type: Date, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  lastEdit: { type: Date, required: false }
});

const PostModel = mongoose.model<IPost>("posts", postSchema);
export default PostModel;