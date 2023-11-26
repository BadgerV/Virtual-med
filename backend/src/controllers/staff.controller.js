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
  const files = req.files;
  const staff = req.staff;

  const {
    speciality,
    hourlyPrice,
    age,
    professionalMemberShip,
    professionalReferences,
    yearsOfExperience,
  } = req.body;

  if (
    isNullOrEmpty(speciality) ||
    hourlyPrice < 0 ||
    age < 0 ||
    age > 80 ||
    yearsOfExperience <= 0 ||
    !professionalReferences ||
    professionalReferences.length == 0
  ) {
    throw new AppError("Please validate all fields", 400);
  }
  // Save information about the uploaded images to MongoDB
  const images = await Promise.all(
    files.map(async (file) => {
      return file.buffer;
    })
  );

  if (images.length != 4) {
    throw new AppError(
      "Please upload 4 images, the Medical Lisense, Board Certification, Passport, Proof of Identity"
    );
  }

  staff.yearsOfExperience = yearsOfExperience;
  staff.speciality = speciality;
  staff.age = age;
  staff.hourlyPrice = hourlyPrice;
  staff.professionalMemberShip = professionalMemberShip;
  // staff.medicalLisense = images[0];
  // staff.boardCertification = images[1];
  // staff.passportImages = images[2];
  // staff.proofOfIdentity = images[3];

  for (var reference of professionalReferences) {
    staff.professionalReferences.push(reference)
  }

  await staff.save();

  res.status(200).send(staff);
});
