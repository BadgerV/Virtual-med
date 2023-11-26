import Staff from "../models/StaffModel.js";
import multer from "multer";
import User from "../models/UserModel.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import { isNullOrEmpty } from "../common/utils/helper.js";
import AppError from "../common/utils/appError.js";
import sharp from "sharp";

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

  res.status(200).send({ newStaff });
});

export const provideCredentials = catchAsync(async (req, res) => {
  // Access the files using req.files
  const certificate1 = req.files["certificate1"];
  const certificate2 = req.files["certificate2"];
  const passport = req.files["passport"];

  const certificate1Buffer = certificate1[0].buffer;

  const resizedBuffer = await sharp(certificate1Buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  res.send(resizedBuffer);
});
