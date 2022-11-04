import React from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <form className="row g-3 needs-validation" noValidate>
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          value="Mark"
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationCustom02" className="form-label">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom02"
          value="Otto"
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
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
          />
          <div className="invalid-feedback">
            Please add a valid email address.
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
          Submit form
        </button>
      </div>
    </form>
  );
}
export default RegisterForm;
