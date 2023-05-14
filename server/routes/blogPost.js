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
    const blogPosts = await blogPost.find({ category });
    res.status(getStatus()).json(blogPosts.slice(pageNumber, increment));
  }
});

const getBlogPost = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const blogPost = await blogPost.findById(req.params.id);

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).send("Blog post not found.");
  }
});

const createBlogPost = async (req, res) => {
  const { image, title, contentOne, contentTwo, category, author = "Truong Hoang" } = req.body;

  const newBlogPost = await blogPost.create({
    image,
    title,
    contentOne,
    contentTwo,
    category: String(category).toLowerCase(),
    author,
  });
  await newBlogPost.save();
  const blogPosts = await blogPost.find({});
  if (newBlogPost) {
    res.json(blogPosts);
  } else {
    res.status(404).send("Blog post could not be stored.");
  }
};

const updateBlogPost = asyncHandler(async (req, res) => {
  const { _id, title, contentOne, contentTwo, category, image } = req.body;

  const blogPost = await blogPost.findById(_id);

  if (blogPost) {
    blogPost.contentOne = contentOne;
    blogPost.contentTwo = contentTwo;
    blogPost.title = title;
    blogPost.category = category;
    blogPost.image = image;
    await blogPost.save();

    const blogPosts = await blogPost.find({});
    res.json(blogPosts);
  } else {
    res.status(404).send("Blog post could not be updated");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const blogPost = await blogPost.findByIdAndDelete(req.params.id);

  const allBlogPosts = await blogPost.find({});

  if (allBlogPosts) {
    res.json(allBlogPosts);
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
