import Staff from "../models/StaffModel.js";
import multer from "multer";
import User from "../models/UserModel.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import { isNullOrEmpty } from "../common/utils/helper.js";
import AppError from "../common/utils/appError.js";

export const registerStaff = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    isNullOrEmpty(firstName) ||
    isNullOrEmpty(lastName) ||
    isNullOrEmpty(email) ||
    isNullOrEmpty(password)
  ) {
    throw new AppError("Please fill all the inputs", 400);
  }

  const newStaff = new Staff(req.body);

  const alreadyStaff = await Staff.findOne({ email: email });

  const alreadyUser = await User.findOne({ email: email });

  if (alreadyStaff || alreadyUser) {
    throw new AppError("Email already registered", 400);
  }
  const token = await newStaff.generateAuthToken();
  // Store the token in a cookie
  res.cookie("auth", token, { httpOnly: true });
  await newStaff.save();


  res.status(200).send({newStaff});
});

export const provideCredentials = catchAsync(async (req, res) => {
  res.status(200).send(req.staff);
});
