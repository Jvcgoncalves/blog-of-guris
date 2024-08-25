import UserModel from "../models/user_model/userModel";

export default class CommonService {

  static async addPostToAuthor({ authorId, postId }: { authorId: string, postId: string }): Promise<{ code: number, message: string }> {
    const response = await UserModel.findByIdAndUpdate(authorId, { $push: { posts: postId } });
    console.log(response);
    return { code: 1, message: "success on add" }
  }

  static async removePostOfAuthor({ authorId, postId }: { authorId: string, postId: string }): Promise<{ code: number, message: string }> {
    const response = await UserModel.findByIdAndUpdate(authorId, { $pull: { posts: postId } });
    console.log(response);
    return { code: 1, message: "success on delete" }
  }

}