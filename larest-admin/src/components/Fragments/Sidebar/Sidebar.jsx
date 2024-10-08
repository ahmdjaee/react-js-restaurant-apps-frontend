import { Avatar, Skeleton } from "@mui/joy";
import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import {
  HiOutlinePresentationChartLine
} from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  MdAutorenew,
  MdOutlineCategory,
  MdOutlineEventAvailable,
  MdOutlineTableBar,
} from "react-icons/md";
import { RiReservedLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider";
import useFetchData from "../../../hooks/useFetch";

const links = [
  { to: "/menus", icon: <IoFastFoodOutline className="size-5" />, text: "Menus" },
  {
    to: "/events",
    icon: <MdOutlineEventAvailable className="size-5" />,
    text: "Events",
  },
  { to: "/tables", icon: <MdOutlineTableBar className="size-5" />, text: "Tables" },
  {
    to: "/categories",
    icon: <MdOutlineCategory className="size-5" />,
    text: "Categories",
  },
  { to: "/orders", icon: <MdAutorenew className="size-5" />, text: "Orders" },
  {
    to: "/reservations",
    icon: <RiReservedLine className="size-5" />,
    text: "Reservations ",
  },
];

function SidebarLink({ to, icon, text }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 active: hover:text-gray-700 text-primary bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
          : "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 active: hover:text-gray-700 "
      }
      to={to}
    >
      {icon}
      <span className="mx-2 text-sm font-medium">{text}</span>
    </NavLink>
  );
}

function Sidebar() {
  const [loading, _, response] = useFetchData("/users/current");
  const { user, setUser } = useStateContext();

  useEffect(() => {
    if (response) {
      setUser(response.data);
    }
  }, [response, setUser]);

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <a href="#" className="flex items-center">
        <img
          className="w-auto h-7"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
        <span className="ml-2 text-2xl font-semibold text-gray-800 whitespace-nowrap dark:text-white">
          Larest
        </span>
      </a>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
              analytics
            </label>

            <SidebarLink
              to="/"
              icon={<HiOutlinePresentationChartLine className="w-5 h-5" />}
              text="Dashboard"
            />
            <SidebarLink
              to="/users"
              icon={<BiUser className="w-5 h-5" />}
              text="Users"
            />
            {/* <SidebarLink
              to="/performance"
              icon={<HiOutlinePresentationChartBar className="w-5 h-5" />}
              text="Performance"
            /> */}
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
              content
            </label>

            {links.map((link, index) => (
              <SidebarLink
                key={index}
                to={link.to}
                icon={link.icon}
                text={link.text}
              />
            ))}
          </div>

          {/* <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
              others
            </label>

            <SidebarLink
              to="/about"
              icon={<IoInformationCircleOutline className="w-5 h-5" />}
              text="About"
            />
          </div> */}
        </nav>

        <div className="flex items-center justify-center px-3 gap-1 mt-5">
          <Skeleton loading={loading} variant="circular" height={36} width={36}>
            <Avatar src={user?.photo} sx={{ width: 36, height: 36 }} />
          </Skeleton>
          <Skeleton loading={loading} variant="inline" width={60} level="body-xs">
            <span className="mx-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              {user?.name}
            </span>
          </Skeleton>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
