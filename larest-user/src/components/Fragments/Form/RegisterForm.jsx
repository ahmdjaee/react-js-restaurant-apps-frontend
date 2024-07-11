import {
    Button,
    Checkbox,
    Typography,
} from "@mui/joy";
import { useState } from "react";
import { register } from "../../../services/UserService";
import InputForm from "../../Elements/Input/InputForm";
import CircularProgress from "../../Elements/Indicator/CircularProgress";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    async function onRegister() {
        const response = await register({ name, email, password })
        setLoading(true)

        if (response.code === 400) {
            setErrors(response.data.errors)
            setLoading(false)
        }

        if (response.code === 201) {
            setLoading(false)
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
                window.location.href = "/login";
            }, 1000)
            setErrors({})
        }
    }

    return (
        <>
            {loading && <CircularProgress />}
            {alert && <div
                className="absolute bottom-8 right-0 animate-right-slide-in block w-1/4 text-center p-4 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
                Successfully registered
            </div>}
            <div className="m-auto">
                <Typography level="h3" sx={{ fontWeight: "bold" }} color="blue-gray">
                    Sign Up
                </Typography>
                <Typography level="" sx={{ mt: 1, maxWidth: "320px" }}>
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-5 flex flex-col gap-6">
                        <InputForm
                            title="Your Name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            errorsText={errors.name}
                        />
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
                        >
                            {errors.password == null && <p className="text-xs absolute">&#9888; Password min 8 characters</p>}
                        </InputForm>
                    </div>
                    <Checkbox
                        sx={{ mt: 2 }}
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
                    />
                    <Button
                        disabled={!name || !email || !password}
                        color="dark"
                        sx={{ mt: 4 }}
                        fullWidth
                        onClick={onRegister}>
                        Register
                    </Button>
                    <Typography sx={{ color: "GrayText", mt: 2 }} className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900"> Sign In</Link>
                    </Typography>
                </form>
            </div>
        </>
    )
}