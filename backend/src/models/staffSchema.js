import mongoose from "mongoose";
import validator from "validator";

const staffSchema = new mongoose.Schema({
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
});