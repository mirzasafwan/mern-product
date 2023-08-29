import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://redux-backend.vercel.app/signin", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        // Login successful
        // Redirect to the dashboard or set a flag to allow access
        // You can also store the JWT token in localStorage here
        // console.log("Login successful");
        navigate("/");
      } else {
        // Handle authentication failure (e.g., show an error message)
        setErrorMessage("Invalid Data");
        setTimeout(() => {
          setErrorMessage("");
        }, 1200);
      }
    } catch (error) {
      // Handle network or server errors
      setErrorMessage("An error occurred: " + error.message);
    }
  };
  return (
    <div>
      <div className="container w-75">
        <div className="row justify-content-center">
          <h1 className="text-center">Login</h1>
          {/* <p>{JSON.stringify(JSON.stringify(form))}</p> */}
        </div>
        <div className="row justify-content-center ">
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="form2Example1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {/* Password input */}
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-2">
              Sign in
            </button>
            {/* Register buttons */}
            <div className="text-center">
              <p>
                Not a member?{" "}
                <Link to="/signup" className="btn btn-warning">
                  Register
                </Link>
              </p>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
