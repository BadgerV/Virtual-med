import { Router } from "express";
import {
  confirmAppointment,
  fetchAppointments,
  fetchCompletedAppointments,
  fetchOngoingAppointments,
  fetchUpcomingAppointments,
  makeAppointment,
} from "../controllers/appointmentController.js";

const router = Router();

const appointmentRoute = () => {
  router.get("/fetchAppointments", fetchAppointments);
  router.post("/makeAppointment", makeAppointment);
  router.get("/confirmAppointment/:paystackRef", confirmAppointment);
  router.get("/get-completed-appointments", fetchCompletedAppointments);
  router.get("/get-ongoing-appointments", fetchOngoingAppointments);
  router.get("/get-upcoming-appointments", fetchUpcomingAppointments);
  return router;
};

export default appointmentRoute;
