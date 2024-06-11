import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Root from '../pages/root.jsx';
import Home from "../pages/home/home.jsx";
import Menu from '../pages/menus/menus.jsx';
import About from '../pages/about/about.jsx';
import Contact from '../pages/contact/contact.jsx';
import Detail, { loader as menuLoader } from '../pages/menus/detail.jsx';
import Cart from '../pages/carts/carts.jsx';
import Login from '../pages/login/login.jsx';
import ErrorPageNotFound from '../pages/errors/errors.jsx';
import Register from '../pages/register/register.jsx';
import Order from '../pages/order/order.jsx';
import Transaction from '../pages/transactions/transactions.jsx';
import Payment from "../pages/payment/payment.jsx";
import Event from "../pages/events/events.jsx";
import Success from "../pages/order/success.jsx";
import OrderNavbar from "../pages/root-order.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="menus" element={<Menu />} />
                <Route path="menus/:id" element={<Detail />} loader={menuLoader} />
                <Route path="events" element={<Event />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="carts" element={<Cart />} />
                <Route path="transactions" element={<Transaction />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<OrderNavbar />} >
                <Route path="order" element={<Order />} />
                <Route path="order/payment" element={<Payment />} />
                <Route path="order/success" element={<Success />} />
            </Route>
            <Route path="order/success" element={<Success />} />
            <Route path="payment" element={<Payment />} />
            <Route path="*" element={<ErrorPageNotFound />} />
        </>
    )
);