import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import { isNullOrEmpty } from "../common/utils/helper.js";

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

  if (alreadyUser) {
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

  const token = user.generateAuthToken();
  console.log(token);

  res.cookie("authToken", token, { httpOnly: true });

  await user.save();

  res.status(200).send(user);
});

export const getUser = catchAsync(async (req, res) => {
  console.log(req.user)
  res.send(req.user);
});
