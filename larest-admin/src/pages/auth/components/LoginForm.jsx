
import { Button, Card, Checkbox, Snackbar, Typography } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatProgressIndicator from "../../../components/Elements/Indicator/FloatProgressIndicator";
import InputForm from "../../../components/Elements/Input/InputForm";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../service/axios";

function LoginForm() {
  const navigate = useNavigate();
  const { state, dispatch, setToken } = useStateContext();
  const [open, setOpen] = useState(false)
  async function handleLogin() {
    dispatch({ type: "ACTION_START" });
    try {
      const response = await axiosClient.post("/admin/login", {
        email: state.email,
        password: state.password,
      });
      if (response.status === 200 && response.data.data.is_admin) {
        setToken(response.data.data.token);
        navigate("/users");
      }
    } catch (error) {
      dispatch({ type: "ACTION_ERROR", payload: error.response.data });

      if (error.response.data.errors.message) {
        setOpen(true)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", payload: { name, value } });
  };

  return (
    <>
      {state.loading && <FloatProgressIndicator />}

      {/* {state.errors.message &&
                < CustomSnackbar
                    variant="error"
                    text={state.errors.message}
                />
            } */}

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
            fullWidth
            onClick={() => handleLogin()}>
            LOGIN
          </Button>
        </form>
      </div>
      <Card sx={{ gap: 0, m: 2, position: "absolute", bottom: 0, right: 0, p: 2, textAlign: "center" }}>
        <p className="font-bold">SELAMAT DATANG DI DEMO LAREST ADMIN</p>
        <p>Silahkan copy data dibawah untuk login</p>
        <p>email : admin@gmail.com</p>
        <p>password : 123456789</p>
      </Card>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        message={state.errors.message}
      />
    </>
  );
}

export default LoginForm;
