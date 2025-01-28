import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";

const NavBarLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavBarLayout;
