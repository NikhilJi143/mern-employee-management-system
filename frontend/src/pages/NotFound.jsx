import { Link } from "react-router-dom";

import "../assets/styles/notFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you are looking for does not exist.</p>

      <Link to="/dashboard">Go To Dashboard</Link>
    </div>
  );
};

export default NotFound;
