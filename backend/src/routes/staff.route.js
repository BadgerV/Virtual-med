import { Router } from "express";
import {
  provideCredentials,
  registerStaff,
} from "../controllers/staff.controller.js";
import { staffAuth } from "../common/middleware/auth.js";

const router = Router();

const staffRoutes = () => {
  router.post("/register", registerStaff);
  router.post("/provide-credentials", staffAuth, provideCredentials);

  return router;
};

export default staffRoutes;
