import { Router } from "express";
import { auth } from "../common/middleware/auth.js";
import {
  getUser,
  initializePayment,
  // initiatePremiumSubscription,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

export const userRoutes = () => {
  /**
   * get user
   */
  // router.get("/", getUser);
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.get("/profile", auth, getUser);
  router.post("/initiatePremiumSubscription", initializePayment.acceptPayment);

  return router;
};
