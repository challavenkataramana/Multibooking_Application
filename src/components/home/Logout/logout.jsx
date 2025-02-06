import React, { useState, useEffect } from "react";
import { FaBook, FaEye, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./logout.css";

export const Logout = ({ handleLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserDetails(decoded.id);
    }

    // Listen for window resize to detect mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `https://multibooking-application-backend.onrender.com/auth/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserDetails(data);
      } else {
        console.error("Error fetching user details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showbookings = () => {
    navigate("/yourbookings");
  };

  const showrecentlyviewed = () => {
    navigate("/recentlyviewed");
  };

  return (
    <>
      <button
        className="logout-button"
        onClick={isMobile ? toggleSidebar : toggleModal}
      >
        <FaUserCircle className="profile-icon" />
      </button>

      {/* Desktop Modal */}
      {isModalOpen && !isMobile && (
        <div
          className={`logout-modal-overlay ${isModalOpen ? "show" : ""}`}
          onClick={toggleModal}
        >
          <div
            className={`logout-modal-content ${isModalOpen ? "show" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={toggleModal}>
              &times;
            </button>

            <div className="logout-content">
              <>
                {userDetails ? (
                  <div className="user-info">
                    <div className="user-img">
                      <FaUserCircle className="user-icon" />
                    </div>
                    <div className="user-details">
                      <p>{userDetails.name}</p>
                      <p>{userDetails.email}</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading user details...</p>
                )}
              </>
              <>
                <hr />
              </>
              <div className="your-bookings">
                <button className="your-bookings-button" onClick={showbookings}>
                  <p className="button-inside">
                    <FaBook className="icon" />
                    Your Bookings
                  </p>
                </button>
              </div>
              <div className="recently-viewed" onClick={showrecentlyviewed}>
                <button className="recently-viewed-button">
                  <p className="button-inside">
                    <FaEye className="icon" /> Recently Viewed
                  </p>
                </button>
              </div>
              <div className="logout-button-container">
                <button onClick={handleLogout} className="logout">
                  <p className="button-inside">
                    <FaSignOutAlt className="icon" />
                    Sign Out
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={toggleSidebar}>
              &times;
            </button>

            <div className="logout-content">
              {userDetails ? (
                <div className="user-info">
                  <div className="user-img">
                    <FaUserCircle className="user-icon" />
                  </div>
                  <div className="user-details">
                    <p>{userDetails.name}</p>
                    <p>{userDetails.email}</p>
                  </div>
                </div>
              ) : (
                <p>Loading user details...</p>
              )}

              <hr />
              <div className="your-bookings">
                <button className="your-bookings-button" onClick={showbookings}>
                  <p className="button-inside">
                    <FaBook className="icon" />
                    Your Bookings
                  </p>
                </button>
              </div>
              <div className="recently-viewed" onClick={showrecentlyviewed}>
                <button className="recently-viewed-button">
                  <p className="button-inside">
                    <FaEye className="icon" /> Recently Viewed
                  </p>
                </button>
              </div>
              <div className="logout-button-container">
                <button onClick={handleLogout} className="logout">
                  <p className="button-inside">
                    <FaSignOutAlt className="icon" />
                    Sign Out
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
