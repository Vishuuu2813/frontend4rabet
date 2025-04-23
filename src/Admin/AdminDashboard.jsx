import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://backend4rabet.vercel.app/admin-data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If token is invalid, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navigateToUserDetails = () => {
    navigate('/user-details');
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.dashboardTitle}>Welcome to Admin Dashboard 👋</h1>
        <button 
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      

      <div style={styles.userDetailsButtonContainer}>
        <button 
          style={styles.userDetailsButton}
          onClick={navigateToUserDetails}
        >
          View User Details
        </button>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  container: {
    padding: '30px',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  dashboardTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  dashboardContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    }
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  statsNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2563eb',
    margin: '10px 0 0 0',
  },
  userDetailsButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  userDetailsButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};

export default AdminDashboard;