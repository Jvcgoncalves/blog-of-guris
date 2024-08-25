import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import startMongo from './config/database';
import postRouter from './routes/postsRoutes';
import "../vercel.json";
const cors = require("cors");

startMongo();

const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRouter);
// app.use("/comments")

app.use("/", (req: Request, res: Response) => {
  res.send("Worked")
});

app.listen(port, () => console.log("success, port: ", port));