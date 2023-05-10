import { useLocation } from "react-router-dom";
import LoginPage from "../Pages/loginPage";

const LoginWrapper = () => {
  const location = useLocation();
  const isSeller = location.pathname === "/login/seller";
  const apiLink = isSeller
    ? "http://localhost:8000/api/v1/seller/login"
    : "http://localhost:8000/api/v1/admin/login";

  return <LoginPage apiLink={apiLink} />;
};

export default LoginWrapper;
