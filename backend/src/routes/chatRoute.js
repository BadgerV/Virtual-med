import { Router } from "express";
import {
  accessChat,
  fetchChats,
  createCommunity,
  renameCommunity,
  removeFromCommunity,
  addToCommunity,
} from "../controllers/chat.controller.js";
import { staffAuth } from "../common/middleware/auth.js";

const router = Router();

export const chatRoute = () => {
  router.post("/accessChat", accessChat);
  router.get("/fetchChats", fetchChats);
  router.post("/community/create", staffAuth, createCommunity);
  router.put("/community/rename", staffAuth, renameCommunity);
  router.put("/communityRemove", removeFromCommunity);
  router.put("/communityAdd", addToCommunity);

  return router;
};
