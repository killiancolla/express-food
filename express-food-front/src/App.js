import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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
import NewMenu from "./pages/newMenu";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DeliverRoute from "./components/DeliverRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <ToastContainer position="bottom-center" limit={1} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery"
            element={
              <DeliverRoute>
                <Delivery />
              </DeliverRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/newMenu"
            element={
              <AdminRoute>
                <NewMenu />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
