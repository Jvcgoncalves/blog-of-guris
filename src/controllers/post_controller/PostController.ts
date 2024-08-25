import Post from "../../classes/Post/Post";
import { PostCodeMessage } from "../../enums/PostCodeMessages";
import IPost from "../../interfaces/Post";
import PostModel from "../../models/posts_model/postModel";
import CommonService from "../../services/CommonService";

export default class PostController {

  static async createPost({ authorId, blogContent }: { authorId: string, blogContent: {
    title: string,
    content: string
  } }): Promise<{ code : number, message: string, postId?: string }> {
    const newPostObject = new Post(authorId, blogContent.title, blogContent.content);
    console.log(newPostObject)
    const newPost = await PostModel.create({ ...newPostObject })

    if(newPost?._id) {
      const response = await CommonService.addPostToAuthor({ authorId, postId: newPost._id })
      console.log(response)
    }

    return { code : PostCodeMessage.POST_CREATED, message: "post created", postId: newPost?._id }
  }

  static async getPost({ postId }: { postId: string }): Promise<{ code: number, message: string, post?: IPost }> {

    const post = await PostModel.findById(postId);

    if(!post) {
      return { code: PostCodeMessage.POST_NOT_FOUND, message: "post not found" };
    }

    return { code: PostCodeMessage.POST_FOUND, message: "post found", post };
  }
}