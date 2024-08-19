import CartContextProvider, { actionGet, useCartContext } from "@/context/CartContextProvider"
import useFetchData from "@/hooks/useFetch"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useStateContext } from "../../context/AuthContextProvider"
import TopProgressBar from "../Elements/Indicator/TopProgressBar"
import BottomNavBar from "../Fragments/Navigation/BottomNavBar"
import TopNavBar from "../Fragments/Navigation/TopNavBar"

function MainLayout() {
  const { state, dispatch } = useCartContext();
  const { list, refetch } = state;
  const [__, _, user] = useFetchData('/users/current');
  const { setUser } = useStateContext();

  useEffect(() => {
    setUser(user?.data)
  }, [user])

  useEffect(() => {
    const controller = new AbortController();
    actionGet('/carts', dispatch, controller.signal)
    return () => { controller.abort() };
  }, [refetch])

  return (
    <>
      <TopProgressBar />
      <TopNavBar carts={list?.data} />
      <div className="flex-1">
        <Outlet />
      </div>
      <BottomNavBar />
    </>
  )
}

export default MainLayout


