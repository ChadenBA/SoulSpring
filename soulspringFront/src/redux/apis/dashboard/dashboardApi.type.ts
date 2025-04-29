
export interface StudentDashboardApi {
  data: {
    enrolled_courses: number;
  };
}

export interface AdminDashboardApi {
  data: {
    Users: number;
    Professionals: number;
    ageCounts?: Record<string, number>;
    disorderDistribution?: Record<string, number>;
    meanStressLevel?: number;
    severityDistribution?: Record<string, number>;
    commonSymptoms?: Record<string, number>;
    Posts?: number;              // ➕ New field
    Comments?: number;           // ➕ New field
    Likes?: number;              // ➕ New field
    blockedPosts?: number;       // ➕ New field
    blockedComments?: number;    // ➕ New field
  };
}
export interface ProfessionalDashboardApi {
  data: {
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
      content: string;
      likes: number;
      author: {
        name: string;
        lastName: string;
        profilePicture: string;
      };
    } | null;
    blockedPostCount: number;
    blockedCommentCount: number;
  };
}
