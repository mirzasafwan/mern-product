import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isAuthenticated() ? (
            <>
              <Route element={<RootLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/todolist" element={<TodoList />} />
                <Route path="/product" element={<Product />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </>
          ) : (
            <>
              <Route element={<RootLayout />}>
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
