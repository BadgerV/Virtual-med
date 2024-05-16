import { Router } from "express";
import {
  createPost,
  deletePostByid,
  getDoctorPost,
  getPostById,
  getThreePosts,
} from "../controllers/blogController.js";
import { isUserOrStaff } from "../common/middleware/auth.js";

const router = Router();

const blogRoute = () => {
  router.post("/post/create", isUserOrStaff, createPost);
  router.get("/post/get-3-posts", getThreePosts);
  router.get("/post/get-post-by-id/:id", getPostById);
  router.delete("/post/delete-post/:id", isUserOrStaff, deletePostByid);
  router.get("/post/get-doctor-post/:doctorID", getDoctorPost);

  return router;
};

export default blogRoute();
