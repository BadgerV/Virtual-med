import { Router } from "express";
import { createPost } from "../controllers/blogController.js";


const router = Router();

const blogRoute = () => {
  router.post("/post/create", createPost);

  return router;
};

export default blogRoute();