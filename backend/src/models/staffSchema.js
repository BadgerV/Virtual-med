import mongoose from "mongoose";
import validator from "validator";

// const referenceSchema = new mongoose.Schema(
//   {
//     nameOfReference: String,
//     numberOfReference: String,
//   },
//   { _id: false } // Disable _id for the professionalReferences subdocument
// );

const tokenSchema = new mongoose.Schema(
  {
    token: String,
  },
  { _id: false }
);

const StaffSchema = new mongoose.Schema(
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
      validate: {
        validator: (value) => {
          // Use the validator library to check if the password is strong enough
          // You can customize the strength criteria based on your requirements
          return validator.isStrongPassword(value, {
            minLength: 8,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 1,
          });
        },
        message:
          "Password must be strong with at least 8 characters, including uppercase, lowercase, and numbers",
      },
    },
    yearsOfExperience: {
      type: Number,
      trim: true,
      validate: {
        validator: (value) => Number.isInteger(value) && value > 0,
        message: "Age must be a positive integer",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      // required: true,
    },
    medicalLisense: {
      type: String,
      required: true,
    },
    boardCertification: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
    },
    passportImage: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      default: true,
    },
    hourlyPrice: {
      type: Number,
      required: true,
    },
    accountType: {
      type: String,
      default: "staff",
      immutable: true, // Make the field immutable
    },
    proofOfIdentity: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      required: true,
      type: Date,
    },
    professionalMemberShip: {
      type: String,
    },
    major: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    graduationDate: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
    },
    noOfRatings: {
      type: Number,
    },
    tokens: [tokenSchema],

    verificationToken: {
      type: String,
      default: "Nothing yet",
    },
    CV: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    degreeCertificate: {
      type: String,
      required: true,
    },
    POMI: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
    currentPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    allPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default StaffSchema;
