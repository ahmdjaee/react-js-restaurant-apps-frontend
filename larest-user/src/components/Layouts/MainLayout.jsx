import { Outlet, useLoaderData } from "react-router-dom"
import CartContextProvider from "@/context/CartContextProvider"
import TopNavBar from "../Fragments/Navigation/TopNavBar"
import BottomNavBar from "../Fragments/Navigation/BottomNavBar"
import TopProgressBar from "../Elements/Indicator/TopProgressBar"
import axiosClient from "@/services/axios"
import { useEffect } from "react"
import { useStateContext } from "../../context/AuthContextProvider"
import useFetchData from "@/hooks/useFetch"

export async function loader() {
  try {
    const carts = await axiosClient.get('/carts')
    return { carts: carts?.data?.data };
  } catch (error) {
    return { carts: [] };
  }
}

function MainLayout() {
  const { carts } = useLoaderData();
  const [__, _, user] = useFetchData('/users/current');
  const { setUser } = useStateContext();

  useEffect(() => {
    setUser(user?.data)
  }, [user])

  return (
    <CartContextProvider>
      <TopProgressBar />
      <TopNavBar carts={carts} />
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomNavBar />
    </CartContextProvider>
  )
}

export default MainLayout


