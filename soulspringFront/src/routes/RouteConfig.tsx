import { Navigate, RouteObject } from 'react-router-dom';
import { PATHS } from '@config/constants/paths';
import GuestLayout from '@layouts/GuestLayout/GuestLayout';
import { lazy } from 'react';
import { GuestGuard } from '@guards/GuestGuard';
import AuthLayout from '@layouts/authLayout/AuthLayout';
import { AuthGuard } from '@guards/AuthGuard';
import DashboardLayout from '@layouts/dashboardLayout/DashboardLayout';
import { RoleBasedGuard } from '@guards/RoleBasedGuard';
import { UserRoleEnum } from '@config/enums/role.enum';
import SecondStepLayout from '@layouts/secondStepLayout/SecondStepLayout';
import { TestGuard } from '@guards/TestGuard';
//import ProfessionalDashborad from '@pages/dashboard/professional/professionalDashboard';

//const Courses = lazy(() => import('src/pages/courses/Courses'));
const HomePage = lazy(() => import('src/pages/home/HomePage'));
const NotFound = lazy(() => import('src/pages/notFound/NotFound'));
const SignUpPage = lazy(() => import('src/pages/auth/signup/signupPage'));
const LoginPage = lazy(() => import('src/pages/auth/login/LoginPage'));
const SetPasswordPage = lazy(() => import('src/pages/auth/setPassword/SetPasswordpage'));
const EmailConfirmationPage = lazy(
  () => import('src/pages/auth/forgetPassword/emailConfirmationPage/EmailConfirmationPage'),
);
const DashboardPage = lazy(() => import('src/pages/dashboard/DashboardPage'));
const ProfilePage = lazy(() => import('src/pages/dashboard/profile/ProfilePage'));
const AccountSettingsPage = lazy(
  () => import('src/pages/dashboard/accountSettings/AccountSettingsPage'),
);
const AppointmentPage = lazy(
  () => import('src/pages/appointment/Appointment'),
);
const SettingCard = lazy(
  () => import('src/pages/dashboard/accountSettings/AccountSettingsPage'),
);
const AboutUsPage = lazy(() => import('src/pages/about/AboutUsPage'));
const PostPage = lazy(() => import('src/pages/post/postPage'));
const PROFESSIONALPAGE = lazy(() => import('src/pages/courses/Courses')); //cardprof
const UsersPage = lazy(() => import('src/pages/dashboard/admin/users/UsersPage'));
const AllUsersTable = lazy(
  () => import('src/pages/dashboard/admin/users/allUsersTable/AllUsersTable'),
);
const PendingUsersTable = lazy(
  () => import('src/pages/dashboard/admin/users/pendingUsersTable/PendingUsersTable'),
);
const PendingAppointmentTable=lazy(
  () => import('src/pages/dashboard/professional/pendingAppointmentTable/pendingAppointmentTable'),
);
const AcceptedUsersTable = lazy(
  () => import('src/pages/dashboard/admin/users/acceptedUsersTable/AcceptedUsersTable'),
);

const AdminDashboard = lazy(() => import('src/pages/dashboard/admin/AdminDashboard'));

const CoursesPage = lazy(() => import('src/pages/dashboard/admin/courses/CoursesPage'));



const StudentDashboard = lazy(() => import('src/pages/dashboard/student/StudentDashboard'));
const ProfessionalDashborad = lazy(() => import('src/pages/dashboard/professional/professionalDashboard'));
const ChatUerProPage = lazy(() => import('src/pages/chatProUser/chatuserproPage'));

const StudentCoursesPage = lazy(
  () => import('src/pages/dashboard/student/courses/StudentCoursesPage'),
);
const EnrolledCoursesList = lazy(
  () => import('src/pages/dashboard/student/courses/enrolledCourses/EnrolledCoursesList'),
);

const SilvermanQuestionsPage = lazy(
  () => import('src/pages/silvermanQuestions/SilvermanQuestionsPage'),
);
const CourseDetail = lazy(() => import('src/pages/courses/courseDetails/CourseDetail'));

console.log(PATHS.DASHBOARD.PROFESSIONAL.PENDING);

