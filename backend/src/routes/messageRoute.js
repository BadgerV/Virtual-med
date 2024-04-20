import { Router } from "express";
import { allMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

const messageRoute = () => {
  router.post("/sendMessage", sendMessage);
  router.get("/:chatId", allMessages)
  return router;
};

export default messageRoute();
