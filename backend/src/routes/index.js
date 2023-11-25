import { Router } from "express";

const router = Router();
import { userRoutes } from "./user.route.js";
import staffRoutes from "./staff.route.js";

export const setRoutes = () => {
  router.use("/user", userRoutes());
  router.use("/staff", staffRoutes())
  return router;
};
