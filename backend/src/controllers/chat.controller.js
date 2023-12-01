import Chat from "../models/ChatModel.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import AppError from "../common/utils/appError.js";
import User from "../models/UserModel.js";
import Staff from "../models/StaffModel.js";

//CREATES A NEW CHAT
export const accessChat = catchAsync(async (req, res) => {
  const user = req.user ? req.user : req.staff;

  //SINCE WE HAVE 2 TYPES OF SHEMAS WE CHECK IF THE REQ.USER IS A USER OR STAFF, THE PREVIOS STATEMENT RETURN TRUE
  const isUser = req.user ? true : false;

  const { userId } = req.body;

  if (!userId) {
    throw new AppError("UserId param not sent with request", 400);
  }

  if (!isUser) {
    const isStaff = Staff.findOne({
      $and: [
        { _id: user._id },
        { currentPatients: { $elemMatch: { userId } } },
      ],
    });

    if (!isStaff) {
      throw new AppError("This user is not you patient.");
    }
  } else {
    const isAllowedUser = User.findOne({
      $and: [
        { _id: user._id },
        { assignedDoctors: { $elemMatch: { userId } } },
      ],
    });

    if (!isAllowedUser) {
      throw new AppError("You are not a patient to this doctor");
    }
  }

  var isChat = await Chat.find({
    isCommunity: false,
    $and: [
      { users: { $elemMatch: { $eq: user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName lastName email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData;

    //CHECKS THE ISUSER PROPERTY AND PUSHES THE RESPECTIVE IDS INTO THEIR PROPER PALCES
    if (isUser) {
      chatData = {
        chatName: "sender",
        isCommunity: false,
        users: [user._id],
        staffMembers: [userId],
      };
    } else {
      chatData = {
        chatName: "sender",
        isCommunity: false,
        users: [userId],
        staffMembers: [user._id],
      };
    }

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      })
        .populate("users")
        .populate("staffMembers");

      res.status(200).send(FullChat);
    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
});
export const fetchChats = catchAsync(async (req, res) => {
  const user = req.user ? req.user : req.staff;
  const isUser = req.user ? true : false;

  const { userId } = req.body;

  if (isUser === true) {
    Chat.find({ users: { $elemMatch: { $eq: user._id } } })
      .populate("users")
      .populate("communityAdmin")
      .populate("latestMessage")
      .populate("staffMembers")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName lastName email",
        });
        res.status(200).send(results);
      });
  } else {
    Chat.find({
      $or: [
        { staffMembers: { $elemMatch: { $eq: user._id } } },
        { communityAdmin: user._id },
      ],
    })

      .populate("users")
      .populate("communityAdmin")
      .populate("latestMessage")
      .populate("staffMembers")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName lastName email",
        });
        res.status(200).send(results);
      });
  }
});
export const createCommunity = catchAsync(async (req, res) => {
  if (!req.body.name) {
    throw new AppError("Please fill all the fields", 400);
  }

  const community = await Chat.create({
    chatName: req.body.name,
    isCommunity: true,
    communityAdmin: req.staff._id,
  });

  const fullCommunity = await Chat.findOne({ _id: community._id })
    .populate("users")
    .populate("staffMembers")
    .populate("communityAdmin");

  res.status(200).send(fullCommunity);
});

export const renameCommunity = catchAsync(async (req, res) => {
  const { chatId, chatName } = req.body;

  const staff = req.staff;

  if (!chatId || !chatName) {
    throw new AppError("Please provide the required fields");
  }

  const chatToUpdate = await Chat.findOne({ _id: chatId }).populate(
    "communityAdmin"
  );

  if (!chatToUpdate) {
    throw new AppError("Community does not exist");
  }

  if (!chatToUpdate.communityAdmin._id.equals(staff._id)) {
    throw new AppError("You are not authorized to edit this community");
  } else if (chatToUpdate.isCommunity === false) {
    throw new AppError("This is not a community");
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users")
    .populate("staffMembers")
    .populate("communityAdmin");

  res.status(200).send(updatedChat);
});
export const addToCommunity = catchAsync(async (req, res) => {
  const isUser = req.user ? true : false;
  const { chatId } = req.body;

  if (isUser) {
    const foundUser = await User.findOne(
      { _id: req.user._id },
      { isPremium: true }
    );

    if (!foundUser) {
      throw new AppError("Become a premium user to access the feature", 400);
    }
  }

  const chatToUpdate = await Chat.findOne({ _id: chatId }).populate(
    "communityAdmin"
  );

  if (!chatToUpdate) {
    throw new AppError("Community not found", 400);
  }

  if (isUser) {
    if (chatToUpdate.users.includes(req.user._id)) {
      throw new AppError("Cannot add a user twice");
    }

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("users")
      .populate("staffMembers")
      .populate("communityAdmin");

    res.send(added);
  } else {
    if (
      chatToUpdate.staffMembers.includes(req.staff._id) ||
      chatToUpdate.communityAdmin_id.equals(req.staff._id)
    ) {
      throw new AppError("Cannot add a user twice");
    }

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { staffMembers: req.staff._id },
      },
      {
        new: true,
      }
    )
      .populate("users")
      .populate("staffMembers");
    res.status(200).send(added);
  }
});
export const removeFromCommunity = catchAsync(async (req, res) => {
  const { chatId, userId } = req.body;
  const staff = req.staff;

  const chatToUpdate = await Chat.findOne({ _id: chatId }).populate(
    "communityAdmin"
  );

  const isUser = (await User.findOne({ _id: userId })) ? true : false;

  if (!chatToUpdate) {
    throw new AppError("Community does not exist");
  }

  if (!chatToUpdate.communityAdmin._id.equals(staff._id)) {
    throw new AppError(
      "You are not authorized to delete members in this community"
    );
  } else if (chatToUpdate.isCommunity === false) {
    throw new AppError("This is not a community");
  }

  if (
    !chatToUpdate.users.includes(userId) ||
    !chatToUpdate.staffMembers.includes(userId)
  ) {
    throw new AppError("User is not in this community");
  }

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: isUser ? { users: userId } : { staffMembers: userId },
    },
    {
      new: true,
    }
  )
    .populate("users")
    .populate("staffMembers")
    .populate("communityAdmin");

  res.status(200).send(removed);
});

// const chatToUpdate = await Chat.findOne({ _id: chatId }).populate(
//   "communityAdmin"
// );

// const isUser = (await User.findOne({ _id: userId })) ? true : false;

// if (!chatToUpdate) {
//   throw new AppError("Community does not exist");
// }

// if (!chatToUpdate.communityAdmin._id.equals(staff._id)) {
//   throw new AppError(
//     "You are not authorized to add more members in this community"
//   );
// } else if (chatToUpdate.isCommunity === false) {
//   throw new AppError("This is not a community");
// }

// if (
//   chatToUpdate.users.includes(userId) ||
//   chatToUpdate.staffMembers.includes(userId)
// ) {
//   throw new AppError("Cannot add a user twice");
// }

// const added = await Chat.findByIdAndUpdate(
//   chatId,
//   {
//     $push: isUser ? { users: userId } : { staffMembers: userId },
//   },
//   {
//     new: true,
//   }
// )
//   .populate("users")
//   .populate("staffMembers")
//   .populate("communityAdmin");

// res.status(200).send(added);
