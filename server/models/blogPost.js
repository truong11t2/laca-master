import mongoose, { mongo } from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contentOne: {
      type: String,
      required: true,
    },
    contentTwo: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogPost = mongoose.model("blogPost", blogPostSchema);

export default blogPost;
