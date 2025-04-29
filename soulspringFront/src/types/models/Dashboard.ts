// export interface StudentDashboard {
//   enrolledCourses: number;
// }

export interface AdminDashboard {
  users: number;
  Professionals: number;
  ageCounts?: Record<string, number>;
  disorderDistribution?: Record<string, number>;
  meanStressLevel?: number;
  severityDistribution?: Record<string, number>;
  commonSymptoms?: Record<string, number>;
  posts?: number;               // ➕ New field
  comments?: number;            // ➕ New field
  likes?: number;               // ➕ New field
  blockedPosts?: number;        // ➕ New field
  blockedComments?: number;     // ➕ New field
}
export interface ProfessionalDashboard {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  mostLikedPost: {
    id: string;
    title: string;
    likes: number;
  } | null;
  mostCommentedPost: {
    id: string;
    title: string;
  } | null;
  mostLikedComment: {
    id: string;
    text: string;
    likes: number;
    author: {
      name: string;
      lastName: string;
      profilePicture: string;
    };
  } | null;
  blockedPostCount: number;
  blockedCommentCount: number;
}
