import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="layout-body">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {sidebarOpen && (
          <div className="overlay" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
