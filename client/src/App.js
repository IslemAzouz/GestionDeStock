import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import OrdersPage from "./components/OrdersPage";
import Stock from "./components/Stock";
import SalesPage from "./components/SalesPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/stock" element={<Stock />} /> 
        <Route path="/sales" element={<SalesPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
