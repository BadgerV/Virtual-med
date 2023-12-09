import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sender", // Reference to the user (patient or doctor) associated with the notification
      required: true,
    },
    sender: {
      type: String,
      enum: ["User", "Staff"],
    },
    type: {
      type: String,
      enum: ["payment", "message", "appointment", "other"], // Add other types as needed
      required: true,
    },
    recipients: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipientModel",
    },
    recipientModel: {
      type: String,
      enum: ["User", "Staff"],
    },
    chatId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Chat"
    },
    content: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Correct spelling here
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
