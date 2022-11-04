import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

function AccountAccessView(props) {
  return (
    <div className="AccountAccessView">
      <h2>Welcome back!</h2>
      <h3>Please login to access your account.</h3>
      <LoginForm loginCb={(email, pw) => props.loginCb(email, pw)} />

      <h2>New to Mindconnect?</h2>
      <h3>Please register to create a user account.</h3>
      <RegisterForm />
    </div>
  );
}

export default AccountAccessView;
