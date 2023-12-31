import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actionTypes, initialState, reducer } from "../../reducer/reducer";
import "./Style/Login.css";

// Define reducer action types

// Define an initial state

// Define a reducer function

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: actionTypes.SET_FIELD,
      fieldName: name,
      fieldValue: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password requirements
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    if (!state.form.name || !state.form.email || !state.form.password) {
      dispatch({
        type: actionTypes.SET_ERROR_MESSAGE,
        errorMessage: "Please fill in all fields",
      });
      setTimeout(() => {
        dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: "" });
      }, 5000);
      return;
    }

    if (!passwordRegex.test(state.form.password)) {
      dispatch({
        type: actionTypes.SET_ERROR_MESSAGE,
        errorMessage:
          "Password must contain at least one special character, one digit, and be at least 8 characters long",
      });
      setTimeout(() => {
        dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: "" });
      }, 5000);
      return;
    }
    // https://mern-product-backend.vercel.app/signup
    // http://localhost:8000/signup

    const response = await fetch(
      "https://mern-product-backend.vercel.app/signup",
      {
        method: "POST",
        body: JSON.stringify(state.form),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: data.msg });
      const { token, name } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      navigate("/");
      window.location.reload();
    } else {
      dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: data.msg });
      setTimeout(() => {
        dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: "" });
      }, 1200);
    }
  };

  const togglePasswordVisibility = () => {
    dispatch({ type: actionTypes.TOGGLE_PASSWORD_VISIBILITY });
  };

  return (
    <section className=" gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-3 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: 185 }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-4 pb-1">We are The Lotus Team</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className="text-center">Please Sign Up</p>
                      <div className="form-outline mb-1">
                        <label className="form-label" htmlFor="email">
                          Name
                        </label>
                        <input
                          type="name"
                          name="name"
                          id="name"
                          className="form-control"
                          value={state.form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-outline mb-1">
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          value={state.form.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            type={state.isPasswordVisible ? "text" : "password"} // Toggle between text and password
                            name="password"
                            id="password"
                            className="form-control"
                            value={state.form.password}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={togglePasswordVisibility}
                          >
                            {state.isPasswordVisible ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      <div className="text-center pt-1 mb-3 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Register
                        </button>
                        {state.errorMessage && (
                          <div className="error-message">
                            {state.errorMessage}
                          </div>
                        )}
                        {/* <a className="text-muted" href="#!">
                        Forgot password?
                      </a> */}
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <Link to="/signin" className="btn btn-warning">
                          SignIn
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
