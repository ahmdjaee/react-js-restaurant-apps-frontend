import { Navigate, Outlet } from "react-router-dom";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { useStateContext } from "../../context/AuthContextProvider";

function Authentication() {
  const { token } = useStateContext()

  if (token !== null) return <Navigate to="/" />

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

export default Authentication