import {
    Button,
    Card,
    Checkbox,
    Input,
    Typography,
} from "@material-tailwind/react";
import InputForm from "../../Elements/Input/InputForm";
import { useState } from "react";
import { login } from "../../../services/UserService";
import { CookiesProvider, useCookies } from "react-cookie";

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [cookies, setCookie] = useCookies(['X-LGN-TOKEN'])

    async function onLogin() {
        const response = await login({ email, password })

        const errors = response.errors
        if (errors) {
            setErrors(errors)
        }

        const success = response.data
        if (success) {
            setCookie('X-LGN-TOKEN', success.token, { path: '/' })
            setCookie('X-NAME', success.name, { path: '/' })
            window.location.href = "/";
        }

    }
    return (
        <Card color="transparent" className="m-auto" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Use the account you registered earlier
            </Typography>
            <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-5 flex flex-col gap-6">
                    <InputForm
                        title="Your Email"
                        type="email"
                        placeholder="name@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        errorsText={errors.email}
                    />
                    <InputForm
                        title="Password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        errorsText={errors.password}
                    />
                </div>
                <Checkbox
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a
                                href="#"
                                className="font-medium transition-colors hover:text-gray-900"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button
                    className="mt-6"
                    fullWidth
                    onClick={onLogin}>
                    Login
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don't have an account?{" "}
                    <a href="/register" className="font-medium text-gray-900">
                        Register
                    </a>
                </Typography>
            </form>
        </Card>
    )
}

export default LoginForm