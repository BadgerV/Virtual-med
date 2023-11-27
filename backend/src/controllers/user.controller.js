import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import { isNullOrEmpty } from "../common/utils/helper.js";
import Staff from "../models/StaffModel.js";
import https from "https";
import { ENVIRONMENT } from "../common/config/environment.js";

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

  const alreadyUser = await User.findOne({ email: email });

  const alreadyStaff = await Staff.findOne({ email: email });

  if (alreadyUser || alreadyStaff) {
    throw new AppError("Email already registered", 400);
  }
  const token = await newUser.generateAuthToken();
  // Store the token in a cookie
  res.cookie("auth", token, { httpOnly: true });
  await newUser.save();

  res.status(200).send({ newUser });
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
      const email = req.body.email;
      const reference = req.body.reference;
      const amount = ENVIRONMENT.APP.SUB_PRICE;
      // params
      const params = JSON.stringify({
        email: email,
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
            res.redirect(JSON.parse(data).data?.authorization_url);
            // return res.status(200).json(JSON.parse(data));
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
      const paymentReference = req.body.reference; // Adjust as needed

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

        apiRes.on("end", () => {
          const responseData = JSON.parse(data);

          // Check the status of the verification response
          if (responseData.status) {
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
