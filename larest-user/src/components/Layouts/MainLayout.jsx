import { Outlet, useLoaderData } from "react-router-dom"
import CartProvider from "../../context/CartContext"
import NavBar from "../Fragments/Navigation/NavBar"
import BottomNavigationBar from "../Fragments/Navigation/BottomNavigationBar"
import TopProgressBar from "../Elements/Indicator/TopProgressBar"
import axiosClient from "../../services/axios"
import { useEffect } from "react"
import { useStateContext } from "../../context/ContextProvider"

export async function loader() {
    const user = await axiosClient.get('/users/current');
    const carts = await axiosClient.get('/carts');
    return { user: user?.data?.data, carts: carts?.data?.data };
}

function MainLayout() {
    const { user, carts } = useLoaderData()
    const { setUser } = useStateContext();

    useEffect(() => {
        setUser(user)
    }, [user])

    return (
        <CartProvider>
            <TopProgressBar />
            <NavBar carts={carts} />
            <Outlet />
            <BottomNavigationBar />
        </CartProvider>
    )
}

export default MainLayout


