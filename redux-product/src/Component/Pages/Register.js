import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  //   const { state, dispatch } = useContext(UseContext);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
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
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill in all fields");
      setTimeout(() => {
        setMessage("");
      }, 1200);
      return;
    }

    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setMessage(data.message); // Set the message from the API response
      //   dispatch({ type: "USER", payload: data.user });
      const { token } = data;
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } else {
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 1200);
      // Set the error message from the API response
    }
  };

  return (
    <div>
      <div>
        <div className="container w-75">
          <div className="row justify-content-center">
            <h1 className="text-center">Register</h1>
          </div>
          <div className="row justify-content-center ">
            <form onSubmit={handleSubmit}>
              {/* Name */}

              <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form2Example1">
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {/* Email input */}
              <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form2Example1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {/* Password input */}
              <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form2Example2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-2">
                Sign Up
              </button>
              {/* Register buttons */}
              <div className="text-center">
                <p>
                  Already a member?{" "}
                  <Link to="/signin" className="btn btn-warning">
                    Login
                  </Link>
                </p>
              </div>
              {message && <div className="error-message">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
