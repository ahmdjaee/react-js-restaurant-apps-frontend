
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Fragments/Navigation/NavBar";
import BottomNavigationBar from "../../components/Fragments/Navigation/BottomNavigationBar";
import CartProvider from "../../context/CartContext";

function Root() {
    return (
        <CartProvider>
            <NavBar />
            <Outlet />
            <BottomNavigationBar />
        </CartProvider>
    )
}

export default Root


