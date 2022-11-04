import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
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
          required
        />
        <div className="invalid-feedback">Please enter your password.</div>
      </div>

      <div className="col-12">
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
