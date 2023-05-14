import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  let role = localStorage.getItem("role");
  const location = useLocation();
  const PrivateComponentPathname = location.pathname;

  useEffect(() => {
    const parsedUserData = JSON.parse(localStorage.getItem("user"));
    if (!parsedUserData || !parsedUserData.data.role) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      role = "seller";
      localStorage.setItem("role", role);
    } else if (role === "seller" && PrivateComponentPathname !== "seller") {
      localStorage.removeItem("role");
    }
  }, []);

  return auth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={`/login/${role}`} />
  );
};

export default PrivateComponent;
