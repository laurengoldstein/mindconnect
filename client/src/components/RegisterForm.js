import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm(props) {
  let [registerFormData, setRegisterFormData] = useState([]);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setRegisterFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(registerFormData);
    props.registerAccountCb(registerFormData);
  }
  return (
    <div className="RegisterForm">
      <form
        className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            name="firstName"
            value={registerFormData.firstName}
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            name="lastName"
            value={registerFormData.lastName}
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-5">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              name="email"
              value={registerFormData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please add a valid email address.
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <label htmlFor="validationCustom03" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            name="password"
            value={registerFormData.password}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please provide a password.</div>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterForm;
