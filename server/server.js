import dotenv from "dotenv";
dotenv.config();
import db from "./db.js";
import express from "express";
import path from "path";
import cors from "cors";

//Our Routes
import blogPostRouter from "./routes/blogPost.js";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import privateRouter from "./routes/private.js";
import errorHandler from "./middlewares/error.js";
import commentRouter from "./routes/comment.js";
import subscriberRouter from "./routes/subscriber.js";

db();
const app = express();
app.use(cors());

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
    limit: "50mb",
  })
);

app.use("/api/blog-posts", blogPostRouter);
app.use("/api/admin", adminRouter);
app.use("/api/comment", commentRouter);
app.use("/api/subscribe", subscriberRouter);
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

app.get("/api/config/emailjs", (req, res) =>
  res.send({
    template_id: process.env.TEMPLATE_ID,
    service_id: process.env.SERVICE_ID,
    public_key: process.env.PUBLIC_KEY,
  })
);

const __dirname = path.resolve();
app.use("/file", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Error Handler Middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
