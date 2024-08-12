import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Main from "@/components/Layout/MainLayout.jsx";
import Login from "@/pages/auth/index.jsx";
import Category from "@/pages/category/index.jsx";
import Dashboard from "@/pages/dashboard/index.jsx";
import ErrorPageNotFound from "@/pages/errors/index.jsx";
import Event from "@/pages/event/index.jsx";
import Menu from "@/pages/menu/index.jsx";
import DetailOrder, { loader as detailOrderLoader } from "@/pages/order/components/DetailOrder.jsx";
import Order from "@/pages/order/index.jsx";
import Reservation from "@/pages/reservation/index.jsx";
import Tables from "@/pages/table/index.jsx";
import Transaction from "@/pages/transaction/index.jsx";
import User from "@/pages/user";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPageNotFound />}>
      <Route path="/" element={<Main />} >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="menus" element={<Menu />} />
        <Route path="events" element={<Event />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="tables" element={<Tables />} />
        <Route path="categories" element={<Category />} />
        <Route path="orders" element={<Order />} />
        <Route path="orders/:id" element={<DetailOrder />} loader={detailOrderLoader} />
        <Route path="reservations" element={<Reservation />} />
      </Route>

      <Route path="login" element={<Login />} />
    </Route>
  )
);
