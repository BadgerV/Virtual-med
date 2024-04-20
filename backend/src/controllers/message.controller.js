import { catchAsync } from "../common/utils/errorHandler.js";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";
import AppError from "../common/utils/appError.js";
import User from "../models/UserModel.js";
import Staff from "../models/StaffModel.js";
import { io } from "../server.js";

export const sendMessage = catchAsync(async (req, res) => {
  const isUser = req.user ? true : false;
  const user = req.user ? req.user : req.staff;

  const { content, chatId } = req.body;

  if (!content || !chatId) {
    throw new AppError("Please provide the content and the chatID", 400);
  }

  var newMessage = {
    sender: user._id,
    content: content,
    chat: chatId,
    senderModel: isUser ? "User" : "Staff",
  };

  var message = await Message.create(newMessage);

  message = await message.populate("sender", "firstName lastName");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "email firstName lastName ",
  });

  const foundChat = await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });

  if (foundChat.isCommunity === true) {
    // console.log("this is a community, do somethign");
  } else {
   
  }

  res.status(200).send(message);
});

export const allMessages = catchAsync(async (req, res) => {
  let messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "firstName lastName email")
    .populate("chat");

  messages = await Message.populate(messages, {
    path: "sender",
    select: "firstName lastName email",
  });

  messages = await Message.populate(messages, {
    path: "chat",
  });

  messages = await User.populate(messages, {
    path: "chat.users chat.staffMembers",
    select: "email firstName lastName nickName passportImage",
  });

  res.status(200).send(messages);
});
