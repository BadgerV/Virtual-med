import { Router } from "express";
import { getNotificationFromID } from "../controllers/notifcation.controller.js";

const router = Router();

const NotificationRouter = () => {
  router.get("/get-notification-byID", getNotificationFromID);

  return router;
};

export default NotificationRouter;
