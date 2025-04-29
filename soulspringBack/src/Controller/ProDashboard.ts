import { Request, Response } from "express";
import { Post } from "../Models/PostModel";
import { Comment } from "../Models/CommentModel";

/**
 * @desc Get dashboard stats for professional
 * @route GET /api/dashboard/professional
 * @access Private (Professional only)
 */
export const getProfessionalDashboardStats = async (req: Request, res: Response): Promise<any> => {
  try {
    const professionalId = req.user?.id;
    const role = req.user?.role;

    if (!professionalId || role !== "professional") {
      return res.status(403).json({ message: "Access denied. Professionals only." });
    }

    // Fetch all posts by this professional
    const posts = await Post.find({ autheur: professionalId, autheurModel: "Professional" });
    const postIds = posts.map(post => post._id);

    const totalPosts = posts.length;
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);

    // Total comments on this professional's posts
    const totalComments = await Comment.countDocuments({ post: { $in: postIds } });

    // Most liked post
    const mostLikedPost = posts.reduce((max, post) => {
      const likeCount = post.likes?.length || 0;
      return likeCount > (max?.likes?.length || 0) ? post : max;
    }, posts[0]);

    // Most commented post
    const commentCounts = await Comment.aggregate([
      { $match: { post: { $in: postIds } } },
      { $group: { _id: "$post", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const mostCommentedPostId = commentCounts[0]?._id || null;
    const mostCommentedPost = mostCommentedPostId
      ? await Post.findById(mostCommentedPostId)
      : null;

    // Most liked comment (anywhere)
    const mostLikedComment = await Comment.findOne()
      .sort({ likes: -1 })
      .populate("autheur", "name lastName profilePicture")
      .lean();

    // Blocked posts and comments
    const blockedPostCount = await Post.countDocuments({ isBlocked: true });
    const blockedCommentCount = await Comment.countDocuments({ isBlocked: true });

    return res.status(200).json({
      totalPosts,
      totalLikes,
      totalComments,
      mostLikedPost: mostLikedPost ? {
        id: mostLikedPost._id,
        title: mostLikedPost.title,
        likes: mostLikedPost.likes?.length || 0
      } : null,
      mostCommentedPost: mostCommentedPost ? {
        id: mostCommentedPost._id,
        title: mostCommentedPost.title
      } : null,
      mostLikedComment: mostLikedComment ? {
        id: mostLikedComment._id,
        content: mostLikedComment.content,
        likes: mostLikedComment.likes,
        autheur: mostLikedComment.autheur
      } : null,
      blockedPostCount,
      blockedCommentCount
    });
  } catch (error) {
    console.error("Error fetching professional dashboard stats:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
