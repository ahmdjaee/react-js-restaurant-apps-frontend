import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator"
import InputForm from "@/components/Elements/Input/InputForm"
import { useStateContext } from "@/context/ContextProvider"
import { actionCreate, useCrudContext } from "@/context/CrudContextProvider"
import axiosClient from "@/services/axios"
import { ACTION } from "@/utils/action"
import { Button, Checkbox, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterForm() {
  const navigate = useNavigate()
  const { state, dispatch, } = useCrudContext()
  const { setToken } = useStateContext();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onRegister() {
    await actionCreate("/users/register", { name, email, password }, dispatch)
  }

  async function login() {
    try {
      const response = await axiosClient.post("/users/login", { email, password });
      if (response.status === 200) {
        setToken(response.data.data.token);
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: ACTION.FAILED, payload: { errors: error?.response?.data?.errors } });
    }
  }

  useEffect(() => {
    if (state.success === true) login();

    return () => dispatch({ type: ACTION.RESET })
  }, [state.success])

  return (
    <>
      {state.loading && < FloatProgressIndicator />}
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
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              errorsText={state.error?.name}
            />
            <InputForm
              title="Your Email"
              type="email"
              placeholder="name@mail.com"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              errorsText={state.error?.email}
            />
            <InputForm
              title="Password"
              type="password"
              placeholder="********"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              errorsText={state.error?.password}
            >
              {state.error?.password == null && <p className="text-xs absolute">&#9888; Password min 8 characters</p>}
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