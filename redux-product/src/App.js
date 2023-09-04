import jwtDecode from "jwt-decode";
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Cart from "./Component/Cart";
import TodoList from "./Component/CrudTodo/TodoList";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Pages/Login";
import Register from "./Component/Pages/Register";
import Product from "./Component/Product";
import RootLayout from "./Component/RootLayout";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, return false
        return redirect("/signin");
      } else {
        // Token is valid, return true
        return true;
      }
    } else {
      // No token found, return false
      return false;
    }
  };

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
