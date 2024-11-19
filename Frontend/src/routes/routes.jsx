import { createBrowserRouter } from 'react-router-dom';
import {
  ActivitiesFeed,
  ActivityDetailPage,
  ActivityListSuperAdmin,
  BookingDay,
  BookingsFeed,
  ChangePassword,
  CheckCode,
  Contact,
  ContactMessage,
  CrearActivity,
  CreateNewDay,
  Dashboard,
  Home,
  Login,
  Profile,
  Register,
  SuperAdminPanel,
  UpdateActivity,
  UpdateUser,
} from '../pages';
import App from '../App';
import { ForgotPassword } from '../pages/ForgotPassword';
import {
  ChatDetail,
  ChatInput,
  Protected,
  ProtectedCheckChildren,
  UserActivitiesFav,
  UserReviews,
  WallDetailPage,
} from '../components';
import { NavUser } from '../components/NavUser';
import MessageComponent from '../pages/CreateMessage';
import { Wall } from '../pages/Wall';
import { CreateWallForm } from '../pages/CreateWallForm';
import { Calendar } from '../pages/Calendar';
import { ProtectedSuperAdmin } from '../components/ProtectedRoute/ProtectedSuperAdmin';
import WallDetail from '../components/WallDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Ruta de índice
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/verifyCode',
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />,
      },
      {
        path: '/profile/',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: '/update/update',
        element: (
          <Protected>
            <UpdateUser />
          </Protected>
        ),
      },
      {
        path: '/changePassword',
        element: (
          <Protected>
            <ChangePassword />
          </Protected>
        ),
      },
      {
        path: '/activities/create',
        element: (
          <ProtectedSuperAdmin>
            <CrearActivity />
          </ProtectedSuperAdmin>
        ),
      },
      {
        path: '/activities/update/:id',
        element: (
          <ProtectedSuperAdmin>
            <UpdateActivity />
          </ProtectedSuperAdmin>
        ),
      },
      {
        path: '/activities/feed',
        element: <ActivitiesFeed />,
      },
      {
        path: '/activities/:idActivity',
        element: <ActivityDetailPage />,
      },
      {
        path: '/profile',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: 'chat',
            element: <ChatInput />,
          },
          {
            path: 'chat/detail/:chatId',
            element: <ChatDetail />,
          },
          {
            path: 'activities',
            element: <ActivitiesFeed />,
          },
          {
            path: 'reviews',
            element: <UserReviews />,
          },
          {
            path: 'activitiesFav',
            element: <UserActivitiesFav />,
          },
          {
            path: 'books',
            element: <BookingsFeed />,
          },
        ],
      },
      {
        path: '/createMessage',
        element: <MessageComponent />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/wall',
        element: <Wall />,
      },
      {
        path: '/wall/:wallId',
        element: <WallDetailPage />,
      },
      {
        path: '/createWallForm',
        element: <CreateWallForm />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/calendar/day/:idDay',
        element: <BookingDay />,
      },
      {
        path: '/activitiesList',
        element: (
          <ProtectedSuperAdmin>
            <ActivityListSuperAdmin />
          </ProtectedSuperAdmin>
        ),
      },
      {
        path: '/superadmin',
        element: (
          <ProtectedSuperAdmin>
            <SuperAdminPanel />
          </ProtectedSuperAdmin>
        ),
      },
      {
        path: '/createNewDay',
        element: (
          <ProtectedSuperAdmin>
            <CreateNewDay/>
          </ProtectedSuperAdmin>
        ),
      },
      {
        path: '/allContacts',
        element: (
          <ProtectedSuperAdmin>
            <ContactMessage/>
          </ProtectedSuperAdmin>
        ),
      },
    ],
  },
]);
