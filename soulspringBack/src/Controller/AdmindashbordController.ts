import { Request, Response } from "express";
import { Professional } from "../Models/professionalModel";
import { User } from "../Models/UsersModel";
import TestResult from "../Models/DignoseModel";
import { Post } from "../Models/PostModel";
import { Comment } from "../Models/CommentModel"; // <-- Ensure this exists

export const getAdminStatistics = async (req: Request, res: Response): Promise<any> => {
  try {
    const [
      userCount,
      professionalCount,
      testResults,
      postCount,
      commentCount,
      blockedPostCount,
      blockedCommentCount,
      postsWithLikes
    ] = await Promise.all([
      User.countDocuments(),
      Professional.countDocuments(),
      TestResult.find().lean(),
      Post.countDocuments(),
      Comment.countDocuments(),
      Post.countDocuments({ isBlocked: true }),
      Comment.countDocuments({ isBlocked: true }),
      Post.find({}, { likes: 1 }).lean()
    ]);

    const totalLikes = postsWithLikes.reduce((acc, post) => acc + (post.likes?.length || 0), 0);

    const totalStress = testResults.reduce((acc, result) => acc + (result.stressPrediction?.Percentage || 0), 0);
    const meanStressLevel = testResults.length ? totalStress / testResults.length : 0;

    const disorderDistribution = testResults.reduce((acc, result) => {
      const disorder = result.disorderPrediction?.disorderPrediction;
      if (disorder) acc[disorder] = (acc[disorder] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const severityDistribution = testResults.reduce((acc, result) => {
      const severity = result.disorderPrediction?.severity;
      if (severity) acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const userAges = await User.find({}, { _id: 1, age: 1 }).lean();

    const ageCounts = userAges.reduce((acc, user) => {
      const age = user.age;
      const category =
        age < 18 ? "Under 18" :
        age < 30 ? "18-29" :
        age < 50 ? "30-49" :
        "50+";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.status(200).json({
      Users: userCount,
      Professionals: professionalCount,
      meanStressLevel,
      disorderDistribution,
      severityDistribution,
      ageCounts,
      Posts: postCount,
      Comments: commentCount,
      Likes: totalLikes,
      BlockedPosts: blockedPostCount,
      BlockedComments: blockedCommentCount
    });
  } catch (error) {
    console.error("Error generating admin statistics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
