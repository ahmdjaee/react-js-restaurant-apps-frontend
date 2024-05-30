import { login } from "../../services/UserService";

const useLogin = () => {
    async function onLogin() {
        const response = await login({ email, password })

        if (response.errors) {
            setErrors(response.errors)
        }

        if (response.data) {
            window.location.href = "/";
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data))
        }

    }
}