import request from "supertest";
import express, { Express } from "express";
import mongoose from "mongoose";
import { createPost, getPosts, getPostById, updatePost, deletePost, likePost, unlikePost, blockPost } from "../Controller/PostController";
import { Post } from "../Models/PostModel";
import { User } from "../Models/UsersModel";
import { Professional } from "../Models/professionalModel";

// Mock the models
jest.mock("../Models/PostModel");
jest.mock("../Models/UsersModel");
jest.mock("../Models/professionalModel");

const app: Express = express();
app.use(express.json());

// Dummy routes
app.post("/api/posts", (req: any, res) => {
  req.user = req.user || {};
  createPost(req, res, jest.fn());
});

app.get("/api/posts", (req: any, res) => {
  req.user = req.user || {};
  getPosts(req, res);
});

app.get("/api/posts/:id", (req: any, res) => {
  req.user = req.user || {};
  getPostById(req, res);
});

app.put("/api/posts/:id", (req: any, res) => {
  req.user = req.user || {};
  updatePost(req, res);
});

app.delete("/api/posts/:id", (req: any, res) => {
  req.user = req.user || {};
  deletePost(req, res);
});

app.patch("/api/posts/:postId/like", (req: any, res) => {
  req.user = req.user || {};
  likePost(req, res);
});

app.patch("/api/posts/:postId/unlike", (req: any, res) => {
  req.user = req.user || {};
  unlikePost(req, res);
});

app.patch("/api/posts/:id/block", (req: any, res) => {
  req.user = req.user || {};
  blockPost(req, res);
});

describe("PostController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("should create a new post", async () => {
      (User.findById as jest.Mock).mockResolvedValue({ _id: "userId" });
      (Professional.findById as jest.Mock).mockResolvedValue(null);
      (Post.prototype.save as unknown as jest.Mock).mockResolvedValue({ title: "Test", content: "Test content" });

      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", "Bearer fakeToken")
        .set("user", JSON.stringify({ id: "userId" }))
        .send({ title: "Test", content: "Test content" });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("Test");
    });

    it("should return 401 if no user", async () => {
      const res = await request(app)
        .post("/api/posts")
        .send({ title: "Test", content: "Test content" });

      expect(res.statusCode).toBe(401);
    });

    it("should return 403 if user not found", async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);
      (Professional.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post("/api/posts")
        .set("user", JSON.stringify({ id: "nonExistingId" }))
        .send({ title: "Test", content: "Test content" });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("getPosts", () => {
    it("should return all posts", async () => {
      (Post.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ title: "Test Post" }]),
          }),
        }),
      });
      (Post.countDocuments as jest.Mock).mockResolvedValue(1);

      const res = await request(app).get("/api/posts");

      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("getPostById", () => {
    it("should return a post by ID", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({ title: "Test Post" });

      const res = await request(app).get(`/api/posts/${new mongoose.Types.ObjectId()}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Test Post");
    });

    it("should return 404 if post not found", async () => {
      (Post.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get(`/api/posts/${new mongoose.Types.ObjectId()}`);

      expect(res.statusCode).toBe(404);
    });

    it("should return 400 for invalid ID", async () => {
      const res = await request(app).get("/api/posts/invalidId");

      expect(res.statusCode).toBe(400);
    });
  });

  describe("updatePost", () => {
    it("should update the post", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      (Post.findById as jest.Mock).mockResolvedValue({ _id: "postId", autheur: userId });
      (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue({ title: "Updated Title" });

      const res = await request(app)
        .put(`/api/posts/postId`)
        .set("user", JSON.stringify({ id: userId }))
        .send({ title: "Updated Title" });

      expect(res.statusCode).toBe(200);
      expect(res.body.post.title).toBe("Updated Title");
    });

    it("should return 403 if not owner", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({ autheur: "otherUserId" });

      const res = await request(app)
        .put(`/api/posts/postId`)
        .set("user", JSON.stringify({ id: "userId" }))
        .send({ title: "Updated Title" });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("deletePost", () => {
    it("should delete post if owner", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      (Post.findById as jest.Mock).mockResolvedValue({ autheur: userId });
      (Post.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const res = await request(app)
        .delete(`/api/posts/postId`)
        .set("user", JSON.stringify({ id: userId }));

      expect(res.statusCode).toBe(200);
    });

    it("should return 403 if not owner", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({ autheur: "otherUserId" });

      const res = await request(app)
        .delete(`/api/posts/postId`)
        .set("user", JSON.stringify({ id: "userId", role: "user" }));

      expect(res.statusCode).toBe(403);
    });
  });

  describe("likePost", () => {
    it("should like a post", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({
        likes: [],
        save: jest.fn().mockResolvedValue({}),
      });

      const res = await request(app)
        .patch("/api/posts/postId/like")
        .set("user", JSON.stringify({ id: "userId" }));

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Post liked");
    });

    it("should return 400 if already liked", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({
        likes: ["userId"],
        save: jest.fn(),
      });

      const res = await request(app)
        .patch("/api/posts/postId/like")
        .set("user", JSON.stringify({ id: "userId" }));

      expect(res.statusCode).toBe(400);
    });
  });

  describe("unlikePost", () => {
    it("should unlike a post", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({
        likes: ["userId"],
        save: jest.fn().mockResolvedValue({}),
      });

      const res = await request(app)
        .patch("/api/posts/postId/unlike")
        .set("user", JSON.stringify({ id: "userId" }));

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Post unliked");
    });

    it("should return 400 if not yet liked", async () => {
      (Post.findById as jest.Mock).mockResolvedValue({
        likes: [],
        save: jest.fn(),
      });

      const res = await request(app)
        .patch("/api/posts/postId/unlike")
        .set("user", JSON.stringify({ id: "userId" }));

      expect(res.statusCode).toBe(400);
    });
  });

  describe("blockPost", () => {
    it("should block post if admin", async () => {
      (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      const res = await request(app)
        .patch("/api/posts/postId/block")
        .set("user", JSON.stringify({ id: "adminId", role: "admin" }));

      expect(res.statusCode).toBe(200);
    });

    it("should return 403 if not admin", async () => {
      const res = await request(app)
        .patch("/api/posts/postId/block")
        .set("user", JSON.stringify({ id: "userId", role: "user" }));

      expect(res.statusCode).toBe(403);
    });
  });
});
