
import express from "express";

import { createPost, getPosts, getPostById, updatePost, deletePost, likePost, unlikePost, blockPost, unblockPost } from "../Controller/PostController";

import { authMiddleware } from "../Middleware/authMiddleware"; ;

const postRoutes = express.Router();

// Create a post (Only authenticated users and professionals)
postRoutes.post("/", authMiddleware, createPost);

// Get all posts (Public)



postRoutes.get("/getposts", authMiddleware,getPosts);

// Get a single post by ID (Public)
postRoutes.get("/getpostbyid/:id", getPostById);

// Update a post (Only post owner)
postRoutes.put("/updatepost/:id", authMiddleware, updatePost);

// Delete a post (Only post owner)
postRoutes.delete("/deletepost/:id", authMiddleware, deletePost);


postRoutes.patch('/block/:id', authMiddleware, blockPost);
postRoutes.patch('/unblock/:id', authMiddleware, unblockPost);


postRoutes.patch("/like/:postId",authMiddleware, likePost);
postRoutes.patch("/unlike/:postId", authMiddleware, unlikePost);

export default postRoutes;
