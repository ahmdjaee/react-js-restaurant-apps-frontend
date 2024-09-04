import { Link, Navigate, Outlet, useLoaderData } from "react-router-dom";
import Logo from "../Elements/Logo/Logo";
import { MdArrowBack } from "react-icons/md";

export default function OrderLayout() {
  // const { reservation } = useLoaderData();

  // if (!reservation) {
  //   return <Navigate to="/" replace={true} />
  // }
  return (
    <>
      <div className="flex items-center border-b bg-white top-bar-height sticky top-0 z-50 flex-row sm:px-10 lg:px-20 xl:px-32 sm:justify-normal justify-between px-3">
        <Link to={-1}>
          <MdArrowBack className="text-2xl sm:text-3xl text-gray-600" />
        </Link>
        <div className="text-xs sm:mt-0 flex justify-center sm:ml-auto sm:text-base h-[inherit]">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-emerald-700" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </a>
              <span className="font-semibold text-gray-900">Shop</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
              <span className="font-semibold text-gray-900">Order</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
              <span className="font-semibold text-gray-500">Success</span>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  )
}