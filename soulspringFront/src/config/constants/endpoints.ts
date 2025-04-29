export const ENDPOINTS = {
  CATEGORIES: 'categories',
  REGISTER: '/users/signup',
  LOGIN: '/users/login',
  LOGOUT: '/logout',

  // admin endponits 
  USERS: '/admin/allPro',
  normalusers:'admin/allUsers',
  PENDING_Prof: 'admin/NonapproveProf',
  ACCEPTED_Prof: 'admin/approvedProf',
  DELETE_USER: '/users/deleteProfile',

  VALIDATE_PROF: 'admin/approve',
  REJECT_PROF: 'admin/reject',
  SUSPEND_PROF: 'admin/suspend',
  UNSUSPEND_PROF : 'admin/unsuspend',
 
   // ADD_USER: 'admin/create-user',
  EDIT_USER: 'admin/update-user-account',

  SET_PASSWORD: '/users/ResetPassword',
  SEND_RESET_PASSWORD_EMAIL: '/users/requestResetPassword',
  UPDATE_PROFILE: '/users/update', //UPDATE PROFILE
  VERIFY_TOKEN:'/users/verifyResetToken',
  GET_ALL_USERS:'/users/getAllUsers',
  USER_PROFILE: '/users/profile',
  DELETE_CATEGORY: 'categories/delete-category',
  CREATE_CATEGORY: 'categories/create-category',
  UPDATE_CATEGORY: 'categories/update-category',
  REFRESH_TOKEN: 'refresh-token',
  ADMIN_COURSES: 'admin/courses',
  DELETE_COURSE: 'admin/delete-course',
  CREATE_COURSE: 'admin/create-course',
  UPDATE_COURSE: 'admin/update-course',
  ACTIVE_COURSE: 'admin/active-course',
  OFFLINE_COURSE: 'admin/offline-course',
  ONLINE_COURSE: 'admin/online-course',
  CREATE_EDUCATIONAL_UNIT: 'admin/create-eu',
  USER_CATEGORIES: 'user/categories',
  USER_SUBCATEGORIES: 'user/subcategories',
  USER_COURSES: 'user/courses',
  ENROLL_COURSE: 'user/subscribe-course',

  CARDPROF: 'prof/getProfessionalsForCard', //prof card ==> lena n7ot api mta3 back

  COURSES: '/admin/pros',

  SUBMIT_QUIZ: 'user/quiz/submit',
  STUDENT_DASHBOARD: 'user/dashboard',

  ADMIN_DASHBOARD: '/admin/dashboard',
  INDEX_QUIZZES_SCORE: 'user/quiz-scores',
  UPDATE_EU: 'admin/update-eu',
  ENROLLED_COURSES: 'user/enrolled-courses',
  
  TEST_QUESTIONS: 'user/test/questions',
  SILVERMAN_SUBMIT_RESPONSES: 'user/test/submit-responses',
  SILVERMAN_RESULT: '/test-result/:userId',
  MEDIA_UPLOAD_FILE: '/media/upload-media',
  SUBMIT_LO_QUIZ: 'user/lo-quiz/submit',
  //CARDPROF : 'prof/card',


  //post
  GET_POSTS : '/posts/getposts',
  CREATE_POST :'/posts',
  UPDATE_POST : '/posts/updatepost',
  DELETE_POST : '/posts/deletepost',
  GET_POST_BYID : '/posts/getpostbyid', 
  LIKE_POST :'/posts/like',
  UNLIKE_POST :'/posts/unlike',
BLOCK_POST:'/posts/block',
UNBLOCK_POST:'/posts/unblock',

  //comment 
  GET_COMMENT_BYPOST:'/comments',
  CREATE_COMMENT:'/comments',
  UPADETE_COMMENT:'/comments',
  DELETE_COMMENT:'/comments',
  LIKE_COMMENT:'/comments/like',
  UNLIKE_COMENT:'/comments/unlike',
  BLOCK_COMMENT:'/comments/block',
UNBLOCK_COMMENT:'/comments/unblock',


//pro dashbord
GET_PRO_DASHBOARD:'/pro/stats',

//chat user pro 
SEND_PRO_USER:"/send",
REPLAY_PRO_USER:"/reply",
GET_MSG_PRO_USER:"/messages",
DELETE_MSG_PRO_USER :"/message",


  //Appointments
  CREATE_APPOINTMENT :'/createAppointment',
  GET_PENDING_APPOINTMENT: '/getPendingAppointment',
  CONFIRM_APPOINTMENT : '/confirmAppointment/:id',
  CANCELL_APPOINTMENT : '/cancelAppointment/:id'

};
