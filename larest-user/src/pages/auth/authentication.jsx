import { Navigate, Outlet } from "react-router-dom";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { useStateContext } from "../../context/ContextProvider";

function Authentication() {
    const { token } = useStateContext()

    return (
        <>
            {token !== null
                ? <Navigate to="/" />
                : <AuthLayout>
                    <Outlet />
                </AuthLayout>
            }
        </>
    )
}

export default Authentication