export const ROUTE_CONFIG: RouteObject[] = [
  {
    path: PATHS.AUTH.ROOT,
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      { path: PATHS.AUTH.LOGIN, element: <LoginPage /> },
      { path: PATHS.AUTH.SIGNUP, element: <SignUpPage /> },
      { path: PATHS.AUTH.SET_PASSWORD, element: <SetPasswordPage /> },
      { path: PATHS.AUTH.FORGET_PASSWORD, element: <EmailConfirmationPage /> },
    ],
  },
  {
    path: PATHS.ROOT,
    element: <GuestLayout />,
    children: [
      { path: PATHS.ROOT, element: <HomePage /> },
      { path: PATHS.ABOUT_US, element: <AboutUsPage /> },
      

      {
        path: PATHS.professional.ROOT,
        element: (
          <AuthGuard>
              {/* <TestGuard> */}
                <PROFESSIONALPAGE />
              {/* </TestGuard> */}
          </AuthGuard>
        ),
      },

      {
      path: PATHS.POST.ROOT,
      element: (
        <AuthGuard>
          <PostPage/>
        </AuthGuard>
      ),
    },
    {
      path: PATHS.Appointment.ROOT,
      element: (
        <AuthGuard>
          <AppointmentPage />
        </AuthGuard>
      ),
    },
      {
        path: PATHS.professional.COURSE,
        element: (
          <AuthGuard>
              <TestGuard>
                <CourseDetail />
              </TestGuard>
          </AuthGuard>
        ),
      },
    ],
  },

  {
    path: PATHS.DASHBOARD.ROOT,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: PATHS.DASHBOARD.ROOT, element: <DashboardPage /> },
      { path: PATHS.DASHBOARD.PROFILE.ROOT, element: <ProfilePage /> },
      {
        path:  PATHS.DASHBOARD.PROFILE.SETTINGS,
        element: <AccountSettingsPage />,
      },
      {
        path:  `${PATHS.DASHBOARD.PROFILE.SETTINGS}/:id`,
        element: <SettingCard/>,
      },
      {
        path: PATHS.DASHBOARD.ADMIN.ROOT,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.ADMIN}>
            <AdminDashboard />
          </RoleBasedGuard>
        ),
      },
      {
        path: PATHS.DASHBOARD.ADMIN.USERS.ROOT,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.ADMIN}>
            <UsersPage />
          </RoleBasedGuard>
        ),
        children: [
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.ROOT,
            element: <Navigate to={PATHS.DASHBOARD.ADMIN.USERS.ALL} />,
          },
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.ALL,
            element: <AllUsersTable />,
          },
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.PENDING,
            element: <PendingUsersTable />,
          },
          {
            path: PATHS.DASHBOARD.ADMIN.USERS.ACCEPTED,
            element: <AcceptedUsersTable />,
          },
        ],
      },

     

     

    
      {
        path: PATHS.DASHBOARD.ADMIN.COURSES.ROOT,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.ADMIN}>
            <CoursesPage />
          </RoleBasedGuard>
        ),
      },

     


       //----------- Profesional DASHBOARD -------------


      {
        path: PATHS.DASHBOARD.PROFESSIONAL.CHAT,
       
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.PROFESSIONAL}>
            <ChatUerProPage />
          </RoleBasedGuard>
        ),
        
      },

        {
          path: PATHS.DASHBOARD.PROFESSIONAL.ROOT,
          element: (
            <RoleBasedGuard accessibleRoles={UserRoleEnum.PROFESSIONAL}>
              <ProfessionalDashborad />
            </RoleBasedGuard>
          ),},
          
            {
              path: PATHS.DASHBOARD.PROFESSIONAL.PENDING,
              element: <PendingAppointmentTable />, //this for Appointment TAble
            },
          
        
        
      

      // ------------------ STUDENT DASHBOARD ------------------

      {
        path: PATHS.DASHBOARD.STUDENT.ROOT,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.USER}>
              <TestGuard>
                <StudentDashboard />
              </TestGuard>
          </RoleBasedGuard>
        ),
      },
      {
        path: PATHS.DASHBOARD.STUDENT.CHAT,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.USER}>
              <TestGuard>
                <ChatUerProPage />
              </TestGuard>
          </RoleBasedGuard>
        ),
      },

      
      {
        path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.ROOT,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.USER}>
              <TestGuard>
                <StudentCoursesPage />
              </TestGuard>
          </RoleBasedGuard>
        ),
        children: [
          {
            path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.ROOT,
            element: <EnrolledCoursesList />,
          },
        ],
      },
    ],
  },

        // ------------------ test dignose ------------------

  {
    path: PATHS.Test_diagnose.ROOT,
    element: (
      <AuthGuard>
        <SecondStepLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: PATHS.Test_diagnose.test,
        element: (
          <RoleBasedGuard accessibleRoles={UserRoleEnum.USER}>
            <SilvermanQuestionsPage />
          </RoleBasedGuard>
        ),
      },
    ]
  },




  
  { path: PATHS.MAIN.ERROR.P_404, element: <NotFound /> },
  {
    path: PATHS.ANY,
    element: <Navigate to={PATHS.MAIN.ERROR.P_404} replace />,
  },
];
