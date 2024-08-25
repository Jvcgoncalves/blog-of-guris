import express, { Request, Response } from 'express';
import UserControler from '../controllers/user_controller/UserController';
import { UserCodeMessage } from '../enums/UserCodeMessages';

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const response = await UserControler.createNewUser({ email, password, username });

    if(response.code < UserCodeMessage.USER_REGISTED ) {
      res.status(500).json(response);
      return;
    }
    
    res.status(200).json(response.userId);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await UserControler.validateUserLogin({ email, password })

    if(response?.code < UserCodeMessage.USER_REGISTED ) {
      res.status(500).json(response);
      return;
    }

    res.status(200).json(response?.userId);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
})

router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const response = await UserControler.getUserData(userId)

    if(response?.code < UserCodeMessage.USER_REGISTED ) {
      res.status(500).json(response);
      return;
    }

    res.status(200).json(response.user);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
}) 

router.patch("/edit/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { changes, password } = req.body;
  try {
    const response = await UserControler.updateUserProfile({ userId, changes, password })

    if(response?.code < UserCodeMessage.USER_REGISTED ) {
      res.status(500).json(response);
      return;
    }

    res.status(200).json(response.userId);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

router.delete("/delete/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    const response = await UserControler.deleteUser({ userId, password });

    if(response?.code < UserCodeMessage.USER_DELETED ) {
      res.status(500).json(response);
      return;
    }

    res.status(200).json(response.userId);
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message});
  }
})

export default router;