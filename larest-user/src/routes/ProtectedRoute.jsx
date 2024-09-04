import { useStateContext } from '@/context/AuthContextProvider';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { token } = useStateContext();

  if (!token) return <Navigate to="/login" />

  return <Outlet />
}


export default ProtectedRoute