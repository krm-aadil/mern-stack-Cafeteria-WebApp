import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import OrderForm from './components/OrderForm';
import DiningForm from './components/DiningForm';
import AdminDashboard from './components/Admin/Dashboard';
import AddFoodForm from './components/Admin/AddFoodForm'; // Import AddFoodForm
import AdminOrders from './components/Admin/AdminOrders';
import AdminFoodList from './components/Admin/AdminFoodList'; // Import AdminFoodList

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
          <Route path="/admin/add-food" element={<AddFoodForm />} /> {/* New Route for AddFoodForm */}
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/food" element={<AdminFoodList />} /> {/* New Route for AdminFoodList */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
