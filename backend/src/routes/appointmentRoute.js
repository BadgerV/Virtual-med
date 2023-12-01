import { Router } from "express";
import {
  fetchAppointments,
  makeAppointment,
} from "../controllers/appointmentController.js";

const router = Router();

const appointmentRoute = () => {
  router.get("/fetchAppointments", fetchAppointments);
  router.post("/makeAppointment", makeAppointment);

  return router;
};

export default appointmentRoute;
