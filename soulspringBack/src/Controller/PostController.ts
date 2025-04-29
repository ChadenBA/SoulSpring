import { Request, Response  , NextFunction} from "express";
import { Post } from "../Models/PostModel";
import { IUser, User } from "../Models/UsersModel";
import { IProfessional, Professional } from "../Models/professionalModel";
import { Model as MongooseModel, Document } from "mongoose";


import mongoose from "mongoose";
import { sendEmail } from "../Utils/email";


 /**
 *@desc craete new post
 *@route api/posts
 *@method POST
 *@access private user and prof
 */
 export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  try {
    console.log("User from authMiddleware:", req.user); // Debug log to check if user is set
    
    const { title, content } = req.body;
    const userId = req.user?.id; // Assuming req.user is set by authentication middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user is a valid User or Professional
    const user = await User.findById(userId);
    const professional = await Professional.findById(userId);

    if (!user && !professional) {
      return res.status(403).json({ message: "Only registered users and professionals can create posts." });
    }

    // If either User or Professional exists, create the post
    const newPost = new Post({
      title,
      content,
      autheur: userId, 
      autheurModel: user ? "User" : "Professional", // Set the model type correctly based on user type
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error); // Log the error for better debugging


    // Make sure the error is passed correctly to the response
    if (error instanceof Error) {
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      res.status(500).json({ message: "Server error", error: "Unknown error" });
    }
  }
}
;




/**
//  *@desc get all posts
//  *@route api/posts
//  *@method Get
//  *@access public
//  */


export const getPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const { page = 1, perPage = 5, keyword } = req.query;

    const query: any = {};
    const userRole = req.user?.role;
     console.log(userRole)
    // Only show unblocked posts to non-admin users
    if ( userRole !== "admin" ) {
      query.isBlocked = false;
    }

      if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { content: { $regex: keyword, $options: 'i' } },
        { name: { $regex: keyword, $options: 'i' } },


      ];
    }

    const totalCount = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .populate("autheur", "name lastname email profilePicture")
      .skip((Number(page) - 1) * Number(perPage))
      .limit(Number(perPage));

    res.json({
      data: posts,
      meta: {
        count: totalCount,
        page: Number(page),
        perPage: Number(perPage),
        totalPages: Math.ceil(totalCount / Number(perPage)),
      },
    });
  } catch (error: any) {
    console.error('Error fetching posts:', error.message || error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};




/**
//  *@desc get a post by id
//  *@route api/posts/:Id
//  *@method Get
//  *@access public
**/
export const getPostById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

 /**
//  *@desc update a post
//  *@route api/post/:id
//  *@method PUt
//  *@access private (only autheur ) **/

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.autheur.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this post" });
    }

    // Only update provided fields (and keep autheurModel intact)
    const updateFields = { title, content };
    
    // We ensure autheurModel remains as it is
    const updatedPost = await Post.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
    
    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error: any) {
    console.error("Error updating post:", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};




 
//  *@route api/post/:id
//  *@method Delete
//  *@access private (only autheur && admin) **/
export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role as string | undefined; // Ensure role is of type string

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Allow deletion if the user is either the owner or an admin
    if (post.autheur.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};





// Like post



export const likePost = async (req: Request, res: Response): Promise<any> => {
  // Ensure the userId is a valid string
  const userId = req.user?.id; 
  const { postId } = req.params;

  // If the userId is not available, return an error
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  // If the postId is not valid, return an error
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure post.likes is initialized as an array
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    // Check if user has already liked the post
    if (post.likes.some((like) => like.toString() === userId)) {
      return res.status(400).json({ message: "Post already liked" });
    }

// Convert userId to ObjectId 
post.likes.push(new mongoose.Types.ObjectId(userId));    
await post.save();

    res.json({ message: "Post liked", likesCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};


// Unlike post


export const unlikePost = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  const { postId } = req.params;

  // If the userId is not available, return an error
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }



  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure post.likes is initialized as an array
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    // Check if user has liked the post
    if (!post.likes.some((like) => like.toString() === userId)) {
      return res.status(400).json({ message: "Post not liked yet" });
    }

    // Remove the userId from the likes array
    post.likes = post.likes.filter((like) => like.toString() !== userId);
    await post.save();

    res.json({ message: "Post unliked", likesCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};



/**
 * @desc Block a post (admin only)
 * @route PATCH /api/posts/:id/block
 * @access Private (admin only)
 */
export const blockPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Only admins can block posts." });
    }
    
    const post = await Post.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Find the user who created the post
    const user = await User.findById(post.autheur._id); // Assuming the post has a userId field
      console.log(user)
    if (user) {
      // Send email to the user
     
      await sendEmail({
        to: user.email,
        subject: 'Your Post Has Been Blocked',
        text: `Hello ${user.name},\n\nYour post with the title "${post.title}"`,
        html:  `
       has been <span style="color: red;">blocked</span> due to policy violations or for other administrative reasons.</p>
        <p>If you believe this is a mistake, please contact support at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <p>Thank you.</p>
      `
      });   
     }

    res.json({ message: "Post blocked successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc Unblock a post (admin only)
 * @route PATCH /api/posts/:id/unblock
 * @access Private (admin only)
 */
export const unblockPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role;

    if (userRole !== "admin") {
      return res.status(403).json({ message: "Only admins can unblock posts." });
    }

    const post = await Post.findByIdAndUpdate(id, { isBlocked: false }, { new: true });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Find the user who created the post
    const user = await User.findById(post.autheur._id); // Assuming the post has a userId field

    if (user) {
      // Send email to the user
     
      await sendEmail({
        to: user.email,
        subject: 'Your Post Has Been Blocked',
        text: `Hello ${user.name},\n\nYour post with the title "${post.title}"`,
        html:  `
        has been <span style="color: red;">unblocked</span> due to policy violations or for other administrative reasons.</p>
         <p>If you believe this is a mistake, please contact support at <a href="mailto:support@example.com">support@example.com</a>.</p>
         <p>Thank you.</p>
       `      });    
     }

    res.json({ message: "Post unblocked successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

