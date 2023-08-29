import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //   const { dispatch } = useContext(UseContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrorMessage("Please fill in all fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 1200);
      return;
    }

    try {
      const response = await fetch(
        "https://mern-product-backend.vercel.app/login",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        // dispatch({ type: "USER", payload: data.user });
        const { token } = data;
        console.log(token);
        // Store the token in localStorage
        localStorage.setItem("token", token);
        navigate("/");
        window.location.reload();
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 1200);
      }
    } catch (error) {
      setErrorMessage("Something went wrong: " + error.message);
    }
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
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-outline mb-2">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
            />
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
