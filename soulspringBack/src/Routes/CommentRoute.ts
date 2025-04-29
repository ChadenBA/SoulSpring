
import express from "express";
import { authMiddleware } from "../Middleware/authMiddleware";
import { createComment, getCommentsByPost, updateComment, deleteComment, likeComment, unlikeComment, blockComment, unblockComment } from "../Controller/CommentController";


const commentRoutes = express.Router();
commentRoutes.post("/", authMiddleware, createComment); // Create a comment
commentRoutes.get("/:postId",authMiddleware ,getCommentsByPost); // Get comments by post
commentRoutes.put("/:commentId", authMiddleware, updateComment); // Update a comment
commentRoutes.delete("/:commentId", authMiddleware, deleteComment); // Delete a comment

commentRoutes.patch("/like/:commentId",authMiddleware ,likeComment);
commentRoutes.patch("/unlike/:commentId",authMiddleware, unlikeComment);


commentRoutes.patch('/block/:id', authMiddleware, blockComment);
commentRoutes.patch('/unblock/:id', authMiddleware, unblockComment);


export default commentRoutes;