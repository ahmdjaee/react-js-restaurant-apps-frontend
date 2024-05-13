import { Link } from "react-router-dom"
import OvalButton from "../Elements/Button/OvalButton"
import NavLink from "../Elements/Link/NavLink"
import Logo from "../Elements/Logo/Logo"
import { Button } from "@material-tailwind/react"
import Modal from "./Modal/Modal"
import { useState } from "react"
import LoginForm from "./Form/LoginForm"


function NavBar() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Modal showModal={showModal} children={
                <LoginForm onCancel={() => setShowModal(false)} />
            } />
            <nav className="container py-6 flex items-center justify-between">
                <Logo home={"/"} />
                <NavLink menu="/menus" events="/events" about="/about" contacts="/contact" />
                <div className="flex gap-12 items-center">
                    <Link to={"/carts"}><i className="fa-solid fa-shopping-cart fa-xl" ></i></Link>
                    <Button variant="outlined" color="deep-orange" onClick={() => setShowModal(true)}>Sign in</Button>
                    {/* <OvalButton text="Book a table" /> */}
                </div>
            </nav>
        </>
    )
}

export default NavBar