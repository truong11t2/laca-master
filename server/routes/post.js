import { Router } from "express";
import Post from "../models/post.js";

// views stores the number of views on an article
export async function views(req, res) {
  const { postId } = req.body;
  let post = await Post.findOne({ postId: postId });
  //console.log(post);
  if (post) {
    post.views += 1;
    try {
      await post.save();
      res.status(200).json(post.views);
    } catch (error) {
      console.log(error);
      res.status(500).send("Views could not be updated");
    }
  } else {
    // create post view
    try {
      await Post.create({ postId: postId, views: 1 });
      res.status(200).json(1);
    } catch (error) {
      console.log(error);
      res.status(500).send("Views could not be stored");
    }
  }
}

const postViewRouter = Router();

postViewRouter.route("/post-view").post(views);

export default postViewRouter;
