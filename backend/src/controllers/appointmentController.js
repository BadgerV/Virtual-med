import AppError from "../common/utils/appError.js";
import { catchAsync } from "../common/utils/errorHandler.js";
import User from "../models/UserModel.js";
import Appointment from "../models/AppointmentModel.js";
import Staff from "../models/StaffModel.js";

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

export const makeAppointment = catchAsync(async (req, res) => {
  const isUser = req.user ? true : false;

  if (!isUser) {
    throw new AppError("You are a staff, you cannot make an appointment", 400);
  }

  const { doctorId, appointmentTime, duration, notes } = req.body;

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

  const appointment = new Appointment({
    doctorId,
    patientId: req.user._id,
    appointmentTime: realAppointmentTime,
    duration,
    notes,
  });

  await appointment.save();

  res.send(appointment);
});
