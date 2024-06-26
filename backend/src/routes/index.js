import { Router } from "express";

const router = Router();
import { userRoutes } from "./user.route.js";
import staffRoutes from "./staff.route.js";
import { chatRoute } from "./chatRoute.js";
import {
  isAdmin,
  isPremium,
  isPremiumOrStaff,
  isUserOrStaff,
  staffAuth,
} from "../common/middleware/auth.js";
import messageRoute from "./messageRoute.js";
import appointmentRoute from "./appointmentRoute.js";
import adminRoute from "./adminRoute.js";
import { auth } from "../common/middleware/auth.js";
import NotificationRouter from "./notificationRoute.js";
import blogRoute from "./blog.route.js";

export const setRoutes = () => {
  router.use("/user", userRoutes());
  router.use("/staff", staffRoutes());
  router.use("/chat", isUserOrStaff, chatRoute());
  router.use("/message", isUserOrStaff, messageRoute);
  router.use("/appointment", isUserOrStaff, appointmentRoute());
  router.use("/admin", auth, isAdmin, adminRoute());
  router.use("/notification", isUserOrStaff, NotificationRouter());
  router.use("/blog", blogRoute);
  return router;
};
