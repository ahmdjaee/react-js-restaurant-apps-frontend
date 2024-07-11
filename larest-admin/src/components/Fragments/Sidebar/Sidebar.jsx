import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStateContext } from '../../../context/ContextProvider';
import { CircularProgress } from '@mui/material';
import useFetchData from '../../../hooks/useFetch';
import { BiUser } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdAutorenew, MdOutlineEventAvailable } from 'react-icons/md';
import { HiOutlinePresentationChartBar, HiOutlinePresentationChartLine } from 'react-icons/hi2';

const links = [
  { to: '/menus', icon: <IoFastFoodOutline className="size-5" />, text: 'Menus' },
  { to: '/transactions', icon: <MdAutorenew className="size-5" />, text: 'Transactions' },
  { to: '/events', icon: <MdOutlineEventAvailable className="size-5" />, text: 'Events' },
  { to: '/users', icon: <BiUser className="size-5" />, text: 'Users' },
]

function SidebarLink({ to, icon, text }) {
  const location = useLocation();

  return (
    <Link
      className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 active: hover:text-gray-700 
        ${location.pathname === to && 'text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200'}`}
      to={to}>
      {icon}
      <span className="mx-2 text-sm font-medium">{text}</span>
    </Link>
  )
}

function Sidebar() {
  const [loading, _, response] = useFetchData("/users/current")
  const { user, setUser } = useStateContext();

  useEffect(() => {
    if (response) {
      setUser(response.data)
    }
  }, [response])
  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <a href="#">
        <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="" />
      </a>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label>
            
            <SidebarLink
              to="#"
              icon={<HiOutlinePresentationChartLine className="w-5 h-5" />}
              text="Dashboard"
            />  
            <SidebarLink
              to="#"
              icon={<HiOutlinePresentationChartBar className="w-5 h-5" />}
              text="Performance"
            />
          </div>

          <div className="space-y-3">
            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">content</label>

            {links.map((link, index) => (
              <SidebarLink
                key={index}
                to={link.to}
                icon={link.icon}
                text={link.text}
              />
            ))}
          </div>
        </nav>

        <div className="flex items-center justify-center px-3 mt-5">
          {user === null || loading
            ? <CircularProgress />
            : <>
              <img className="object-cover mx-2 rounded-full h-9 w-9" src={user.photo} alt="avatar" />
              <span className="mx-2 text-sm font-medium text-gray-600 dark:text-gray-300">{user.name}</span>
            </>
          }
        </div>
      </div>
    </aside>

  )
}

export default Sidebar