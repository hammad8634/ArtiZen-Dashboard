// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Page404 from "./Components/Pages/404Page";
import BuyerTable from "./Components/Pages/buyerTable";
import ChatPage from "./Components/Pages/chatPage";
import ContactUs from "./Components/Pages/contactUs";
import CreateProductPage from "./Components/Pages/createProduct";
import ForgotPasswordPage from "./Components/Pages/forgotpassword";
import OrderTable from "./Components/Pages/orderPage";
import ProductTable from "./Components/Pages/productTable";
import ResetPasswordPage from "./Components/Pages/resetPassword";
import SellerTable from "./Components/Pages/sellerTable";
import Sidebar from "./Components/Pages/sidebar";
import SignUpPage from "./Components/Pages/signup";
import StoreTable from "./Components/Pages/storeTable";
import LoginWrapper from "./Components/PrivateComponents/LoginWrapper";
import PrivateComponent from "./Components/PrivateComponents/PrivateComponent";
import "./tailwind.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/dashboard" element={<Sidebar />} />
            <Route path="/" element={<Sidebar />} />
            <Route path="/buyerTable" element={<BuyerTable />} />{" "}
            <Route path="/sellerTable" element={<SellerTable />} />
            <Route path="/productstable" element={<ProductTable />} />
            <Route path="/chatPage" element={<ChatPage />} />
            <Route path="/storeTable" element={<StoreTable />} />
            <Route path="/orderPage" element={<OrderTable />} />
            <Route path="/createProduct" element={<CreateProductPage />} />
            <Route path="/logout" element={<h2>Logout Component</h2>} />
          </Route>
          <Route path="/login/admin" element={<LoginWrapper />} />
          <Route path="/login/seller" element={<LoginWrapper />} />
          <Route path="/signup/seller" element={<SignUpPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/" element={<LoginWrapper />} />
          <Route path="*" element={<Page404 />} />
          <Route
            path="/seller/resetpassword/:token"
            element={<ResetPasswordPage />}
          />
        </Routes>
        {/* </BrowserRouter> */}
      </header>
    </div>
  );
}

export default App;
