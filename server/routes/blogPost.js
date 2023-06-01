import { Router } from "express";
import protectRoute from "../middlewares/authMiddleware.js";
import blogPost from "../models/blogPost.js";
import asyncHandler from "express-async-handler";

const blogPostRouter = Router();

const getBlogPostByCategory = asyncHandler(async (req, res) => {
  const { category, pageNumber } = req.params;

  const posts = await blogPost.find({});
  const increment = pageNumber + 4;

  let getStatus = () => (increment < posts.length ? 200 : 201); //201 response means last chunk of blog posts
  if (category === "all") {
    res.status(getStatus()).json(posts.slice(pageNumber, increment));
  } else if (category === "latest") {
    res
      .status(getStatus())
      .json(posts.sort((objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)).slice(pageNumber, increment));
  } else {
    const posts = await blogPost.find({ category });
    res.status(getStatus()).json(posts.slice(pageNumber, increment));
  }
});

const getBlogPost = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const post = await blogPost.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Blog post not found.");
  }
});

const createBlogPost = async (req, res) => {
  const { image, title, content, category, country, author = "Truong Hoang" } = req.body;

  const newPost = await blogPost.create({
    image,
    title,
    content,
    category: String(category).toLowerCase(),
    country,
    author,
  });
  await newPost.save();
  const posts = await blogPost.find({});
  if (newPost) {
    res.json(posts);
  } else {
    res.status(404).send("Blog post could not be stored.");
  }
};

const updateBlogPost = asyncHandler(async (req, res) => {
  const { _id, title, content, category, country, image } = req.body;

  const post = await blogPost.findById(_id);

  if (post) {
    post.content = content;
    post.title = title;
    post.category = category;
    post.country = country;
    post.image = image;
    await post.save();

    const posts = await blogPost.find({});
    res.json(posts);
  } else {
    res.status(404).send("Blog post could not be updated");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await blogPost.findByIdAndDelete(req.params.id);

  const allPosts = await blogPost.find({});

  if (allPosts) {
    res.json(allPosts);
  } else {
    res.status(404).send("Blog post could not be removed.");
  }
});

blogPostRouter.route("/").post(protectRoute, createBlogPost);
blogPostRouter.route("/post/:id").get(getBlogPost);
blogPostRouter.route("/:id").delete(protectRoute, deletePost);
blogPostRouter.route("/").put(protectRoute, updateBlogPost);
blogPostRouter.route("/:category/:pageNumber").get(getBlogPostByCategory);

export default blogPostRouter;
