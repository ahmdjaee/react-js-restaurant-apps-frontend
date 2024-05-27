import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// [
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPageNotFound />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/menus",
//         element: <Menu />,
//       },
//       {
//         path: "/menus/:id",
//         element: <Detail />,
//         loader: menuLoader,

//       },
//       {
//         path: "/events",
//         element: <h1>Events</h1>,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//         path: "/carts",
//         element: <Cart />,
//       }
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/register",
//     element: <Register />
//   },
//   {
//     path: "/order",
//     element: <Order />
//   },
//   {
//     path: "/transactions",
//     element: <Transaction />
//   },

// ]