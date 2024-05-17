import LoginForm from "../components/Fragments/Form/LoginForm";
import Authentication from "../components/Layouts/Authentication";

function Login() {
    return (
        <Authentication>
            <LoginForm />
        </Authentication>
    )
}

export default Login