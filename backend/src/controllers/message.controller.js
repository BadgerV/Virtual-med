import { catchAsync } from "../common/utils/errorHandler.js";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";
import AppError from "../common/utils/appError.js";
import User from "../models/UserModel.js";

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
    path: "chat.users chat.staffMembers",
    select: "email firstName lastName ",
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  });

  res.status(200).send(message);
});



export const allMessages = catchAsync(async (req, res) => {
  // const isUser = req.user ? true : false;
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "firstName lastName email")
    .populate("chat");

  res.status(200).send(messages);
});
