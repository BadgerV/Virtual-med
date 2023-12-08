import { Router } from "express";
import { auth } from "../common/middleware/auth.js";
import {
  ConnectUserWithDoctor,
  allUsers,
  getAllNotifications,
  getAvailabilityForUsers,
  getUser,
  initializePayment,
  // initiatePremiumSubscription,
  loginUser,
  registerUser,
  setNickname,
  verifyAccount,
} from "../controllers/user.controller.js";
import { isPremium } from "../common/middleware/auth.js";

const router = Router();

export const userRoutes = () => {
  /**
   * get user
   */
  // router.get("/", getUser);
  router.post("/register", registerUser);
  router.get("/verify/", verifyAccount);
  router.post("/login", loginUser);
  router.get("/profile", auth, getUser);
  router.post("/set-nickname", auth, setNickname);

  router.get("/get-all-users", auth, allUsers);

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

  router.get("/notifcations", auth, isPremium, getAllNotifications);

  router.post("/get-doctor-availability", getAvailabilityForUsers);

  return router;
};
