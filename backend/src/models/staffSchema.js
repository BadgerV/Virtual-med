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
    required: true,
  },
  certificate2: {
    type: Buffer,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});


export default StaffSchema;