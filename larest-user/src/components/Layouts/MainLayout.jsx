import { Outlet, useLoaderData } from "react-router-dom"
import CartProvider from "../../context/CartContext"
import TopNavBar from "../Fragments/Navigation/TopNavBar"
import BottomNavBar from "../Fragments/Navigation/BottomNavBar"
import TopProgressBar from "../Elements/Indicator/TopProgressBar"
import axiosClient from "@/services/axios"
import { useEffect } from "react"
import { useStateContext } from "../../context/ContextProvider"
import useFetchData from "@/hooks/useFetch"

export async function loader() {
  try {
    const carts = await axiosClient.get('/carts')
    return { carts: carts?.data?.data };
  } catch (error) {
    return { carts: [] };
  }
}

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function MainLayout() {
  const { carts } = useLoaderData();
  const [__, _, user] = useFetchData('/users/current');
  const { setUser } = useStateContext();

  useEffect(() => {
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  useEffect(() => {
    setUser(user?.data)
  }, [user])

  return (
    <CartProvider>
      <TopProgressBar />
      <TopNavBar carts={carts} />
      <div className=" overflow-y-auto" style={{height: 'calc(var(--vh, 1vh) * 100)'}}>
        <Outlet />
      </div>
      <BottomNavBar />
    </CartProvider>
  )
}

export default MainLayout


