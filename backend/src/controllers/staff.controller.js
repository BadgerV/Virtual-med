import Staff from "../models/StaffModel.js";
import User from "../models/UserModel.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import { generateToken, isNullOrEmpty } from "../common/utils/helper.js";
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

  newStaff.verificationToken = generateToken();

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

export const verifyAccount = catchAsync(async (req, res) => {
  const { token } = req.body;

  // Find the user by the verification token
  const staff = await Staff.findOne({ verificationToken: token });

  if (!staff) {
    throw new AppError("Invalid token or staff not found.", 400);
  }
  // Mark the staff as verified (update your database accordingly)
  staff.isVerified = true;
  staff.verificationToken = null; // Optional: Clear the token after verification
  await staff.save();

  res.status(200).send("Account verified successfully");
});

export const loginStaff = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (isNullOrEmpty(email) || isNullOrEmpty(password)) {
    throw new AppError("Please fill all the inputs", 400);
  }

  const staff = await Staff.findByCredentials(password, email);

  const token = await staff.generateAuthToken();
  // Set a cookie named 'authToken' with the encoded token
  await res.cookie("auth", token, { httpOnly: true });
  await staff.save();

  res.status(200).send(staff);
});

export const getUser = catchAsync(async (req, res) => {
  res.send(req.user);
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
  staff.medicalLisense = images[0];
  staff.boardCertification = images[1];
  staff.passportImages = images[2];
  staff.proofOfIdentity = images[3];

  for (var reference of professionalReferences) {
    staff.professionalReferences.push(reference);
  }

  await staff.save();

  res.status(200).send(staff);
});

export const getStaff = catchAsync(async (req, res) => {
  res.send(req.staff);
});

export const getStaffs = catchAsync(async (req, res) => {
  const staffs = await Staff.find({});

  res.status(200).send(staffs);
});

export const getActiveStaffs = catchAsync(async (req, res) => {
  const activeStaffs = await Staff.find({ isActive: false });

  res.status(200).send(activeStaffs);
});

export const getSpecialists = catchAsync(async (req, res) => {
  const { speciality } = req.params;
  const foundSpecialists = await Staff.find({
    speciality: { $regex: new RegExp(speciality, "i") },
  });

  res.status(200).send(foundSpecialists);
});

export const approvePatient = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const staff = req.staff;

  // Check if the user is a premium user
  const user = await User.findOne({ _id: userId, isPremium: true });

  if (!user) {
    throw new AppError("Please subscribe to enjoy this feature", 400);
  }

  const isUserPending = staff.pendingPatients.includes(userId);
  const isAlreadyPatient = staff.currentPatients.includes(userId);

  if (!isUserPending) {
    throw new AppError("User is not in your pending patients list");
  }

  if (isAlreadyPatient) {
    throw new AppError("User is already your patient");
  }
  // Use filter to create a new array without the userId
  const pendingPatients = staff.pendingPatients.filter(
    (patientId) => patientId != userId
  );

  // Add the userId to the currentPatients array
  staff.currentPatients.push(userId);
  user.assignedDoctors.push(staff._id);
  staff.pendingPatients = pendingPatients;

  // Save the changes to the database
  await staff.save();
  await user.save();

  // Return an object with currentPatients and pendingPatients
  res
    .status(200)
    .send(`${user.firstName} has been added to you patient list successfully`);
});

export const viewPendingPatients = catchAsync(async (req, res) => {
  const staff = req.staff;

  const pendingPatients = await Promise.all(
    staff.pendingPatients.map(async (patientId) => {
      const patient = await User.findOne({ _id: patientId });
      return patient;
    })
  );

  res.send(pendingPatients);
});
