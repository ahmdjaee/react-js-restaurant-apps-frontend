import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
