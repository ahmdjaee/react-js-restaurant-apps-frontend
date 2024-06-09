import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Fragments/Navigation/NavBar";
import BottomNavigationBar from "../components/Fragments/Navigation/BottomNavigationBar";

function Root() {
    const [item, setOutletItem] = useState(0)

    return (
        < >
            <NavBar item={item} />
            <Outlet context={{ setOutletItem }} />
            <BottomNavigationBar />
        </>
    )
}

export default Root


