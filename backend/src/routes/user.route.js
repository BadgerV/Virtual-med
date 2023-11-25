import { Router } from "express";
import { getUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

export const userRoutes = () => {
  /**
   * get user
   */
  router.get("/", getUser);
  router.post("/register", registerUser);

  return router;
};
