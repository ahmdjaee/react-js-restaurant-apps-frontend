import { Badge } from "@mui/joy";
import NavBar from "../components/Fragments/NavBar"
import { Link, Outlet } from "react-router-dom";

function Root() {
    return (
        < >
            <NavBar >
                <Link to={"/carts"}>
                    <Badge color='danger' variant='solid' size='sm' badgeInset="-10%">
                        <i className="fa-solid fa-shopping-cart fa-xl " ></i>
                    </Badge>
                </Link>
            </NavBar>
            <Outlet />
        </>
    )
}

export default Root 