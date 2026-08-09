import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { FaUsers, FaTasks, FaClock, FaCheckCircle } from "react-icons/fa";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import "../assets/styles/dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalEmployees: 0,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
    },
    recentEmployees: [],
    recentTasks: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard");
      setDashboardData(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  const { stats, recentEmployees, recentTasks } = dashboardData;


  if (loading) {
    return (
      <Layout>
        <Loader text="Loading Dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="welcome-card">
        <div>
          <h2>Dashboard</h2>

          <p>
            Manage employees, assign tasks and track work progress from one
            place.
          </p>
        </div>

        <div className="welcome-date">
          <span>Today</span>
          <h3>{new Date().toLocaleDateString()}</h3>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card employee-card">
          <div className="card-header">
            <FaUsers className="card-icon" />

            <div>
              <h2>{stats.totalEmployees}</h2>
              <p>Total Employees</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card task-card">
          <div className="card-header">
            <FaTasks className="card-icon" />

            <div>
              <h2>{stats.totalTasks}</h2>
              <p>Total Tasks</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card complete-card">
          <div className="card-header">
            <FaCheckCircle className="card-icon" />

            <div>
              <h2>{stats.completedTasks}</h2>
              <p>Completed Tasks</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card pending-card">
          <div className="card-header">
            <FaClock className="card-icon" />

            <div>
              <h2>{stats.pendingTasks}</h2>
              <p>Pending Tasks</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
