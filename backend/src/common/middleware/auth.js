import jwt, { decode } from "jsonwebtoken";
import User from "../../models/UserModel.js";
import AppError from "../utils/appError.js";
import { ENVIRONMENT } from "../config/environment.js";
import { catchAsync } from "../utils/errorHandler.js";
import Staff from "../../models/StaffModel.js";

export const auth = catchAsync(async (req, res, next) => {
  // Retrieve the token from the cookie instead of the Authorization header
  // const token = req.cookies.auth;
  const token = req.header("Authorization").replace("Bearer ", "");

  //just another useless comment, I may need to rewrite all these code to make it scallable and possible for larger integration and maybe use another DB

  console.log(req.cookies.auth);

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

// export const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, ENVIRONMENT.APP.SECRET);
//     const user = await User.findOne({
//       _id: decoded._id,
//       "tokens.token": token,
//     });

//     if (!user) {
//       throw new Error();
//     }

//     req.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(400).send({ error: "Please authenticate" });
//   }
// };

export const staffAuth = catchAsync(async (req, res, next) => {
  // const token = req.cookies.auth;
  const token = req.header("Authorization").replace("Bearer ", "");
  // const token = req.cookies.auth;

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

export const isUserOrStaff = catchAsync(async (req, res, next) => {
  // const token = req.cookies.auth;
  let token;
  try {
    token = req.header("Authorization").replace("Bearer ", "");
  } catch (error) {
    throw new AppError("Please login to continue")
  }
  // const token = req.cookies.auth;

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
      next();
    } else if (decoded.type === "user") {
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

      console.log(req.user)

      next();
    }
  } catch (error) {
    console.log(error)
    throw new AppError(error, 401);
  }
});

export const isPremiumOrStaff = catchAsync(async (req, res, next) => {
  // const token = req.cookies.auth;
  const token = req.header("Authorization").replace("Bearer ", "");
  // const token = req.cookies.auth;

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
      next();
    } else if (decoded.type === "user") {
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

      if (user.isPremium === true) {
        next();
      } else {
        throw new AppError(
          "Become a premium subscriber to enjoy this feature",
          400
        );
      }
    }
  } catch (error) {
    throw new AppError(error, 401);
  }
});

export const isPremium = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Please authenticate", 400);
  }

  const foundUser = await User.findOne({ _id: user._id });

  if (!foundUser) {
    throw new AppError("User not found");
  }

  if (foundUser.isPremium === true) {
    next();
  } else {
    throw new AppError(
      "Become a premium subscriber to enjoy this feature",
      400
    );
  }
});

export const isAdmin = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Please authenticate", 400);
  }

  const foundUser = await User.findOne({ _id: user._id });

  if (foundUser.isAdmin) {
    next();
  } else {
    throw new AppError("You are not an admin", 400);
  }
});
