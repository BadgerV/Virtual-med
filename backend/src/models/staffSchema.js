import mongoose from "mongoose";
import validator from "validator";

const StaffSchema = new mongoose.Schema({
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
    required: true,
    trim: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value > 0,
      message: "Age must be a positive integer",
    },
  },
  cerfiticate1: {
    type: Buffer,
  },
  certificate2: {
    type: Buffer,
  },
  speciality: {
    type: String,
  },
  location: {
    type: String,
  },
  isActive: {
    type: String,
    default: true,
  },
  hourlyPrice: {
    type: Number,
  },
});

export default StaffSchema;
