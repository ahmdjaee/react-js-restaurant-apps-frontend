import RegisterForm from "../../components/Fragments/Form/RegisterForm";
import Authentication from "../../components/Layouts/Authentication";

export default function Register() {
    return (
        <Authentication>
            <RegisterForm />
        </Authentication>
    )
}