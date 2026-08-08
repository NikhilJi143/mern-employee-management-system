import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import { FaEnvelope, FaUserShield, FaUser } from "react-icons/fa";

import "../assets/styles/profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View your account information and profile details.</p>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{user?.name}</h2>
            <span className="role-badge">{user?.role || "Administrator"}</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-item">
            <FaUser className="profile-icon" />

            <div>
              <label>Full Name</label>
              <p>{user?.name}</p>
            </div>
          </div>

          <div className="profile-item">
            <FaEnvelope className="profile-icon" />

            <div>
              <label>Email Address</label>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="profile-item">
            <FaUserShield className="profile-icon" />

            <div>
              <label>Role</label>
              <p>{user?.role || "Administrator"}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
