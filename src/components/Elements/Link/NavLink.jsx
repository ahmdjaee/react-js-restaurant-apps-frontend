import { Outlet, Link } from "react-router-dom";

function NavLink({ menu, events, about, contacts }) {
    return (
        <div className="flex gap-8">
            <Link className="hover:font-semibold hover:text-black focus:text-black focus:font-semibold text-zinc-500" to={menu}>Menu</Link>
            <Link className="hover:font-semibold hover:text-black focus:text-black focus:font-semibold text-zinc-500" to={events}>Events</Link>
            <Link className="hover:font-semibold hover:text-black focus:text-black focus:font-semibold text-zinc-500" to={about}>About</Link>
            <Link className="hover:font-semibold hover:text-black focus:text-black focus:font-semibold text-zinc-500" to={contacts}>Contact</Link>
        </div>
    )
}

export default NavLink