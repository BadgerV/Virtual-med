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

    console.log(post)
    res.status(201).json(post);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
});
