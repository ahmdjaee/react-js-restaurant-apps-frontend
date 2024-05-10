
import NavBar from "../components/Fragments/NavBar"
import Home from "../components/Layouts/Home"
import { Outlet } from "react-router-dom";

function Root() {
    return (
        < >
            <NavBar />
            <Outlet />
        </>
    )
}

export default Root 