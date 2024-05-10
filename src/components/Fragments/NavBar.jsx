import OvalButton from "../Elements/Button/OvalButton"
import NavLink from "../Elements/Link/NavLink"
import Logo from "../Elements/Logo/Logo"

function NavBar() {
    return (
        <nav className="container py-6 flex items-center justify-between">
            <Logo home={"/"} />
            <NavLink menu="/menus" events="/events" about="/about" contacts="/contact" />
            <OvalButton text="Book a table" />
        </nav>
    )
}

export default NavBar