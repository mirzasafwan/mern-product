import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPanel from "./NavbarPanel";

const RootLayout = () => {
  // Check if the user is authenticated

  return (
    <div>
      <NavbarPanel />
      <Outlet />
    </div>
  );
};

export default RootLayout;
