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

// deploying routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// using error handler middleware
app.use(errorHandler);

export default app;
