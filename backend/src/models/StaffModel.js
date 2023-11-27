import StaffSchema from "./staffSchema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../common/utils/appError.js";
import { ENVIRONMENT } from "../common/config/environment.js";

StaffSchema.methods.toJSON = function () {
  const staff = this;

  const staffObject = staff.toObject();

  delete staffObject.password;
  delete staffObject.medicalLisense;
  delete staffObject.boardCertification;
  // delete staffObject.passportImage;
  delete staffObject.hasProvidedCredentials;
  delete staffObject.accountType;
  delete staffObject.proofOfIdentity;
  delete staffObject.currentPatients;
  delete staffObject.allPatients;

  return staffObject;
};

//this is to compare the password with the already hashed passowrd
StaffSchema.statics.findByCredentials = async function (password, email) {
  const staff = await Staff.findOne({ email });

  if (!staff) {
    throw new AppError("Invalid login credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch) {
    throw new AppError("Incorrect password", 401);
  }

  return staff;
};

StaffSchema.statics.compareAndChangePasswords = async function (
  email,
  password,
  newPassword
) {
  const staff = await Staff.findOne({ email });

  if (!staff) {
    throw new AppError("staff does not exist", 404);
  }

  const isMatch = await bcrypt.compare(password, staff.password);
  if (isMatch) {
    staff.password = newPassword;
    await staff.save();
  } else {
    throw new AppError("Something went wrong", 401);
  }
};

//this is to generate auth tokens for the usrs for authentication
StaffSchema.methods.generateAuthToken = async function () {
  const staff = this;

  //   if(staff == null) {
  //     throw new AppError("No staff", 400)
  //   }

  const token = jwt.sign(
    {
      _id: staff._id.toString(),
      type: "staff",
    },
    ENVIRONMENT.APP.SECRET,
    {
      expiresIn: "1d",
    }
  );

  staff.tokens = staff.tokens.concat({ token });

  return token;
};

StaffSchema.pre("save", async function (next) {
  const staff = this;

  if (staff.isModified("password")) {
    staff.password = await bcrypt.hash(staff.password, 8);
  }

  next();
});
const Staff = mongoose.model("Staff", StaffSchema);

export default Staff;
