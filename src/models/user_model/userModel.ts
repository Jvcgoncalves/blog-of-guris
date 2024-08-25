import mongoose, { Schema } from "mongoose";
import IUser from "../../interfaces/User";
import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [
    {
      postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts", required: true }
    }
  ]
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password as string, 8);
  }
  next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  let update = this.getUpdate() as { password?: string };
  if (update?.password) {
    const hashedPassword = await bcrypt.hash(update?.password, 8);
    this.setUpdate({ ...update, password: hashedPassword });
  }
  next();
});

const UserModel = mongoose.model<IUser>("users", UserSchema);
export default UserModel;