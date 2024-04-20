import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import Staff from "../models/StaffModel.js";

export const listUnverifiedUsers = catchAsync(async (req, res) => {
  const foundUnverifiedUseres = await Staff.find({ isVerified: false }).select(
    "-password -currentPatients"
  );

  res.send(foundUnverifiedUseres);
});

export const verifyUser = catchAsync(async (req, res) => {
  const foundUser = await Staff.findOne({ _id: req.body.userId });

  foundUser.isVerified = true;

  await foundUser.save();

  res.send(foundUser);
});
