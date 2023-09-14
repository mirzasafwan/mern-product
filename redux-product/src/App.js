import React from "react";
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
  const token = localStorage.getItem("token");
  return token !== null;
};

const isAdminAuthenticated = () => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken !== null;
};
function App() {
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
