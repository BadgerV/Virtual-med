import { Router } from "express";
import {
  provideCredentials,
  registerStaff,
} from "../controllers/staff.controller.js";
import { staffAuth } from "../common/middleware/auth.js";
import multer from "multer";

const router = Router();

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

const staffRoutes = () => {
  router.post("/register", registerStaff);
  router.post(
    "/provide-credentials",
    upload.array("images", 4),
    staffAuth,
    provideCredentials
  );

  return router;
};

export default staffRoutes;
