
import CustomSnackbar from "@/components/Elements/Indicator/CustomSnackbar";
import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator";
import InputForm from "@/components/Elements/Input/InputForm";
import { actionLogin, useStateContext } from "@/context/AuthContextProvider";
import axiosClient from "@/services/axios";
import { ACTION } from "@/utils/action";
import { Button, Checkbox, Snackbar, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { state, dispatch, setToken } = useStateContext();
  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const { data } = await actionLogin('/users/login', formJson, dispatch);
    if (data) {
      setToken(data.token);
      navigate("/")
    }
  }

  return (
    <>
      {state.loading && <FloatProgressIndicator />}

      <div className="m-auto">
        <Typography level="h3" sx={{ fontWeight: "bold" }} color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" sx={{ mt: 1 }}>
          Use the account you registered earlier
        </Typography>
        <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e) => handleLogin(e)}>
          <div className="mb-5 flex flex-col gap-6">
            <InputForm
              name={"email"}
              title="Your Email"
              type="email"
              placeholder="name@mail.com"
              defaultValue={state.email}
              errorsText={state.error?.email}
            />
            <InputForm
              name={"password"}
              title="Password"
              type="password"
              placeholder="********"
              defaultValue={state.password}
              errorsText={state.error?.password}
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
            onClick={() => handleLogin()}
            type="submit"
          >
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

      <Snackbar
        open={state.success || state.failed || false}
        color={state.success ? "success" : state.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        {state.message}
      </Snackbar >
    </>
  )
}

export default LoginForm
