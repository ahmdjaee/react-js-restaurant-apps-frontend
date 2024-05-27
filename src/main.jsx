import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './pages/root.jsx'
import Home from './pages/home/Home.jsx';
import Menu from './pages/menus/menus.jsx';
import About from './pages/about/About.jsx';
import Contact from './pages/contact/Contact.jsx';
import Detail, { loader as menuLoader } from './pages/menus/Detail.jsx';
import Cart from './pages/carts/carts.jsx';
import Login from './pages/login/login.jsx';
import ErrorPageNotFound from './pages/errors/errors.jsx';
import Register from './pages/register/register.jsx';
import Order from './pages/order/order.jsx';
import Transaction from './pages/transactions/transactions.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPageNotFound />,
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
        path: "/menus/:id",
        element: <Detail />,
        loader: menuLoader,

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
        element: <Cart />,
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
  },
  {
    path: "/order",
    element: <Order />
  },
  {
    path: "/transactions",
    element: <Transaction />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
