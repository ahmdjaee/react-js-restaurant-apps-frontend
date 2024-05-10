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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
