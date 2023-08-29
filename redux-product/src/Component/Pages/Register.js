import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define reducer action types
const actionTypes = {
  SET_FIELD: "SET_FIELD",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
  TOGGLE_PASSWORD_VISIBILITY: "TOGGLE_PASSWORD_VISIBILITY",
};

// Define an initial state
const initialState = {
  form: {
    name: "",
    email: "",
    password: "",
  },
  errorMessage: "",
  isPasswordVisible: false,
};

// Define a reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          [action.fieldName]: action.fieldValue,
        },
      };
    case actionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case actionTypes.TOGGLE_PASSWORD_VISIBILITY:
      return {
        ...state,
        isPasswordVisible: !state.isPasswordVisible,
      };
    default:
      return state;
  }
};

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
      }, 1200);
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
      }, 1200);
      return;
    }

    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify(state.form),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: data.msg });
      const { token } = data;
      localStorage.setItem("token", token);
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
    <div className="container w-75">
      <div className="row justify-content-center">
        <h1 className="text-center">Register</h1>
      </div>
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-group">
              <input
                type={state.isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className="form-control"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {state.isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-2">
            Sign Up
          </button>
          {state.errorMessage && (
            <div className="error-message">{state.errorMessage}</div>
          )}
          <div className="text-center">
            <p>
              Already a member?{" "}
              <Link to="/signin" className="btn btn-warning">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
