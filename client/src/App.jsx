import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import OrderForm from './components/OrderForm';
import DiningForm from './components/DiningForm';
import AdminDashboard from './components/Admin/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/dining-details" element={<DiningForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
