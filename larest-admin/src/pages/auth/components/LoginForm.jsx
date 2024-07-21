
import { Button, Card, Checkbox, Snackbar, Typography } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatProgressIndicator from "../../../components/Elements/Indicator/FloatProgressIndicator";
import InputForm from "../../../components/Elements/Input/InputForm";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../service/axios";
import { actionPost } from "../../../context/CrudContextProvider";
import { ACTION } from "../../../utils/action";

function LoginForm() {
  const navigate = useNavigate();
  const { state, dispatch, setToken } = useStateContext();
  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      dispatch({ type: ACTION.START });
      const response = await axiosClient.post("/admin/login", formJson);
      if (response.status === 200) {
        setToken(response.data.data.token);
        navigate("/users");
      }
    } catch (error) {
      dispatch({ type: ACTION.FAILED, payload: { errors: error?.response?.data?.errors } });
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
              defaultValue={"admin@gmail.com"}
              placeholder="name@mail.com"
              errorsText={state?.errors?.email}
            />
            <InputForm
              name={"password"}
              title="Password"
              type="password"
              defaultValue={"123456789"}
              placeholder="********"
              errorsText={state?.errors?.password}
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
            fullWidth
            type="submit"
          >
            LOGIN
          </Button>
        </form>
      </div>
      <Snackbar
        open={state.success || state.failed}
        color={state.success ? "success" : state.failed && "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        {state?.errors?.message}
      </Snackbar >
    </>
  );
}

export default LoginForm;
