// import request from "supertest";
// import app from "../index"; // Your Express app
// import { Comment } from "../Models/CommentModel";
// import { User } from "../Models/UsersModel";
// import { Professional } from "../Models/professionalModel";
// import { Post } from "../Models/PostModel";
// import mongoose from "mongoose";

// // Mock the sendEmail function
// jest.mock("../Utils/email", () => ({
//   sendEmail: jest.fn(),
// }));

// beforeAll(async () => {
//   // Connect to a test database
//   await mongoose.connect(process.env.TEST_DB_URI);
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("Comment Controller", () => {
//   let userToken: string;
//   let userId: mongoose.Types.ObjectId;
//   let postId: mongoose.Types.ObjectId;
//   let commentId: mongoose.Types.ObjectId;

//   beforeEach(async () => {
//     // Clear database before each test
//     await Comment.deleteMany({});
//     await User.deleteMany({});
//     await Post.deleteMany({});
//     await Professional.deleteMany({});

//     // Create a user
//     const user = await User.create({ name: "Test", lastname: "User", email: "test@example.com", password: "password123" });
//     userId = user._id;

//     // Simulate login to get token (Assuming you use JWT and login route exists)
//     userToken = "mocked-token"; // replace this with your login logic if needed

//     // Create a post
//     const post = await Post.create({ title: "Test Post", content: "Some content", createdBy: userId });
//     postId = post._id;
//   });

//   describe("createComment", () => {
//     it("should create a new comment", async () => {
//       const res = await request(app)
//         .post("/api/comments")
//         .set("Authorization", `Bearer ${userToken}`)
//         .send({ content: "New Comment", post: postId });

//       expect(res.statusCode).toBe(201);
//       expect(res.body.data.content).toBe("New Comment");
//     });

//     it("should not create a comment without content", async () => {
//       const res = await request(app)
//         .post("/api/comments")
//         .set("Authorization", `Bearer ${userToken}`)
//         .send({ post: postId });

//       expect(res.statusCode).toBe(400);
//     });
//   });

//   describe("getCommentsByPost", () => {
//     it("should get all comments for a post", async () => {
//       const comment = await Comment.create({ content: "Test Comment", post: postId, autheur: userId, autheurModel: "User" });

//       const res = await request(app)
//         .get(`/api/comments/${postId}`)
//         .set("Authorization", `Bearer ${userToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body.data.length).toBeGreaterThan(0);
//     });
//   });

//   describe("updateComment", () => {
//     it("should update a comment", async () => {
//       const comment = await Comment.create({ content: "Old Comment", post: postId, autheur: userId, autheurModel: "User" });
//       commentId = comment._id;

//       const res = await request(app)
//         .put(`/api/comments/${commentId}`)
//         .set("Authorization", `Bearer ${userToken}`)
//         .send({ content: "Updated Comment" });

//       expect(res.statusCode).toBe(200);
//       expect(res.body.comment.content).toBe("Updated Comment");
//     });

//     it("should not update a comment if not the owner", async () => {
//       const otherUser = await User.create({ name: "Another", lastname: "User", email: "another@example.com", password: "password123" });
//       const comment = await Comment.create({ content: "Another Comment", post: postId, autheur: otherUser._id, autheurModel: "User" });
//       commentId = comment._id;

//       const res = await request(app)
//         .put(`/api/comments/${commentId}`)
//         .set("Authorization", `Bearer ${userToken}`)
//         .send({ content: "Hacked Comment" });

//       expect(res.statusCode).toBe(403);
//     });
//   });

//   describe("deleteComment", () => {
//     it("should delete a comment", async () => {
//       const comment = await Comment.create({ content: "To be deleted", post: postId, autheur: userId, autheurModel: "User" });
//       commentId = comment._id;

//       const res = await request(app)
//         .delete(`/api/comments/${commentId}`)
//         .set("Authorization", `Bearer ${userToken}`);

//       expect(res.statusCode).toBe(200);
//     });
//   });

//   describe("likeComment", () => {
//     it("should like a comment", async () => {
//       const comment = await Comment.create({ content: "Like me", post: postId, autheur: userId, autheurModel: "User" });
//       commentId = comment._id;

//       const res = await request(app)
//         .post(`/api/comments/${commentId}/like`)
//         .set("Authorization", `Bearer ${userToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body.likesCount).toBe(1);
//     });
//   });

//   describe("unlikeComment", () => {
//     it("should unlike a comment", async () => {
//       const comment = await Comment.create({ content: "Unlike me", post: postId, autheur: userId, autheurModel: "User", likes: [userId] });
//       commentId = comment._id;

//       const res = await request(app)
//         .post(`/api/comments/${commentId}/unlike`)
//         .set("Authorization", `Bearer ${userToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body.likesCount).toBe(0);
//     });
//   });

//   describe("blockComment", () => {
//     it("should block a comment by admin", async () => {
//       const comment = await Comment.create({ content: "Block me", post: postId, autheur: userId, autheurModel: "User" });
//       commentId = comment._id;

//       // Assume admin token
//       const adminToken = "mocked-admin-token";

//       const res = await request(app)
//         .patch(`/api/comments/${commentId}/block`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body.comment.isBlocked).toBe(true);
//     });
//   });

//   describe("unblockComment", () => {
//     it("should unblock a comment by admin", async () => {
//       const comment = await Comment.create({ content: "Unblock me", post: postId, autheur: userId, autheurModel: "User", isBlocked: true });
//       commentId = comment._id;

//       // Assume admin token
//       const adminToken = "mocked-admin-token";

//       const res = await request(app)
//         .patch(`/api/comments/${commentId}/unblock`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body.comment.isBlocked).toBe(false);
//     });
//   });
// });
