import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  let [loginFormData, setLoginFormData] = useState([]);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setLoginFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(loginFormData);
    // props.updateProjectCb(projectFormData);
  }

  return (
    <form className="row g-3 needs-validation" noValidate>
      <div className="col-md-4">
        <label htmlFor="validationCustomUsername" className="form-label">
          Email
        </label>
        <div className="input-group has-validation">
          {/* <span className="input-group-text" id="inputGroupPrepend">
            @
          </span> */}
          <input
            type="text"
            className="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
            value={loginFormData.email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">
            Please enter your email address.
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom03"
          value={loginFormData.password}
          required
          onChange={handleChange}
        />
        <div className="invalid-feedback">Please enter your password.</div>
      </div>

      <div className="col-12">
        <button
          className="btn btn-primary"
          type="submit"
          onSubmit={handleSubmit}
        >
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
