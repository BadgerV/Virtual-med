import { Router } from "express";
import {
  listUnverifiedUsers,
  verifyUser,
} from "../controllers/admin.controller.js";

const router = Router();

const adminRoute = () => {
  router.get("/get-unverified-users", listUnverifiedUsers);
  router.post("/verify-user", verifyUser);

  return router;
};

export default adminRoute;
