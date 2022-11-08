import React, { useState } from "react";

function LoginForm(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // data is sent as 2 separate strings
    props.loginCb(email, password);
  }

  return (
    <form
      className="row g-3 needs-validation"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="col-md-5">
        <label htmlFor="validationCustomEmail" className="form-label">
          Email
        </label>
        <div className="input-group has-validation">
          <input
            type="email"
            className="form-control"
            id="validationCustomEmail"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            Please enter your email address.
          </div>
        </div>
      </div>

      <div className="col-md-7">
        <label htmlFor="validationCustomPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="validationCustomPassword"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please enter your password.</div>
      </div>

      <div className="col-12">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
