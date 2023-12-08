import { Router } from "express";
import {
  confirmAppointment,
  fetchAppointments,
  makeAppointment,
} from "../controllers/appointmentController.js";

const router = Router();

const appointmentRoute = () => {
  router.get("/fetchAppointments", fetchAppointments);
  router.post("/makeAppointment", makeAppointment);
  router.get("/confirmAppointment/:paystackRef", confirmAppointment);
  return router;
};

export default appointmentRoute;
