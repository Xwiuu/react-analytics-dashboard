import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)