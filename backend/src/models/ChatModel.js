import mongoose from "mongoose";


//chat schema
const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
      required: true,
    },
    isCommunity: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to 'User' model
      },
    ],
    staffMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff", // Reference to 'Staff' model
      },
    ],
    senderModel: {
      type: String,
      enum: ["User", "Staff"], // Add other possible values if needed
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    communityAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
