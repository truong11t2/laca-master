import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);

export default comment;
