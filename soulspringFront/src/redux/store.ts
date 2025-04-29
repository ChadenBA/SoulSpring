import { authApi } from './apis/auth/authApi';
import { userApi } from './apis/user/usersApi';
import { categoriesApi } from './apis/categories/categoriesApi';
import { TestApi } from './apis/user/TestApi';
import { configureStore } from '@reduxjs/toolkit';

// Existing imports
import snackbarReducer from './slices/snackbarSlice';
import themeReducer from './slices/theme';
import searchQueryReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import uploadReducer from './slices/uploadSlice';
import { dashboardApi } from './apis/dashboard/dashboardApi';
import { courseApi } from './apis/courses/coursesApi';
import { professionalApi } from './apis/Professional/ProfessionalApi';
import { postApi } from './apis/Post/PostApi';
import { appointmentApi } from './apis/Appointement/AppointmentApi';
import { CommentApi } from './apis/Comment/CommentApi';
import { chatProfUserApi } from './apis/chatProfUser/chatProfUserApi';
export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    auth: authReducer, //Si authReducer est présent, alors il gère probablement l’état d’authentification.
    upload: uploadReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [TestApi.reducerPath]: TestApi.reducer,
    [professionalApi.reducerPath]: professionalApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [CommentApi.reducerPath]: CommentApi.reducer,
    [chatProfUserApi.reducerPath]: chatProfUserApi.reducer,

    [appointmentApi.reducerPath]: appointmentApi.reducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      userApi.middleware,
      authApi.middleware,
      dashboardApi.middleware,
      courseApi.middleware,
      TestApi.middleware,
      professionalApi.middleware,
      postApi.middleware,
      CommentApi.middleware,
      chatProfUserApi.middleware,
      appointmentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
