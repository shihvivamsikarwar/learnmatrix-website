import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/signin");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <div className="dashboard-container">
      {user && (
        <>
          <div className="dashboard-header">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="dashboard-avatar"
              />
            )}
            <h2>Welcome, {user.displayName || user.email}</h2>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-card">
              <h3>My Courses</h3>
              <p>Track your enrolled subjects and progress here.</p>
            </div>
            <div className="dashboard-card">
              <h3>Career Hub</h3>
              <p>Explore job opportunities and skill-building resources.</p>
            </div>
            <div className="dashboard-card">
              <h3>Community</h3>
              <p>Join discussions, events, and connect with peers.</p>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
