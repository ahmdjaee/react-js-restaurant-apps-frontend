import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../Fragments/Navigation/NavBar'
import Sidebar from '../Fragments/Sidebar/Sidebar'
import { useStateContext } from '../../context/ContextProvider'

function Main() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <div className="flex-grow block overflow-y-auto overflow-x-clip">
                <NavBar />
                <Outlet />
            </div>
        </div>
    )
}

export default Main