import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('https://backend4rabet.vercel.app/admin/login', {
        email,
        password
      });

      // Store token and redirect
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Access denied: Not an admin ❌');
      } else {
        setError(err.response?.data?.message || 'Login failed ❌');
      }
    }
  };

  // Internal styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    },
    loginCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      width: '100%',
      maxWidth: '400px',
      transition: 'transform 0.3s ease',
      border: '1px solid #eaeaea'
    },
    heading: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '24px',
      textAlign: 'center',
      color: '#2d3748',
      borderBottom: '2px solid #4299e1',
      paddingBottom: '10px'
    },
    form: {
      width: '100%'
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '16px',
      transition: 'border 0.3s ease',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '10px'
    },
    buttonHover: {
      backgroundColor: '#3182ce'
    },
    error: {
      color: '#e53e3e',
      marginBottom: '16px',
      textAlign: 'center',
      fontSize: '14px',
      padding: '8px 12px',
      backgroundColor: '#fff5f5',
      borderRadius: '6px',
      border: '1px solid #fed7d7'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '16px'
    },
    logo: {
      fontSize: '36px',
      color: '#4299e1',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>🔐</div>
        </div>
        <h2 style={styles.heading}>Admin Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              id="email"
              type="email"
              style={styles.input}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;