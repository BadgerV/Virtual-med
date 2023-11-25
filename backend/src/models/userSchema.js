import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
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
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot include passord");
        }
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
  isPremium: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token : {
        type : String,
      }
    },
  ],
});

export default UserSchema;
