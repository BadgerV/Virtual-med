import { Router } from "express";

const router = Router();
import { userRoutes } from "./user.route.js";
import staffRoutes from "./staff.route.js";
import { chatRoute } from "./chatRoute.js";
import {
  isPremium,
  isPremiumOrStaff,
  staffAuth,
} from "../common/middleware/auth.js";
import messageRoute from "./messageRoute.js";

export const setRoutes = () => {
  router.use("/user", userRoutes());
  router.use("/staff", staffRoutes());
  router.use("/chat", isPremiumOrStaff, chatRoute());
  router.use("/message", isPremiumOrStaff, messageRoute);
  return router;
};
