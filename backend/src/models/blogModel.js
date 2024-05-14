import mongoose from "mongoose";

// Define Schema for Post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff", // Assuming you have a User model
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Schema for Comment
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    enum: ["User" | "Staff"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define Schema for Reaction
const reactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    enum: ["User" | "Staff"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create models from schemas
export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);
export const Reaction = mongoose.model("Reaction", reactionSchema);

