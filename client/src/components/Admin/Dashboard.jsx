import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Sidebar from './Sidebar'; // Import the sidebar

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
  // Sample data for charts
  const ordersData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Orders',
        data: [120, 190, 30, 50, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [500, 700, 300, 900],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const popularFoodsData = {
    labels: ['Pizza', 'Burger', 'Pasta', 'Salad', 'Kottu'],
    datasets: [
      {
        label: 'Popularity',
        data: [60, 50, 30, 40, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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

            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-red-700">User Engagement</h2>
              <Line data={ordersData} />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-red-700">Feedback</h2>
              <p className="text-gray-600">No new feedback available.</p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-red-700">Latest Orders</h2>
              <p className="text-gray-600">5 new orders received today.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
