import { AdminDashboard } from 'types/models/Dashboard';
import { AdminDashboardApi , ProfessionalDashboardApi } from './dashboardApi.type';

// export const transformStudentDashboard = (data: StudentDashboardApi): StudentDashboard => {
//   return {
//     enrolledCourses: data.data.enrolled_courses,
//   };
// };

export const transformAdminDashboard = (data: AdminDashboardApi): AdminDashboard => {

  return {
    users: data.Users || 0, // Use 'Users' directly from the response
    Professionals: data.Professionals || 0, // Use 'Professionals' directly
    ageCounts: data.ageCounts || {},
    disorderDistribution: data.disorderDistribution || {},
    meanStressLevel: data.meanStressLevel || 0,
    severityDistribution: data.severityDistribution || {},
    posts: data.Posts || 0,           // ➕ Added field
    comments: data.Comments || 0,     // ➕ Added field
    likes: data.Likes || 0,           // ➕ Added field
    blockedPosts: data.BlockedPosts || 0,   // ➕ Added field
    blockedComments: data.BlockedComments || 0, // ➕ Added field
  };
};

export const transformProfessionalDashboard = (response: any) => {
  return {
    totalPosts: response?.totalPosts ?? 0,
    totalComments: response?.totalComments ?? 0,
    totalLikes: response?.totalLikes ?? 0,
    blockedPostCount: response?.blockedPostCount ?? 0,
    blockedCommentCount: response?.blockedCommentCount ?? 0,
    mostLikedPost: response?.mostLikedPost ?? null,
    mostCommentedPost: response?.mostCommentedPost ?? null,
    mostLikedComment: response?.mostLikedComment ?? null,
  };
};

