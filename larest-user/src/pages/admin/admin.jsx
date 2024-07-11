import React from 'react'
import Sidebar from '../../components/Fragments/Sidebar/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/Fragments/Navigation/AdminNavbar'
import { UserProvider } from '../../context/admin/UserContext'
import { useStateContext } from '../../context/ContextProvider'

function Admin() {
    const { token } = useStateContext();
    
    return (
        <>
            {token === null
                ? <Navigate to="/login" />
                : <UserProvider>
                    <div className="flex overflow-hidden">
                        <Sidebar />
                        <div className="flex-grow block overflow-y-auto overflow-x-clip">
                            <AdminNavbar />
                            <Outlet />
                        </div>
                    </div>
                </UserProvider>
            }
        </>
    )
}


export default Admin