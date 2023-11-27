import jwt, { decode } from "jsonwebtoken";
import User from "../../models/UserModel.js";
import AppError from "../utils/appError.js";
import { ENVIRONMENT } from "../config/environment.js";
import { catchAsync } from "../utils/errorHandler.js";
import Staff from "../../models/StaffModel.js";




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

export const staffAuth = catchAsync(async (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    throw new AppError("Please authenticate", 404);
  }
  try {
    const decoded = jwt.verify(token, ENVIRONMENT.APP.SECRET);

    if (decoded.type === "staff") {
      const staff = await Staff.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      req.token = token;
      req.staff = staff;
    } else {
      throw new AppError("Something went wrong", 404);
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
});

export const isPremium = catchAsync(async (req, res, next) => {
  const user = req.user;

  const foundUser = await User.findOne({ _id: user._id });

  if (foundUser.isPremium === true) {
    next();
  } else {
    throw new AppError(
      "Become a premium subscriber to enjoy this feature",
      400
    );
  }
});
