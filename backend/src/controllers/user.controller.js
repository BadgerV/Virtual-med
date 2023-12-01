import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User, { PremiumSubscribers } from "../models/UserModel.js";
import { isNullOrEmpty } from "../common/utils/helper.js";
import Staff from "../models/StaffModel.js";
import https from "https";
import { ENVIRONMENT } from "../common/config/environment.js";
import { generateToken } from "../common/utils/helper.js";
import nodemailer from "nodemailer";
import { log } from "console";
import Chat from "../models/ChatModel.js";

// const Paystack = import("paystack");
// const sdk = await Paystack(process.env.PAYSTACK_PUBLIC_KEY);

// //GET USER
// export const getUser = catchAsync(async (req, res) => {
//   const user = {
//     name: "jc",
//     email: "coder",
//   };

//   if (!user) {
//     throw new AppError("User not found", 404);
//   }

//   return res.status(200).json(user);
// });

// Step 1: Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: ENVIRONMENT.APP.EMAIL,
    pass: ENVIRONMENT.APP.PASSWORD,
  },
});

export const registerUser = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    isNullOrEmpty(firstName) ||
    isNullOrEmpty(lastName) ||
    isNullOrEmpty(email) ||
    isNullOrEmpty(password)
  ) {
    throw new AppError("Please fill all the inputs", 400);
  }

  const newUser = new User(req.body);

  newUser.verificationToken = generateToken();

  // console.log(newUser.verificationToken);

  // // Step 2: Generate the verification link and compose the email
  // const verificationLink = `http://localhost:8000/user/verify?token=${newUser.verificationToken}`;

  // const mailOptions = {
  //   from: "your_email@gmail.com",
  //   to: newUser.email,
  //   subject: "Account Verification",
  //   text: `Click the following link to verify your account: ${verificationLink}`,
  // };

  // // Step 3: Send the email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

  // REMEMBER TO MAKE SURE THE ACCOUNT IS USELESS WITHOUT VERIFICATION

  const alreadyUser = await User.findOne({ email: email });

  const alreadyStaff = await Staff.findOne({ email: email });

  if (alreadyUser || alreadyStaff) {
    throw new AppError("Email already registered", 400);
  }
  const token = await newUser.generateAuthToken();

  // Store the token in a cookie
  await res.cookie("auth", token, { httpOnly: true });
  await newUser.save();

  res.status(200).send({ newUser });
});

export const verifyAccount = catchAsync(async (req, res) => {
  const { token } = req.query; // Get the token from the query parameters

  // Find the user by the verification token
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new AppError("Invalid token or user not found.", 400);
  }

  if (user.verificationToken === null && user.isVerified) {
    throw new AppError("User already verified", 400);
  }
  // Mark the user as verified (update your database accordingly)
  user.isVerified = true;
  user.verificationToken = null; // Optional: Clear the token after verification
  await user.save();

  res.status(200).send(user);
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (isNullOrEmpty(email) || isNullOrEmpty(password)) {
    throw new AppError("Please fill all the inputs", 400);
  }

  const user = await User.findByCredentials(password, email);

  const token = await user.generateAuthToken();
  // Set a cookie named 'authToken' with the encoded token
  await res.cookie("auth", token, { httpOnly: true });
  await user.save();

  res.status(200).send(user);
});

export const getUser = catchAsync(async (req, res) => {
  res.send(req.user);
});

// export const initiatePremiumSubscription = catchAsync(async (req, res) => {
//   const { amount, currency, email, reference } = req.body;

//   const Paystack = import("paystack");
//   const sdk = await Paystack(process.env.PAYSTACK_PUBLIC_KEY);

//   try {
//     const transaction = await sdk.initializeTransaction({
//       amount: amount,
//       currency: currency,
//       email: email,
//       reference: reference,
//     });

//     res.json({
//       status: "success",
//       data: {
//         authorizationUrl: transaction.data.authorization_url,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error initializing payment");
//   }
// });

const payStack = {
  acceptPayment: async (req, res) => {
    try {
      // request body from the clients
      const reference = req.body.reference;
      const amount = ENVIRONMENT.APP.SUB_PRICE;
      // params
      const params = JSON.stringify({
        email: req.user.email,
        amount: amount * 100,
        reference: reference,
      });
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: `Bearer ${ENVIRONMENT.APP.PAYSTACK}`,
          "Content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https
        .request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", (chunk) => {
            data += chunk;
          });
          apiRes.on("end", () => {
            // res.redirect(JSON.parse(data).data?.authorization_url);
            return res.status(200).json(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          console.error(error);
        });
      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      // Retrieve the payment reference from the request body or query parameters
      const paymentReference = req.params.reference; // Adjust as needed

      // Make a request to the Paystack API to verify the payment
      const verificationOptions = {
        hostname: "api.paystack.co",
        port: 443,
        path: `/transaction/verify/${paymentReference}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${ENVIRONMENT.APP.PAYSTACK}`,
          "Content-Type": "application/json",
        },
      };

      const verificationReq = https.request(verificationOptions, (apiRes) => {
        let data = "";

        apiRes.on("data", (chunk) => {
          data += chunk;
        });

        apiRes.on("end", async () => {
          const responseData = JSON.parse(data);

          // Check the status of the verification response
          if (
            responseData.data?.status == "success" &&
            responseData.data?.paid_at !== null
          ) {
            // await PremiumSubscribers.ids.push(req.user._id);
            req.user.isPremium = true;
            await req.user.save();
            // Payment verification successful
            return res.status(200).json({
              message: "Payment verification successful",
              data: responseData.data,
            });
          } else {
            // Payment verification failed
            return res.status(400).json({
              error: "Payment verification failed",
              data: responseData.data,
            });
          }
        });
      });

      verificationReq.on("error", (error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred during payment verification" });
      });

      verificationReq.end();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred during payment verification" });
    }
  },
};

export const initializePayment = payStack;

export const ConnectUserWithDoctor = catchAsync(async (req, res) => {
  const { staffId } = req.body;
  const user = req.user;

  // Check if the doctor is not occupied
  const isDoctorOccupied = await Staff.exists({
    _id: staffId,
    "currentPatients.7": { $exists: false },
  });

  if (!isDoctorOccupied) {
    throw new AppError("Doctor is occupied at the moment", 400);
  }

  // Find the doctor
  const foundStaff = await Staff.findOne({ _id: staffId });

  if (!foundStaff) {
    throw new AppError("Doctor not found!", 400);
  }

  // Check if the doctor is not already in pendingPatients or currentPatients
  if (
    foundStaff.pendingPatients.includes(user._id) ||
    foundStaff.currentPatients.includes(user._id)
  ) {
    throw new AppError("You are already a patient to this specialist");
  }

  // Update the doctor by pushing the new patient to pendingPatients
  foundStaff.pendingPatients.push(user._id);

  // Save the changes to the database
  await foundStaff.save();

  res.status(200).send(`Dr. ${foundStaff.lastName} has been notified.`);
});

export const allUsers = catchAsync(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, options: "i" } },
          { email: { $regex: req.query.search, options: "i" } },
          { lastName: { $regex: req.query.search, options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

export const joinCommunity = catchAsync(async (req,res) => {
  const { communityId } = req.body;
  const user = req.user;


  const foundChat = await Chat.findOne({_id : communityId});

  if(!foundChat) {
    throw new AppError("Community not found", 400);
  }

  
})