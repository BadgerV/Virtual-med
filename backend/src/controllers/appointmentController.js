import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import Appointment from "../models/AppointmentModel.js";
import Staff from "../models/StaffModel.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ENVIRONMENT } from "../common/config/environment.js";
import https from "https";

export const fetchAppointments = catchAsync(async (req, res) => {
  const isUser = req.user ? true : false;
  console.log(isUser);

  if (isUser) {
    const foundUser = await User.findOne({ _id: req.user._id });

    if (!foundUser) {
      throw new AppError("User does not exist", 400);
    }

    if (foundUser.isPremium == false) {
      throw new AppError("Become a premium user to enjoy this feature", 400);
    }

    const appointments = await Appointment.find({
      patientId: req.user._id,
      status: "confirmed", // Assuming the status property is named 'status' in your model
    }).populate("doctorId");

    if (appointments.length < 1) {
      res.send("You don't have any appointments yet");
    } else {
      res.status(200).send(appointments);
    }
  } else {
    const foundStaff = await Staff.findOne({ _id: req.staff._id });

    if (!foundStaff) {
      throw new AppError("User does not exist", 400);
    }

    const appointments = await Appointment.find({
      doctorId: req.staff._id,
    }).populate("doctorId");

    if (appointments.length < 1) {
      res.send("You don't have any appointments yet");
    } else {
      res.status(200).send(appointments);
    }
  }
});

const checkAvailability = async (doctorId, appointmentTime, duration) => {
  const existingAppointments = await Appointment.find({ doctorId });

  const appointmentEndTime = new Date(
    appointmentTime.getTime() + duration * 60 * 1000
  );

  for (const existingAppointment of existingAppointments) {
    const existingStartTime = existingAppointment.appointmentTime;
    const existingEndTime = new Date(
      existingStartTime.getTime() + existingAppointment.duration * 60 * 1000
    );

    if (
      (appointmentTime >= existingStartTime &&
        appointmentTime < existingEndTime) ||
      (appointmentEndTime > existingStartTime &&
        appointmentEndTime <= existingEndTime) ||
      (existingStartTime >= appointmentTime &&
        existingEndTime <= appointmentEndTime)
    ) {
      return false; // Appointment conflicts with existing appointment
    }
  }

  return true; // Appointment does not conflict with existing appointments
};

const payStack = {
  acceptPayment: async (req, res, reference, price, email) => {
    try {
      // request body from the clients
      // params
      const params = JSON.stringify({
        email: email,
        amount: price * 100,
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
  verifyPayment: (req, res, paymentReference) => {
    return new Promise((resolve, reject) => {
      try {
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
            if (
              responseData.data?.status == "success" &&
              responseData.data?.paid_at !== null
            ) {
              // Payment verification successful
              resolve({
                message: "Payment verification successful",
                data: responseData.data,
              });
            } else {
              // Payment verification failed
              resolve(undefined);
            }
          });
        });

        verificationReq.on("error", (error) => {
          console.error(error);
          reject({
            error: "An error occurred during payment verification",
          });
        });

        verificationReq.end();
      } catch (error) {
        console.error(error);
        reject({
          error: "An error occurred during payment verification",
        });
      }
    });
  },
};

export const makeAppointment = catchAsync(async (req, res) => {
  const isUser = req.user ? true : false;
  // console.log(req.user)

  if (!isUser) {
    throw new AppError("You are a staff, you cannot make an appointment", 400);
  }

  const { doctorId, appointmentTime, duration, notes } = req.body;

  const foundDoctor = await Staff.findOne({ _id: doctorId });

  if (!doctorId || !appointmentTime || !notes || !duration) {
    throw new AppError("Please fill out all the fields");
  }
  const realAppointmentTime = new Date(appointmentTime);

  const availability = await checkAvailability(
    doctorId,
    realAppointmentTime,
    duration
  );

  if (!availability) {
    throw new AppError("Appointment time is not available", 400);
  }

  const paymentReference = uuidv4();

  req.user.paystackRef = paymentReference;
  await req.user.save();

  payStack.acceptPayment(
    req,
    res,
    paymentReference,
    foundDoctor.hourlyPrice,
    req.user.email
  );

  const appointment = new Appointment({
    doctorId,
    patientId: req.user._id,
    appointmentTime: realAppointmentTime,
    duration,
    notes,
    paystackRef: paymentReference,
  });

  await appointment.save();
});

export const confirmAppointment = catchAsync(async (req, res) => {
  const { paystackRef } = req.user;

  if (!paystackRef) {
    throw new AppError("Payment reference not found", 400);
  }

  // Call the verifyPayment method to check the payment status
  const verification = await payStack.verifyPayment(req, res, paystackRef);

  if (!verification) {
    throw new AppError("Payment verification failed", 400);
  }

  const foundAppointment = await Appointment.findOne(
    { paystackRef },
    { status: "confirmed" }
  );

  if (foundAppointment) {
    throw new Error("Apointment already verified");
  }
  // Find the appointment using paymentReference and update the property
  const appointment = await Appointment.findOneAndUpdate(
    { paystackRef },
    { $set: { status: "confirmed" } },
    { new: true }
  ).populate("doctorId patientId");

  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }

  const foundUser = await User.findOneAndUpdate(
    { _id: appointment.patientId },
    { $addToSet: { assignedDoctors: appointment.doctorId } },
    { new: true }
  );

  await foundUser.save();

  if (!foundUser) {
    // Handle the case where the user is not found
    console.error("User not found");
  }

  const foundStaff = await Staff.findOneAndUpdate(
    { _id: appointment.doctorId },
    { $addToSet: { currentPatients: appointment.patientId } },
    { new: true }
  );

  await foundStaff.save();

  if (!foundStaff) {
    // Handle the case where the staff is not found
    console.error("Staff not found");
  }

  console.log(foundUser);

  res.status(200).json(appointment);
});
