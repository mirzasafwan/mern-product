import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actionTypes, initialState, reducer } from "../../reducer/reducer";

const Login = () => {
  // Initialize the useReducer hook

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch an action to update the field in the form
    dispatch({
      type: actionTypes.SET_FIELD,
      fieldName: name,
      fieldValue: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.form.email || !state.form.password) {
      // Dispatch an action to set the error message
      dispatch({
        type: actionTypes.SET_ERROR_MESSAGE,
        errorMessage: "Please fill in all fields",
      });
      setTimeout(() => {
        // Dispatch an action to clear the error message
        dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: "" });
      }, 3000);
      return;
    }
    // https://mern-product-backend.vercel.app/login
    // http://localhost:8000/login
    try {
      const response = await fetch("https://mern-product.vercel.app/login", {
        method: "POST",
        body: JSON.stringify(state.form),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        window.location.reload();
        navigate("/");
        console.log(data);
      } else {
        // Dispatch an action to set the error message
        dispatch({
          type: actionTypes.SET_ERROR_MESSAGE,
          errorMessage: data.msg,
        });
        setTimeout(() => {
          // Dispatch an action to clear the error message
          dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: "" });
        }, 3000);
      }
    } catch (error) {
      // Dispatch an action to set the error message
      dispatch({
        type: actionTypes.SET_ERROR_MESSAGE,
        errorMessage: "Something Went Wrong: ",
      });
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    // Dispatch an action to toggle password visibility
    dispatch({ type: actionTypes.TOGGLE_PASSWORD_VISIBILITY });
  };

  return (
    <div className="container w-75">
      <div className="row justify-content-center">
        <h1 className="text-center">Login</h1>
      </div>
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-2">
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
          <div className="form-outline mb-2">
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
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {state.isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-2">
            Sign in
          </button>
          <div className="text-center">
            <p>
              Not a member?{" "}
              <Link to="/signup" className="btn btn-warning">
                Register
              </Link>
            </p>
          </div>
          {state.errorMessage && (
            <div className="error-message">{state.errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
