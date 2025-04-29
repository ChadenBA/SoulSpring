import { Request, Response , NextFunction} from "express";
import { Comment,validateComment } from "../Models/CommentModel";
import { User } from "../Models/UsersModel";
import { Professional } from "../Models/professionalModel";
import { Post } from "../Models/PostModel";
// Create a new comment
import mongoose from "mongoose";
import { sendEmail } from "../Utils/email";

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { error } = validateComment(req.body);
    const userId = req.user?.id; // Assuming req.user is set by authentication middleware

    if (error) return res.status(400).json({ message: error.details[0].message });
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user is a valid User or Professional
    const user = await User.findById(userId);
    const professional = await Professional.findById(userId);
    if (!user && !professional) {
      return res.status(403).json({ message: "Only registered users and professionals can create comments." });
    }

    const { content, post } = req.body;

    // Create a new comment
    const newComment = new Comment({
      content,
      post,
      autheur: userId, 
      autheurModel: user ? "User" : "Professional",       });

    // Save the comment
    await newComment.save();

    // Update the post to add the new comment's ObjectId to the comments array
    await Post.findByIdAndUpdate(
      post, // Use the actual post ID here
      { $push: { data: newComment } }  // Adds the comment's ObjectId to the comments array
    );

    res.status(201).json({ message: "Comment added successfully", data: newComment });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error"});

  }
};




// Get all comments for a post



export const getCommentsByPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { postId } = req.params;
    console.log('Fetching comments for postId:', postId);

    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const userRole = (req as any).user?.role; // cast if req.user is not typed
    const query: any = { post: postId };

    // Only show unblocked comments to non-admin users
    if (userRole !== "admin") {
      query.isBlocked = false;
    }

    const comments = await Comment.find(query)
      .populate({
        path: 'autheur',
        select: 'name lastname profilePicture',
      });

    res.status(200).json({ data: comments });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Update a comment




export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    if (comment.autheur.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this comment" });
    }

    // Only update provided fields (and keep autheurModel intact)
    const updateFields = {content };
    
    // We ensure autheurModel remains as it is
    const updatedComment = await Comment.findByIdAndUpdate(commentId, updateFields, { new: true, runValidators: true });
    
    res.json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error: any) {
    console.error("Error updating post:", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};











// Delete a comment
export const deleteComment = async (req: Request, res: Response , next: NextFunction): Promise<any> => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id; 
    console.log(userId)
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (!comment.autheur || comment.autheur.toString() !== userId?.toString()) 
     
    
      return res.status(403).json({ message: "You are not authorized to delete this comment" });

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const likeComment = async (req: Request, res: Response): Promise<any> => {
  // Ensure the userId is a valid string
  const userId = req.user?.id; 
  const { commentId } = req.params;
  console.log(userId)
  console.log("req",req)
  // If the userId is not available, return an error
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  // If the postId is not valid, return an error
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Ensure post.likes is initialized as an array
    if (!Array.isArray(comment.likes)) {
      comment.likes = [];
    }

    // Check if user has already liked the post
    if (comment.likes.some((like) => like.toString() === userId)) {
      return res.status(400).json({ message: "Comment already liked" });
    }

    // Add userId to the likes array
comment.likes.push(new mongoose.Types.ObjectId(userId));    
    await comment.save();

    res.json({ message: "Post liked", likesCount: comment.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};


// Unlike post


export const unlikeComment = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  const { commentId } = req.params;

  // If the userId is not available, return an error
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }



  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Ensure post.likes is initialized as an array
    if (!Array.isArray(comment.likes)) {
      comment.likes = [];
    }

    // Check if user has liked the post
    if (!comment.likes.some((like) => like.toString() === userId)) {
      return res.status(400).json({ message: "comment not liked yet" });
    }

    // Remove the userId from the likes array
    comment.likes = comment.likes.filter((like) => like.toString() !== userId);
    await comment.save();

    res.json({ message: "Comment unliked", likesCount: comment.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};



/**
 * @desc Block a post (admin only)
 * @route PATCH /api/posts/:id/block
 * @access Private (admin only)
 */
export const blockComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Only admins can block Comment." });
    }

    const comment = await Comment.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    
      // Find the user who created the post
        const user = await User.findById(comment.autheur._id); // Assuming the post has a userId field
       console.log(user)
        if (user) {
          // Send email to the user
         
          await sendEmail({
            to: user.email,
            subject: 'Your comment Has Been Blocked',
            text: `Hello ${user.name},\n\nYour post with the title "${comment.content}"`,
            html:  `
            has been <span style="color: red;">unblocked</span> due to policy violations or for other administrative reasons.</p>
             <p>If you believe this is a mistake, please contact support at <a href="mailto:support@example.com">support@example.com</a>.</p>
             <p>Thank you.</p>
           `      });    
         }
    res.json({ message: "Comment blocked successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc Unblock a post (admin only)
 * @route PATCH /api/posts/:id/unblock
 * @access Private (admin only)
 */
export const unblockComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Only admins can unblock Comment." });
    }

    const comment = await Comment.findByIdAndUpdate(id, { isBlocked: false }, { new: true });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

      // Find the user who created the post
        const user = await User.findById(comment.autheur._id); // Assuming the post has a userId field
    
        if (user) {
          // Send email to the user
         
          await sendEmail({
            to: user.email,
            subject: 'Your comment Has Been Blocked',
            text: `Hello ${user.name},\n\nYour post with the title "${comment.content}"`,
            html:  `
            has been <span style="color: red;">unblocked</span> due to policy violations or for other administrative reasons.</p>
             <p>If you believe this is a mistake, please contact support at <a href="mailto:support@example.com">support@example.com</a>.</p>
             <p>Thank you.</p>
           `      });    
         }

    res.json({ message: "Comment unblocked successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

