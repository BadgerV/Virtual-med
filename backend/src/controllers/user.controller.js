import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import { isNullOrEmpty } from "../common/utils/helper.js";

//GET USER
export const getUser = catchAsync(async (req, res) => {
  const user = {
    name: "jc",
    email: "coder",
  };

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return res.status(200).json(user);
});

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

  const alreadyUser = await User.findOne({ email: req.body.email });

  if (alreadyUser) {
    throw new AppError("Email already registeres", 400);
  }
  const token = await newUser.generateAuthToken();
  await newUser.save();

  res.status(200).send({ newUser, token });
});
