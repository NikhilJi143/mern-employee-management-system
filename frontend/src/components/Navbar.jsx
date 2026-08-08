import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

import "../assets/styles/navbar.css";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  // color: #4f46e5;
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>

        <div className="navbar-logo">
          <span>EMS</span>
          <small>Employee Management System</small>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <FaUserCircle className="user-icon" />

          <div>
            <h4>{user?.name || "Admin"}</h4>
            <span>Administrator</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
