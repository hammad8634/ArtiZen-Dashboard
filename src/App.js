// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BuyerTable from "./Components/Pages/buyerTable";
import ChatPage from "./Components/Pages/chatPage";
import LoginPage from "./Components/Pages/loginPage";
import ProductTable from "./Components/Pages/productTable";
import SellerTable from "./Components/Pages/sellerTable";
import Sidebar from "./Components/Pages/sidebar";
import StoreTable from "./Components/Pages/storeTable";
import PrivateComponent from "./Components/PrivateComponents/PrivateComponent";
// import AdminLayout from "./Components/layouts/AdminLayout";
import "./tailwind.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Dashboard</p> */}
        {/* <Sidebar /> */}
        {/* <BrowserRouter basename={"/"}> */}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/dashboard" element={<Sidebar />} />
            <Route path="/" element={<Sidebar />} />
            <Route path="/buyerTable" element={<BuyerTable />} />{" "}
            <Route path="/sellerTable" element={<SellerTable />} />
            <Route path="/productsTable" element={<ProductTable />} />
            <Route path="/chatPage" element={<ChatPage />} />
            <Route path="/storeTable" element={<StoreTable />} />
            <Route path="/logout" element={<h2>Logout Component</h2>} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        {/* </BrowserRouter> */}
      </header>
    </div>
  );
}

export default App;
