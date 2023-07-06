import { Router } from "express";
import protectRoute from "../middlewares/authMiddleware.js";
import comment from "../models/comment.js";
import asyncHandler from "express-async-handler";

const commentRouter = Router();

const createComment = asyncHandler(async (req, res) => {
  const { postId, parentId, content, email, name } = req.body;

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

const getComment = asyncHandler(async (req, res) => {
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

commentRouter.route("/create").post(protectRoute, createComment);
commentRouter.route("/:postId/get").get(getComment);
commentRouter.route("/update").put(protectRoute, updateComment);
commentRouter.route("/delete/:commentId").delete(protectRoute, deleteComment);
commentRouter.route("/delete/post/:postId").delete(protectRoute, deleteComments);

export default commentRouter;
