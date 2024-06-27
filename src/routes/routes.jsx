import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Root from '../pages/root.jsx';
import Home from "../pages/home/home.jsx";
import Menu from '../pages/menus/menus.jsx';
import About from '../pages/about/about.jsx';
import Contact from '../pages/contact/contact.jsx';
import Detail, { loader as menuLoader } from '../pages/menus/detail.jsx';
import Cart from '../pages/carts/carts.jsx';
import ErrorPageNotFound from '../pages/errors/errors.jsx';
import Order from '../pages/order/order.jsx';
import Transaction from '../pages/transactions/transactions.jsx';
import Payment from "../pages/payment/payment.jsx";
import Event from "../pages/events/events.jsx";
import Success from "../pages/order/success.jsx";
import OrderNavbar from "../pages/root-order.jsx";
import Authentication from "../pages/authentication/authentication.jsx";
import LoginForm from "../components/Fragments/Form/LoginForm.jsx";
import RegisterForm from "../components/Fragments/Form/RegisterForm.jsx";
import Events from "../pages/events/events.jsx";


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
        </>
    )
);