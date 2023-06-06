import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
// import dotenv from "dotenv"; //Use it like: 'dotenv.config()' or
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
// In above routes, We have given custom URL prefixes like '/api/v1/task' or '/api/v1/users'

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Using Error Middleware
app.use(errorMiddleware);
// Now we have exported this file to server.js, So now we will be listening it in server.js. Therefore, below code is not required here.

// app.listen(4000, () => {
//   console.log("Server is working...");
// });
