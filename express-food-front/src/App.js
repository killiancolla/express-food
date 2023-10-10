import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { userInfo } from "./utils";
import "./style/app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";
import Authentification from "./pages/Authentification";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Delivery from "./pages/Delivery";
import { CartProvider } from "./components/CartContext";

function App() {
  const [test, setTest] = useState(userInfo);
  return (
    <CartProvider>
      <BrowserRouter>
        <Header test={test} setTest={setTest} />
        <main className="main">
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route
              path="/auth"
              element={<Authentification setTest={setTest} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
