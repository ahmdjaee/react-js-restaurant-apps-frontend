import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/auth/index.jsx";
import Menu from "../pages/menu/index.jsx";
import Event from "../pages/event/index.jsx";
import User from "../pages/user/index.jsx";
import Transaction from "../pages/transaction/index.jsx";
import Main from "../components/Layout/MainLayout.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />}>
        <Route path="users" element={<User />} />
        <Route path="menus" element={<Menu />} />
        <Route path="events" element={<Event />} />
        <Route path="transactions" element={<Transaction />} />
      </Route>

      <Route path="login" element={<Login />} />
    </>
  )
);
