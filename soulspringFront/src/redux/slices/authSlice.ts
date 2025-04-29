import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum';
import { authApi } from '@redux/apis/auth/authApi';
import { courseApi } from '@redux/apis/courses/coursesApi';
import { professionalApi } from '@redux/apis/Professional/ProfessionalApi';
import { TestApi } from '@redux/apis/user/TestApi';
import { userApi } from '@redux/apis/user/usersApi';
import { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import {
  clearLocalStorage,
  getProFromLocalStorage,
  getUserFromLocalStorage,
  setToLocalStorage,
  getFromLocalStorage
} from '@utils/localStorage/storage';



// Initial state setup, including hasCompletedTest from localStorage
const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
  professional: getProFromLocalStorage(),
  hasCompletedTest: getFromLocalStorage(LocalStorageKeysEnum.HasCompletedTest) === 'true', // Correct check here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.professional = null;
      state.isAuthenticated = false;

      // Clear all localStorage data except for hasCompletedTest
      const hasCompletedTest = localStorage.getItem(LocalStorageKeysEnum.HasCompletedTest);
      if (hasCompletedTest) {
        setToLocalStorage(LocalStorageKeysEnum.HasCompletedTest, hasCompletedTest);
      }

      clearLocalStorage();  // Clear other localStorage data
    },
    //ajouter ça pour mettre a jour l'utilisateur dans le store d'ou affiché les nouveau valeur directemnt
    updateUser: (state, action) => {
      // Mettre à jour l'utilisateur avec les nouvelles données
      state.user = { ...state.user, ...action.payload };
      setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(state.user));
    },
  },

  

  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { token, refreshToken, user } = payload.data;
        state.user = user;
        state.isAuthenticated = true;

        // Restore hasCompletedTest from localStorage
        const hasCompletedTest = localStorage.getItem(LocalStorageKeysEnum.HasCompletedTest);
        state.hasCompletedTest = hasCompletedTest === 'true'; // Correct the logic

        setToLocalStorage(LocalStorageKeysEnum.token, token);
        setToLocalStorage(LocalStorageKeysEnum.RefreshToken, refreshToken);
        setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(user));
      })
      .addMatcher(TestApi.endpoints.submitResponses.matchFulfilled, (state) => {
        state.hasCompletedTest = true;
        setToLocalStorage(LocalStorageKeysEnum.HasCompletedTest, 'true');  // Store hasCompletedTest in localStorage
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        clearLocalStorage();
      });
  },
});

// Selector to access authentication state
export const selectAuth = (state: RootState) => state.auth;

// Export logout action
export const { logout } = authSlice.actions;

// Export reducer to be added to store configuration
export default authSlice.reducer;
