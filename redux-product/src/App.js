import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./Component/Admin/AdminLogin";
import AdminPanel from "./Component/Admin/AdminPanel";
import Cart from "./Component/Cart";
import TodoList from "./Component/CrudTodo/TodoList";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Pages/Login";
import Register from "./Component/Pages/Register";
import Product from "./Component/Product";
import RootLayout from "./Component/RootLayout";

const isAuthenticated = () => {
  const token = Cookies.get("token");
  return token !== undefined;
};

const isAdminAuthenticated = () => {
  const adminToken = Cookies.get("adminToken");
  return adminToken !== undefined;
};
function App() {
  const logoutAfterInactivity = () => {
    const sessionTimeout = 3 * 60 * 1000; // 5 minutes in milliseconds
    let logoutTimer;

    // Reset the timer when the user interacts with the page
    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, sessionTimeout);
    };

    // Logout function
    const logout = () => {
      // Clear cookies or perform logout actions as needed
      // Redirect to the login page or perform any other necessary actions
      // Replace '/signin' with your actual login route
      const allCookieNames = Object.keys(Cookies.get());
      allCookieNames.forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
      window.location.href = "/signin";
    };

    // Add event listeners to track user activity
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => {
      document.addEventListener(event, resetLogoutTimer);
    });

    // Initialize the timer
    resetLogoutTimer();
  };

  useEffect(() => {
    // Start the session timeout when the component mounts
    logoutAfterInactivity();

    // Clean up event listeners when the component unmounts
    return () => {
      const events = ["mousemove", "keydown", "mousedown", "touchstart"];
      events.forEach((event) => {
        document.removeEventListener(event, logoutAfterInactivity);
      });
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isAdminAuthenticated() ? (
            <Route element={<RootLayout />}>
              <Route path="/adminPanel" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/adminPanel" />} />
            </Route>
          ) : isAuthenticated() ? (
            <Route path="/" element={<RootLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/todolist" element={<TodoList />} />
              <Route path="/product" element={<Product />} />
              <Route path="*" element={<Navigate to="/todolist" />} />
            </Route>
          ) : (
            <Route element={<RootLayout />}>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="*" element={<Navigate to="/signin" />} />
            </Route>
          )}
          : (
          <Route element={<RootLayout />}>
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          )
          {/* Redirect to adminLogin if neither admin nor user is authenticated */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
