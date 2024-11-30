import express from "express";
import { postController } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export const postRouter = router;
