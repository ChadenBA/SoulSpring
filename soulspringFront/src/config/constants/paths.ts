export const PATHS = {
  ROOT: '/',

  professional: {
    ROOT: '/carteProfessionel',
    COURSE: '/courses/:courseId',
    QUIZ: '/courses/:courseId/quiz',
  },

  CATEGORIES: {
    ROOT: '/categories',
  },

  ABOUT_US: '/AboutUs',
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup',
    FORGET_PASSWORD: 'forget-password',
    SET_PASSWORD:  'password-set/:token', //la7kaya lkol fi les deux pontssssssssssssssssssssssssssss
  },

  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: {
      ROOT: '/dashboard/profile',
      SETTINGS: '/dashboard/profile/settings',
      SettingCard:'/dashboard/profile/settings',
     
    },
    
    ADMIN: {
      ROOT: '/dashboard/admin',
      USERS: {
        ROOT: '/dashboard/admin/users',
        ALL: '/dashboard/admin/users/all',
        PENDING: '/dashboard/admin/users/pending',
        ACCEPTED: '/dashboard/admin/users/accepted',
        EDIT_USER: '/dashboard/admin/users/:userId',
        ADD_USER: '/dashboard/admin/addUser',
      },
      CATEGORY: {
        ROOT: '/dashboard/admin/categories',
        ADD_CATEGORY: '/dashboard/admin/categories/add-category',
        EDIT_CATEGORY: '/dashboard/admin/categories/:categoryId',
      },
      COURSES: {
        ROOT: '/dashboard/admin/courses',
        ADD_COURSE: '/dashboard/admin/courses/add-course',
        EDIT_COURSE: '/dashboard/admin/courses/:courseId',
      },
    },
    STUDENT: {
      ROOT: '/dashboard/student',
      CHAT: '/dashboard/student/chat',

      MY_PROGRAM: {
        ROOT: '/dashboard/student/my-program',
        COMPLETED_COURSES: '/dashboard/student/my-program/completed-courses',
      },
      TAKE_QUIZ: '/dashboard/courses/prestest/:courseId',
      QUIZ: '/dashboard/courses/prestest',

      MY_QUIZZES: '/dashboard/student/my-quizzes',
      MY_SUPPORT: '/dashboard/student/my-support',
      CATEGORIES: '/dashboard/student/categories',
      SUBCATEGORIES: '/dashboard/student/categories/:categoryId',
      COURSES: '/dashboard/student/courses',
    },

    PROFESSIONAL: {
      ROOT: '/dashboard/professional',
      CHAT: '/dashboard/professional/chat',
      PENDING: '/dashboard/professional/appointment/pending',
     
      
    },
  },

 
  Test_diagnose:{
    ROOT: '/Test_diagnose',
    test: '/Test_diagnose/questions/',
  },
  SECOND_STEP: {
    ROOT: '/second-step',
    CATEGORIES: '/second-step/categories',
    SUBCATEGORIES: '/second-step/categories/:categoryId',
    COURSES_USER: '/second-step/courses',
    COURSES: '/second-step/courses/:subcategoryId',
    QUIZ_COURSES: '/second-step/courses/prestest/:courseId',
    QUIZ: '/second-step/courses/prestest',
    SILVERMAN: '/second-step/silverman-questions/',
    SILVERMAN_QUESTIONS: '/second-step/silverman-questions',
  },
  POST :{
ROOT : '/posts',
  },
  Appointment :{
    ROOT : '/appointment',
      },
      
  MAIN: {
    HOME: '',
    ERROR: {
      P_500: '/500',
      P_404: '/404',
      P_403: '/403',
    },
  },
  ANY: '*',
};
