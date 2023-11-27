import { Router } from "express";
import { auth } from "../common/middleware/auth.js";
import {
  ConnectUserWithDoctor,
  getUser,
  initializePayment,
  // initiatePremiumSubscription,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { isPremium } from "../common/middleware/auth.js";

const router = Router();

export const userRoutes = () => {
  /**
   * get user
   */
  // router.get("/", getUser);
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.get("/profile", auth, getUser);
  router.post(
    "/initiatePremiumSubscription",
    auth,
    initializePayment.acceptPayment
  );
  router.get(
    "/confirmPremiumSubscription/:reference",
    auth,
    initializePayment.verifyPayment
  );

  router.post("/connectUserWithDoctor", auth, isPremium, ConnectUserWithDoctor);

  return router;
};
