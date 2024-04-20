import { Router } from "express";
import {
  approvePatient,
  getActiveStaffs,
  getAvailability,
  getOneStaff,
  getSpecialists,
  getStaff,
  getStaffs,
  loginStaff,
  provideCredentials,
  registerStaff,
  setAvailability,
  verifyAccount,
  viewPendingPatients,
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
  router.post("/verify", verifyAccount);
  router.post("/login", loginStaff);
  router.post(
    "/provide-credentials",
    upload.array("images", 4),
    staffAuth,
    provideCredentials
  );

  router.get("/profile", staffAuth, getStaff);
  router.get("/get-staffs", getStaffs);
  router.get("/get-staff/:id", getOneStaff);

  router.get("/get-active-staffs", getActiveStaffs);
  router.get("/get-specialists/:speciality", getSpecialists);
  router.get("/view-pending-patients", staffAuth, viewPendingPatients);
  router.post("/apporve-pending-patients", staffAuth, approvePatient);
  router.post("/set-available-date", staffAuth, setAvailability);
  router.get("/get-availability", staffAuth, getAvailability)


  return router;
};

export default staffRoutes;
