import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  const parsedUserData = JSON.parse(localStorage.getItem("user"));
  const role = parsedUserData && parsedUserData.data.role;
  return auth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={`/login/${role}`} />
  );
};

export default PrivateComponent;
