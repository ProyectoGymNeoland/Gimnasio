import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { CheckCode, Dashboard, Login, Register } from '../pages'

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
        ]
    }
])