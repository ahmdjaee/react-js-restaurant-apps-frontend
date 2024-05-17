import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './pages/root.jsx'
import Home from './components/Layouts/Home.jsx';
import Menu from './components/Layouts/Menu.jsx';
import About from './components/Layouts/About.jsx';
import Contact from './components/Layouts/Contact.jsx';
import Detail from './components/Layouts/Detail.jsx';
import Cart from './components/Layouts/Cart.jsx';
import Login from './pages/login.jsx';
import ErrorPageNotFound from './pages/errors.jsx';
import Register from './pages/register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPageNotFound/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menus",
        element: <Menu />,
      },
      {
        path: "/menus/detail",
        element: <Detail />,
      },
      {
        path: "/events",
        element: <h1>Events</h1>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/carts",
        element: <Cart />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
