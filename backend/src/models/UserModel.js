import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../common/utils/appError.js";
import { ENVIRONMENT } from "../common/config/environment.js";
import UserSchema from "./UserSchema.js";
import { premiumSubscribers } from "./UserSchema.js";

// UserSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.isPremium;
//   delete userObject.accountType;
//   delete userObject.verificationToken;
//   delete userObject.isVerified;
//   // delete userObject.assignedDoctors;
//   // delete userObject.isPremium;
//   return userObject;
// };

//this is to compare the password with the already hashed passowrd
UserSchema.statics.findByCredentials = async function (password, email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid login credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Incorrect password", 401);
  }

  return user;
};

UserSchema.statics.compareAndChangePasswords = async function (
  email,
  password,
  newPassword
) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    user.password = newPassword;
    await user.save();
  } else {
    throw new AppError("Something went wrong", 401);
  }
};

//this is to generate auth tokens for the usrs for authentication
UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  //   if(user == null) {
  //     throw new AppError("No user", 400)
  //   }

  const token = jwt.sign(
    { _id: user._id.toString(), type: "user" },
    ENVIRONMENT.APP.SECRET,
    {
      expiresIn: "1d",
    }
  );

  user.tokens = user.tokens.concat({ token });

  return token;
};

//this is to has the password before signup or before the password is cahnged
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", UserSchema);
export const PremiumSubscribers = mongoose.model(
  "PremiumSubscribebrs",
  premiumSubscribers
);

export default User;
