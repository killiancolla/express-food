import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { userInfo } from "./utils";
import "./style/app.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Authentification from "./pages/Authentification";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Delivery from "./pages/Delivery";

function App() {
  const [test, setTest] = useState(userInfo);
  return (
    <BrowserRouter>
      <Header test={test} setTest={setTest} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
