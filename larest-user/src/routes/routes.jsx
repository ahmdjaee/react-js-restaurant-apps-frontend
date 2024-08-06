import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import LoginForm from "@/components/Fragments/Form/LoginForm";
import RegisterForm from "@/components/Fragments/Form/RegisterForm.jsx";
import MainLayout, { loader as mainLoader } from '@/components/Layouts/MainLayout.jsx';
import OrderLayout from "@/components/Layouts/OrderLayout.jsx";
import About from "@/pages/about/index.jsx";
import Authentication from "@/pages/auth/index.jsx";
import Cart from "@/pages/carts/index.jsx";
import Contact from '@/pages/contact/index.jsx';
import ErrorPageNotFound from '@/pages/errors/index.jsx';
import Events, { loader as eventLoader } from "@/pages/events/index.jsx";
import Home, { loader as homeLoader } from "@/pages/home";
import Detail, { action as menuDetailAction, loader as menuDetailLoader } from '@/pages/menus/detail.jsx';
import Menu, { loader as menuLoader } from '@/pages/menus/menus.jsx';
import Order from '@/pages/order/order.jsx';
import Success from "@/pages/order/success.jsx";
import Payment from "@/pages/payment/index.jsx";
import Reservation, { loader as reservationLoader } from "@/pages/reservation";
import Transaction from '@/pages/transactions/index.jsx';
import Profile from "@/pages/user/profile.jsx";
import SuccessRegister from "@/pages/auth/components/SuccessRegister";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />} loader={mainLoader}  >
        <Route errorElement={<ErrorPageNotFound />}   >
          <Route index element={<Home />} loader={homeLoader} />
          <Route path="menus" element={<Menu />} loader={menuLoader} />
          <Route path="menus/:id" element={<Detail />} action={menuDetailAction} loader={menuDetailLoader} />
          <Route path="events" element={<Events />} loader={eventLoader} />
          <Route path="about" element={<About />} />
          <Route path="reservation" element={<Reservation />} loader={reservationLoader} />
          <Route path="contact" element={<Contact />} />
          <Route path="carts" element={<Cart />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<Authentication />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="register/success" element={<SuccessRegister />} />
      </Route>

      <Route element={<OrderLayout />} loader={reservationLoader}>
        <Route path="order" element={<Order />} />
        <Route path="order/payment" element={<Payment />} />
        <Route path="order/success" element={<Success />} />
      </Route>
      <Route path="order/success" element={<Success />} />
      <Route path="payment" element={<Payment />} />

      <Route path="*" element={<ErrorPageNotFound />} />
    </Route>
  )
);