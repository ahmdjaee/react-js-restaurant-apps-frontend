import { FaAddressBook, FaAddressCard, FaBowlFood, FaCalendarCheck, FaHouse } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


const links = [
  ["Home", "/", <FaHouse className="size-5 mb-1" />],
  ["Menu", "/menus", <FaBowlFood className="size-5 mb-1" />],
  ["Events", "/events", <FaCalendarCheck className="size-5 mb-1" />],
  ["Contact", "/contact", <FaAddressBook className="size-5 mb-1" />],
  ["About", "/about", <FaAddressCard className="size-5 mb-1" />],
]
export default function BottomNavBar() {
  return (
    <div className="sm:hidden sticky mt-auto bottom-0 left-0 z-50 w-full py-2 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {links.map(([name, link, icon]) => (
          <NavLink key={name} to={link} className={({ isActive }) => (
            isActive
              ? "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  text-primary"
              : "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  text-gray-500")}
          >
            {icon}
            <span className="text-sm text-gray ">{name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}