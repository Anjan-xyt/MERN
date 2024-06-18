import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import { Home, Login, Register, Explore, Profile } from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './globalCSS.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
