import { strictTransportSecurity } from "helmet";
import mongoose from "mongoose";
import validator from "validator";

const tokenSchema = new mongoose.Schema(
  {
    token: String,
  },
  { _id: false }
);

export const premiumSubscribers = new mongoose.Schema(
  {
    ids: [{ _id: String }],
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => validator.isAlpha(value),
        message: "Name can only contain letters",
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => validator.isAlpha(value),
        message: "Name can only contain letters",
      },
    },
    nickName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
    },
    isPremium: {
      type: Boolean,
      default: true,
    },
    tokens: [tokenSchema],
    accountType: {
      type: String,
      default: "user",
      immutable: true, // Make the field immutable
    },
    verificationToken: {
      type: String,
      default: "Nothing yet",
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    assignedDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],

    paystackRef: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default UserSchema;
