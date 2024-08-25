import express, { Request, Response } from 'express';
import PostController from '../controllers/post_controller/PostController';
import { PostCodeMessage } from '../enums/PostCodeMessages';

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const { authorId, blogContent } = req.body;
  try {
    const response = await PostController.createPost({ authorId, blogContent });

    if(response.code <= PostCodeMessage.POST_NOT_CREATED) {
      res.status(500).json({ code: 500, message: response.message });
      return;
    }

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
})

router.get("/:postId", async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const response = await PostController.getPost({ postId })

    if(response.code <= PostCodeMessage.POST_NOT_CREATED) {
      res.status(500).json({ code: 500, message: response.message });
      return;
    }

    res.status(200).json(response.post);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
}) 

export default router;