import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import { Post, Reaction } from "../models/blogModel.js";

export const createPost = catchAsync(async (req, res) => {
  const staff = req.staff;

  const isStaff = !!staff;

  if (!isStaff) {
    throw new AppError("Only staffs can create posts");
  }

  try {
    const { title, content, tags, image } = req.body;
    const author = staff; // Assuming user information is available in the request
    const post = await Post.create({ title, content, tags, image, author });

    console.log(post);
    res.status(201).json(post);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
});

export const getThreePosts = catchAsync(async (req, res) => {
  try {
    const currentHour = new Date().getHours(); // Get the current hour of the day (0-23)

    // Fetch posts based on the current hour with a limit of 3 posts
    const posts = await Post.aggregate([
      // { $match: { hourToShow: currentHour } }, // Assuming 'hourToShow' is a field in the Post model
      { $sample: { size: 3 } }, // Fetch 3 random posts
    ]);

    res.send(posts);
  } catch (error) {
    console.error("Error fetching hourly posts:", error);
    throw new AppError("Failed to fetch hourly posts");
  }
});

export const getRecentPosts = catchAsync(async (req, res) => {
  try {
    // Fetch the last 10 recent posts with populated author details
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10).populate({
      path: "author",
      select: "firstName lastName", // Specify the fields you want to include
    });

    res.send(posts);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    throw new AppError("Failed to fetch recent posts");
  }
});

export const getPostById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    res.send(post);
  } catch (error) {
    throw new AppError("Failed to fetch post", 500);
  }
});

export const deletePostByid = catchAsync(async (req, res, next) => {
  const isStaff = !!req.staff;

  if (!isStaff) {
    throw new AppError("Only staffs are allowed to delete posts");
  }

  const user = req.staff;

  const { id } = req.params;

  const post = await Post.findById(id);
  console.log(post);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  if (post.author.toString() !== user.id) {
    throw new AppError("You are not allowed to delete this post");
  }

  try {
    await Post.deleteOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    throw new AppError("Unable to delete post", 500);
  }
});

export const getDoctorPost = catchAsync(async (req, res, next) => {
  const { doctorID } = req.params;
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
  const skip = (page - 1) * limit;

  const posts = await Post.find({ author: doctorID })
    .populate({
      path: "author",
      select: "firstname lastName email", // Specify the fields you want to include
    })
    .skip(skip)
    .limit(limit);

  if (!posts || posts.length === 0) {
    return next(new AppError("This doctor does not have any posts", 404));
  }

  const totalPosts = await Post.countDocuments({ author: doctorID });
  const totalPages = Math.ceil(totalPosts / limit);

  res.status(200).json({
    status: "success",
    results: posts.length,
    currentPage: page,
    totalPages,
    data: {
      posts,
    },
  });
});
