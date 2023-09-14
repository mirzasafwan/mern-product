import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import Admin from "../../assets/admin.jpg";
import { actionTypes, initialState, reducer } from "../../reducer/reducer";
import "./Style/AdminLogin.css";
const AdminLogin = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  const togglePasswordVisibility = () => {
    // Dispatch an action to toggle password visibility
    dispatch({ type: actionTypes.TOGGLE_PASSWORD_VISIBILITY });
  };

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
    // https://mern-product-backend.vercel.app/admin/login
    // http://localhost:8000/admin/login
    try {
      const response = await fetch(
        "https://mern-product-backend.vercel.app/admin/login",
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
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("email", data.email);
        // localStorage.setItem("email", data.email);
        navigate("/");
        window.location.href = "/adminPanel";

        // console.log(data);
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
        errorMessage: "Api Url Entered is Invalid",
      });
    }
  };
  return (
    <section
      className="gradient-form"
      style={{
        backgroundColor: "#eee",
      }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a Family</h4>
                    <p className="small mb-0">
                      Being a good listener, knowing how to handle complaints,
                      and having excellent written and verbal skills are all
                      crucial to making the best impression on customers.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-3 mx-md-4">
                    <div className="text-center">
                      <img src={Admin} style={{ width: 185 }} alt="logo" />
                      <h4 className="mt-1 mb-4 pb-1">Admin Login</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className="text-center">
                        Please login to your account
                      </p>
                      <div className="form-outline mb-1">
                        <label className="form-label" htmlFor="email">
                          Admin Name
                        </label>
                        <input
                          type="text"
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
                          Log in
                        </button>
                        {state.errorMessage && (
                          <div className="error-message">
                            {state.errorMessage}
                          </div>
                        )}
                        <Link
                          to="/signin"
                          className="text-muted text-decoration-none"
                        >
                          Are you a Student
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        {/* <p className="mb-0 me-2">If you are user login</p>
                        <Link to="/signin" className="btn btn-warning">
                          Sign In
                        </Link> */}
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

export default AdminLogin;
