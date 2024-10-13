import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import { FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa'; // FontAwesome Icons
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function AdminDashboard() {
  // State for analytics
  const [ordersData, setOrdersData] = useState({ labels: [], datasets: [] });
  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });
  const [popularFoodsData, setPopularFoodsData] = useState({ labels: [], datasets: [] });
  const [peakOrderTimeData, setPeakOrderTimeData] = useState({ labels: [], datasets: [] });
  const [orderStatusData, setOrderStatusData] = useState({ labels: [], datasets: [] });
  const [customerFrequencyData, setCustomerFrequencyData] = useState({ labels: [], datasets: [] });

  // State for cards
  const [mostPopularFood, setMostPopularFood] = useState(null);
  const [leastSoldFood, setLeastSoldFood] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  useEffect(() => {
    // Fetch orders per day
    fetch('http://localhost:5000/api/dashboard/orders-per-day')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item) => `Day ${item._id}`);
        const orders = data.map((item) => item.totalOrders);

        setOrdersData({
          labels: labels,
          datasets: [{ label: 'Orders', data: orders, backgroundColor: 'rgba(255, 99, 132, 0.5)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }],
        });
      });

    // Fetch revenue per week
    fetch('http://localhost:5000/api/dashboard/revenue-per-week')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item) => `Week ${item._id}`);
        const revenue = data.map((item) => item.totalRevenue);

        setRevenueData({
          labels: labels,
          datasets: [{ label: 'Revenue ($)', data: revenue, backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }],
        });
      });

    // Fetch popular foods
    fetch('http://localhost:5000/api/dashboard/popular-foods')
      .then((res) => res.json())
      .then((data) => {
        // Use the same data for the chart
        const labels = data.map((item) => item._id);
        const popularity = data.map((item) => item.count);
        const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'];

        setPopularFoodsData({
          labels: labels,
          datasets: [{ label: 'Popularity', data: popularity, backgroundColor: backgroundColors }],
        });

        // Extract the most popular and least sold food from the data
        setMostPopularFood(data[0]); // First item is the most popular
        setLeastSoldFood(data[data.length - 1]); // Last item is the least sold
      });

    // Fetch user count
    fetch('http://localhost:5000/api/dashboard/users/count')
      .then((res) => res.json())
      .then((data) => setUserCount(data.count));

    // Fetch pending and completed orders
    fetch('http://localhost:5000/api/dashboard/order-status-distribution')
      .then((res) => res.json())
      .then((data) => {
        const pending = data.find((item) => item._id === 'Pending');
        const completed = data.find((item) => item._id === 'Completed');
        setPendingOrders(pending ? pending.count : 0);
        setCompletedOrders(completed ? completed.count : 0);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar on the left */}

      <div className="flex-1 p-6 bg-red-50">
        <div className="p-6 bg-red-700 text-white text-center rounded-md mb-6 shadow-md">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card: Most Popular Food */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
            {mostPopularFood && (
              <>
                <img
                  src={`http://localhost:5000${mostPopularFood.image}`} // Ensure image field is properly structured
                  alt={mostPopularFood._id}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-red-700">Most Popular Food</h2>
                  <p className="text-gray-700">{mostPopularFood._id}</p>
                  <p className="text-gray-500">Sold: {mostPopularFood.count}</p>
                </div>
              </>
            )}
          </div>

          {/* Card: Least Sold Food */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
            {leastSoldFood && (
              <>
                <img
                  src={`http://localhost:5000${leastSoldFood.image}`} // Ensure image field is properly structured
                  alt={leastSoldFood._id}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-red-700">Least Sold Food</h2>
                  <p className="text-gray-700">{leastSoldFood._id}</p>
                  <p className="text-gray-500">Sold: {leastSoldFood.count}</p>
                </div>
              </>
            )}
          </div>

          {/* Card: User Count */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
            <FaUsers className="text-red-700 text-4xl" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-red-700">Total Users</h2>
              <p className="text-gray-700">{userCount}</p>
            </div>
          </div>

          {/* Card: Pending Orders */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
            <FaClock className="text-red-700 text-4xl" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-red-700">Pending Orders</h2>
              <p className="text-gray-700">{pendingOrders}</p>
            </div>
          </div>

          {/* Card: Completed Orders */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
            <FaCheckCircle className="text-red-700 text-4xl" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-red-700">Completed Orders</h2>
              <p className="text-gray-700">{completedOrders}</p>
            </div>
          </div>

          {/* Orders per day */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-red-700 mb-4">Orders Per Day</h2>
            <Bar data={ordersData} />
          </div>

          {/* Revenue per week */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-red-700 mb-4">Revenue Per Week</h2>
            <Line data={revenueData} />
          </div>

          {/* Popular Foods */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-red-700 mb-4">Popular Foods</h2>
            <Doughnut data={popularFoodsData} />
          </div>

          {/* Peak Order Time */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-red-700 mb-4">Peak Order Time</h2>
            <Bar data={peakOrderTimeData} />
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-red-700 mb-4">Order Status Distribution</h2>
            <Pie data={orderStatusData} />
          </div>

          {/* Customer Order Frequency */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-red-700 mb-4">Customer Order Frequency</h2>
            <Line data={customerFrequencyData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
