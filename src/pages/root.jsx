import { Badge } from "@mui/joy";
import NavBar from "../components/Fragments/NavBar"
import { Link, Outlet } from "react-router-dom";

function Root() {
    return (
        < >
            <NavBar >
                
            </NavBar>
            <Outlet />
        </>
    )
}

export default Root 