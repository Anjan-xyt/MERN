import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/expressErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

// importing routes
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";
import commentRouter from "./routes/comment.router.js";
import likePostRouter from "./routes/like.post.router.js";
import likeCommentRouter from "./routes/like.comment.router.js";

// deploying routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/like-posts", likePostRouter);
app.use("/api/v1/like-comments", likeCommentRouter);

// using error handler middleware
app.use(errorHandler);

export default app;
