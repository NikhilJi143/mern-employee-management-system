import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaTasks, FaUser } from "react-icons/fa";
import { SIDEBAR_MENU } from "../utils/constants";

import "../assets/styles/sidebar.css";

const icons = {
  Dashboard: <FaHome />,
  Employees: <FaUsers />,
  Tasks: <FaTasks />,
  Profile: <FaUser />,
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <ul>
        {SIDEBAR_MENU.map((item) => (
          <li key={item.id}>
            <NavLink to={item.path} onClick={() => setSidebarOpen(false)}>
              {icons[item.title]}

              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
