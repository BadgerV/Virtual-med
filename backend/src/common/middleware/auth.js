import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";
import AppError from "../utils/appError.js";
import { ENVIRONMENT } from "../config/environment.js";
import { catchAsync } from "../utils/errorHandler.js";

export const auth = catchAsync(async (req, res, next) => {
  // Retrieve the token from the cookie instead of the Authorization header
  const token = req.cookies.auth;

  if (!token) {
    throw new AppError("Please authenticate", 404);
  }

  try {
    // Verify the token directly without additional decoding
    const decoded = jwt.verify(token, ENVIRONMENT.APP.SECRET);

    // Find the user based on the decoded token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Attach token and user to the request
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
});
