import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import auth from "../common/middleware/auth.js";

const router = Router();

export const userRoutes = () => {
  /**
   * get user
   */
  // router.get("/", getUser);
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.get("/profile", auth, getUser);

  return router;
};
