import { createBrowserRouter } from 'react-router-dom'
import { CheckCode, Dashboard, Login, Register } from '../pages'
import App from '../App'
import { ForgotPassword } from '../pages/ForgotPassword'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
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
                element: <CheckCode />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/forgotPassword',
                element: <ForgotPassword />,
            },
        ]
    }
])