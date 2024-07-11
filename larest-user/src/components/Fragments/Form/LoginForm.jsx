
import InputForm from "../../Elements/Input/InputForm";
import { login } from "../../../services/UserService";
import CircularProgress from "../../Elements/Indicator/CircularProgress";
import CustomSnackbar from "../../Elements/Indicator/CustomSnackbar";
import { Link } from "react-router-dom";
import { Button, Checkbox, Typography } from "@mui/joy";
import { useStateContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const { state, dispatch, setToken } = useStateContext();
    async function handleLogin() {
        dispatch({ type: "ACTION_START" })
        const response = await login({ email: state.email, password: state.password });

        if (response.errors) {
            dispatch({ type: "ACTION_ERROR", payload: { errors: response.errors } })
        }

        if (response.data) {
            navigate("/")
            dispatch({ type: "ACTION_SUCCESS" })
            setToken(response.data.token);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE", payload: { name, value } })
    }

    return (
        <>
            {state.loading && <CircularProgress />}

            {state.errors.message &&
                < CustomSnackbar
                    variant="error"
                    text={state.errors.message}
                />
            }

            <div className="m-auto">
                <Typography level="h3" sx={{ fontWeight: "bold" }} color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" sx={{ mt: 1 }}>
                    Use the account you registered earlier
                </Typography>
                <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-5 flex flex-col gap-6">
                        <InputForm
                            name={"email"}
                            title="Your Email"
                            type="email"
                            placeholder="name@mail.com"
                            value={state.email}
                            onChange={(e) => handleChange(e)}
                            errorsText={state.errors.email}
                        />
                        <InputForm
                            name={"password"}
                            title="Password"
                            type="password"
                            placeholder="********"
                            value={state.password}
                            onChange={(e) => handleChange(e)}
                            errorsText={state.errors.password}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleLogin()
                            }}
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
                    />
                    <Button
                        sx={{ mt: 4 }}
                        color="dark"
                        fullWidth
                        onClick={() => handleLogin()}>
                        LOGIN
                    </Button>
                    <Typography sx={{ color: "GrayText", mt: 2 }} className="mt-4 text-center font-normal">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-medium text-gray-900">
                            Register
                        </Link>
                    </Typography>
                </form>
            </div>
        </>

    )
}

export default LoginForm
