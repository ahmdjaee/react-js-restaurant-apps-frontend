import { Outlet } from "react-router-dom";
import AuthLayout from "@/components/Layouts/AuthLayout";

function Authentication() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

export default Authentication