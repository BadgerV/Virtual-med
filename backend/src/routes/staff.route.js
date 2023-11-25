import { Express } from "express";
import { registerStaff } from "../controllers/staff.controller";

const router = Express();

const staffRoutes = () => {
  router.post("/signup", registerStaff);

  return router;
};

export default staffRoutes;
