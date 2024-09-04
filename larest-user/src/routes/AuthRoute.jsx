import { useStateContext } from '@/context/AuthContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute() {
  const { token } = useStateContext();

  if (token) return <Navigate to="/" />

  return <Outlet />
}

export default AuthRoute