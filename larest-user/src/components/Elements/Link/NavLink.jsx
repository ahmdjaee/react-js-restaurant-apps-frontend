import { NavLink as Link } from "react-router-dom"

const links = [
    ["Menu", "/menus"],
    ["Events", "/events"],
    ["About", "/about"],
    ["Contact", "/contact"],
]
function NavLink() {
    return (
        <div className="hidden sm:flex gap-8 items-center">
            {
                links.map(([name, link]) => (
                    <Link key={name} className={({ isActive }) =>
                        isActive
                            ? " text-black font-semibold "
                            : "hover:font-semibold hover:text-black text-zinc-500"
                    }
                        to={link}
                    >
                        {name}
                    </Link>
                ))
            }
        </div>
    )
}

export default NavLink