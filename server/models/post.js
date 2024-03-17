// common information about posts

import { Schema, model } from "mongoose";

const postSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
});

const Post = model("Post", postSchema);

export default Post;
