import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Sidebar from './Sidebar';
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
  LineElement
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
  // State for data
  const [ordersData, setOrdersData] = useState({
    labels: [],
    datasets: [{ label: 'Orders', data: [], backgroundColor: 'rgba(255, 99, 132, 0.5)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }],
  });

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [{ label: 'Revenue ($)', data: [], backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }],
  });

  const [popularFoodsData, setPopularFoodsData] = useState({
    labels: [],
    datasets: [{ label: 'Popularity', data: [], backgroundColor: [], borderColor: [], borderWidth: 1 }],
  });

  useEffect(() => {
    // Fetch orders per day
    fetch('http://localhost:5000/api/dashboard/orders-per-day')
      .then(res => res.json())
      .then(data => {
        const labels = data.map(item => `Day ${item._id}`);
        const orders = data.map(item => item.totalOrders);
  
        setOrdersData({
          labels: labels,
          datasets: [{ label: 'Orders', data: orders, backgroundColor: 'rgba(255, 99, 132, 0.5)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }],
        });
      })
      .catch(error => console.error('Error fetching orders data:', error));
  
    // Fetch revenue per week
    fetch('http://localhost:5000/api/dashboard/revenue-per-week')
      .then(res => res.json())
      .then(data => {
        const labels = data.map(item => `Week ${item._id}`);
        const revenue = data.map(item => item.totalRevenue);
  
        setRevenueData({
          labels: labels,
          datasets: [{ label: 'Revenue ($)', data: revenue, backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }],
        });
      })
      .catch(error => console.error('Error fetching revenue data:', error));
  
    // Fetch popular foods
    fetch('http://localhost:5000/api/dashboard/popular-foods')
      .then(res => res.json())
      .then(data => {
        const labels = data.map(item => item._id);
        const popularity = data.map(item => item.count);
        const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'];
  
        setPopularFoodsData({
          labels: labels,
          datasets: [{ label: 'Popularity', data: popularity, backgroundColor: backgroundColors, borderColor: backgroundColors.map(color => color.replace('0.5', '1')), borderWidth: 1 }],
        });
      })
      .catch(error => console.error('Error fetching popular foods data:', error));
  }, []);
  

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar on the left */}
      
      <div className="flex-1 p-6 bg-red-50">
        <div className="p-6 bg-red-700 text-white text-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-red-700">Total Orders</h2>
              <Bar data={ordersData} />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-red-700">Revenue</h2>
              <Line data={revenueData} />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-red-700">Popular Foods</h2>
              <Doughnut data={popularFoodsData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
