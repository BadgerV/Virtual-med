import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import { isNullOrEmpty } from "../common/utils/helper.js";
import Staff from "../models/StaffModel.js";

// //GET USER
// export const getUser = catchAsync(async (req, res) => {
//   const user = {
//     name: "jc",
//     email: "coder",
//   };

//   if (!user) {
//     throw new AppError("User not found", 404);
//   }

//   return res.status(200).json(user);
// });

export const registerUser = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    isNullOrEmpty(firstName) ||
    isNullOrEmpty(lastName) ||
    isNullOrEmpty(email) ||
    isNullOrEmpty(password)
  ) {
    throw new AppError("Please fill all the inputs", 400);
  }

  const newUser = new User(req.body);

  const alreadyUser = await User.findOne({ email: email });

  const alreadyStaff = await Staff.findOne({ email: email });

  if (alreadyUser || alreadyStaff) {
    throw new AppError("Email already registered", 400);
  }
  const token = await newUser.generateAuthToken();
  // Store the token in a cookie
  res.cookie("authToken", token, { httpOnly: true });
  await newUser.save();

  res.status(200).send({ newUser });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (isNullOrEmpty(email) || isNullOrEmpty(password)) {
    throw new AppError("Please fill all the inputs", 400);
  }

  const user = await User.findByCredentials(password, email);

  const token = await user.generateAuthToken();
  // Set a cookie named 'authToken' with the encoded token
  await res.cookie("auth", token, { httpOnly: true });
  await user.save();

  res.status(200).send(user);
});

export const getUser = catchAsync(async (req, res) => {
  res.send(req.user);
});
