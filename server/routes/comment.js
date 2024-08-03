import { Router } from "express";
import protectRoute from "../middlewares/authMiddleware.js";
import comment from "../models/comment.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import Subscriber from "../models/subscriber.js";

dotenv.config();
const commentRouter = Router();

const createComment = asyncHandler(async (req, res, next) => {
  const { postId, parentId, content, email, name, subscribe } = req.body;

  if (subscribe) {
    // store user email into db
    try {
      await Subscriber.create({email,});
      //res.status(200).json({ success: true, message: "Saved Email" });
    } catch (err) {
      //next(err);
    }
  }

  let newComment = await comment.create({
    postId,
    parentId,
    content,
    email,
    name,
  });

  try {
    await newComment.save();
    res.json(newComment);
  } catch (error) {
    res.status(404).send("Comment could not be stored");
  }
});

const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  let comments = null;
  console.log("postId: ", postId);

  //Get comments from DB
  comments = await comment.find({ postId: postId }).sort({ _id: -1 });
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).send("There are still no comments");
  }
});

const getComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  console.log("commentId: ", commentId);

  //Get comments from DB
  let result = await comment.findById(commentId);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send("There are still no comment");
  }
});

const updateComment = asyncHandler(async (req, res) => {
  const { _id, content } = req.body;

  let oldComment = await comment.findById(_id);

  if (oldComment) {
    oldComment.content = content;
    try {
      await oldComment.save();
      res.json(oldComment);
    } catch (error) {
      res.status(404).send("Comment could not be updated");
    }
  } else {
    res.status(404).send("Comment could not be updated");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    let deletedComment = await comment.findByIdAndDelete(req.params.commentId);
    res.json(deletedComment);
  } catch (error) {
    res.status(404).send("Comment could not be deleted");
  }
});

const deleteComments = asyncHandler(async (req, res) => {
  try {
    let deletedComments = await comment.deleteMany({ postId: req.params.postId });
    res.json(deletedComments);
  } catch (error) {
    res.status(404).send("Comments could not be deleted");
  }
});

if (process.env.COMMENT_AUTHORIZATION === "true") {
  // with authorization
  commentRouter.route("/create").post(protectRoute, createComment);
  commentRouter.route("/:postId/get").get(getComments);
  commentRouter.route("/update").put(protectRoute, updateComment);
  commentRouter.route("/delete/:commentId").delete(protectRoute, deleteComment);
  commentRouter.route("/delete/post/:postId").delete(protectRoute, deleteComments);
} else {
  // without authorization
  commentRouter.route("/create").post(createComment);
  commentRouter.route("/:postId/get").get(getComments);
  commentRouter.route("/get/:commentId").get(getComment);
  commentRouter.route("/update").put(updateComment);
  commentRouter.route("/delete/:commentId").delete(deleteComment);
  commentRouter.route("/delete/post/:postId").delete(deleteComments);
}

export default commentRouter;
