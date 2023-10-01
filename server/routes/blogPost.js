import { Router } from "express";
import protectRoute from "../middlewares/authMiddleware.js";
import blogPost from "../models/blogPost.js";
import asyncHandler from "express-async-handler";
import multer from "multer";
import fs from "fs";
import util from "util";
import { uploadS3, getFileStream } from "../utils/awsS3.js";

const blogPostRouter = Router();
const unlinkFile = util.promisify(fs.unlink);

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

const uploadfile = asyncHandler(async (req, res) => {
  // apply filter
  // resize

  console.log(req);
  upload(req, res, async (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // return res.json({
    //   success: true,
    //   url: "file/" + res.req.file.filename,
    //   fileName: res.req.file.filename,
    // });
    const file = res.req.file;
    const folder = res.req.body.folder;
    console.log(file);

    const result = await uploadS3(file, folder);
    await unlinkFile(file.path);
    console.log(result);
    return res.json({
      success: true,
      url: result.Location,
      fileName: result.Key,
    });
  });
});

const getBlogPostByCategory = asyncHandler(async (req, res) => {
  const { category, postId, nextPage } = req.params;
  let posts = null;
  console.log("pageItems: ", postId);

  if (nextPage === "true") {
    //Get all the posts
    if (category === "all") {
      posts = await blogPost
        .find({ _id: { $lt: postId } })
        .sort({ _id: -1 })
        .limit(4);
      // posts.map((post) => {
      //   console.log(post.id);
      // });
    }
    //Get the latest posts
    else if (category === "latest") {
      posts = await blogPost
        .find({ _id: { $lt: postId } })
        .sort({ updatedAt: -1 })
        .limit(4);
      // posts.map((post) => {
      //   console.log(post.id);
      // });
    }
    //Get only category
    else {
      posts = await blogPost
        .find({ $and: [{ category: category }, { _id: { $lt: postId } }] })
        .sort({ _id: -1 })
        .limit(4);
      // posts.map((post) => {
      //   console.log(post.id);
      // });
    }
  } else {
    //Get all the posts
    if (category === "all") {
      posts = await blogPost.find({}).sort({ _id: -1 }).limit(4);
      // posts.map((post) => {
      //   console.log(post.id);
      // });
    }
    //Get the latest posts
    else if (category === "latest") {
      posts = await blogPost.find({}).sort({ updatedAt: -1 }).limit(4);
      // posts.map((post) => {
      //   console.log(post.id);
      // });
    }
    //Get only category
    else {
      posts = await blogPost
        .find({ category: category })
        .sort({ _id: -1 })
        .limit(4);
      // posts.map((post) => {
      //   console.log(post.id);
      // });
    }
  }

  let status = posts.length === 4 ? 200 : 201; //201 response means last chunk of blog posts
  if (category === "latest") {
    res
      .status(status)
      .json(
        posts
          .sort((objA, objB) => Number(objB.updatedAt) - Number(objA.updatedAt))
          .slice(0, 4)
      );
  } else {
    res.status(status).json(posts.slice(0, 4));
  }
});

const getBlogPostByCountry = asyncHandler(async (req, res) => {
  const { country, postId, nextPage } = req.params;
  let posts = null;
  console.log("pageItems: ", postId);

  if (nextPage === "true") {
    //Get only country
    posts = await blogPost
      .find({ $and: [{ country: country }, { _id: { $lt: postId } }] })
      .sort({ updatedAt: -1 })
      .limit(4);
    // posts.map((post) => {
    //   console.log(post.id);
    // });
  } else {
    //Get only country
    posts = await blogPost
      .find({ country: country })
      .sort({ updatedAt: -1 })
      .limit(4);
    // posts.map((post) => {
    //   console.log(post.id);
    // });
  }

  let status = posts.length === 4 ? 200 : 201; //201 response means last chunk of blog posts
  res
    .status(status)
    .json(
      posts
        .sort((objA, objB) => Number(objB.updatedAt) - Number(objA.updatedAt))
        .slice(0, 4)
    );
});

const getBlogPost = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const str = req.params.id;
  var post = null;
  if (str.includes("-")) {
    post = await blogPost.findOne({ slug: str });
    //console.log(post);
  } else {
    post = await blogPost.findById(req.params.id);
    //console.log(post);
  }

  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Blog post not found.");
  }
});

const createBlogPost = async (req, res) => {
  const {
    image,
    title,
    content,
    category,
    country,
    introduction,
    author,
    isPublish,
    slug,
  } = req.body;

  const newPost = await blogPost.create({
    image,
    title,
    content,
    category: String(category).toLowerCase(),
    country: String(country).toLowerCase(),
    introduction,
    author,
    isPublish,
    slug,
  });
  await newPost.save();
  const posts = await blogPost.find({ title });
  if (newPost) {
    res.json(posts);
  } else {
    res.status(404).send("Blog post could not be stored.");
  }
};

const updateBlogPost = asyncHandler(async (req, res) => {
  const {
    _id,
    title,
    content,
    category,
    country,
    introduction,
    image,
    isPublish,
    slug,
  } = req.body;

  const post = await blogPost.findById(_id);

  if (post) {
    post.content = content;
    post.title = title;
    post.category = String(category).toLowerCase();
    post.country = String(country).toLowerCase();
    post.introduction = introduction;
    post.image = image;
    post.isPublish = isPublish;
    post.slug = slug;
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
blogPostRouter.route("/uploadfiles").post(uploadfile);
blogPostRouter.route("/post/:id").get(getBlogPost);
blogPostRouter.route("/:id").delete(protectRoute, deletePost);
blogPostRouter.route("/").put(protectRoute, updateBlogPost);
blogPostRouter.route("/:category/:postId/:nextPage").get(getBlogPostByCategory);
blogPostRouter
  .route("/country/:country/:postId/:nextPage")
  .get(getBlogPostByCountry);

export default blogPostRouter;
