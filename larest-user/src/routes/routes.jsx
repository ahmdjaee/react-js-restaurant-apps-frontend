import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Root from '../pages/users/root.jsx';
import Home from "../pages/users/home/home.jsx";
import Menu from '../pages/users/menus/menus.jsx';
import About from '../pages/users/about/about.jsx';
import Contact from '../pages/users/contact/contact.jsx';
import Detail, { loader as menuLoader } from '../pages/users/menus/detail.jsx';
import Cart from '../pages/users/carts/carts.jsx';
import ErrorPageNotFound from '../pages/errors/errors.jsx';
import Order from '../pages/users/order/order.jsx';
import Transaction from '../pages/users/transactions/transactions.jsx';
import Payment from "../pages/users/payment/payment.jsx";
import Success from "../pages/users/order/success.jsx";
import OrderNavbar from "../pages/users/order/root.jsx";
import Authentication from "../pages/auth/authentication.jsx";
import LoginForm from "../components/Fragments/Form/LoginForm.jsx";
import RegisterForm from "../components/Fragments/Form/RegisterForm.jsx";
import Events from "../pages/users/events/events.jsx";
import Admin from "../pages/admin/admin.jsx";
import AdminMenu from "../pages/admin/menu/admin-menus.jsx";
import AdminOrders from "../pages/admin/orders/admin-orders.jsx";
import AdminTransaction from "../pages/admin/transaction/admin-transactions.jsx";
import AdminReservation from "../pages/admin/reservation/admin-reservation.jsx";
import AdminEvents from "../pages/admin/events/admin-events.jsx";
import AdminUsers from "../pages/admin/users/admin-users.jsx";
import Profile from "../pages/users/user/profile.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="menus" element={<Menu />} />
                <Route path="menus/:id" element={<Detail />} loader={menuLoader} />
                <Route path="events" element={<Events />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="carts" element={<Cart />} />
                <Route path="transactions" element={<Transaction />} />
                <Route path="profile" element={<Profile />} />
            </Route>

            <Route element={<Authentication />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
            </Route>

            <Route element={<OrderNavbar />} >
                <Route path="order" element={<Order />} />
                <Route path="order/payment" element={<Payment />} />
                <Route path="order/success" element={<Success />} />
            </Route>
            <Route path="order/success" element={<Success />} />
            <Route path="payment" element={<Payment />} />
            <Route path="*" element={<ErrorPageNotFound />} />

            <Route path="admin" element={<Admin />} >
                <Route path="menus" element={<AdminMenu />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="transactions" element={<AdminTransaction />} />
                <Route path="reservations" element={<AdminReservation />} />
                <Route path="events" element={<AdminEvents />} />
            </Route>
        </>
    )
);