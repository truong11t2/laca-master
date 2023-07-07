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
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

const blogPost = mongoose.model("blogPost", blogPostSchema);

export default blogPost;
