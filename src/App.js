import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import api from './services/api';
import Profile from './components/Profile';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Add these routes in your Router (inside <Routes>):



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />}
          />

          <Route path="/features" element={<Features />} />
<Route path="/pricing" element={<Pricing />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} setUser={setUser} />
              </PrivateRoute>
            }
          />
            <Route
  path="/profile"
  element={
    <PrivateRoute user={user}>
      <Profile user={user} onLogout={handleLogout} setUser={setUser} />
    </PrivateRoute>
  }
/>

          <Route
            path="/auth/google/callback"
            element={<GoogleCallback onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const GoogleCallback = ({ onLogin }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);

      api
        .get('/auth/me')
        .then(response => {
          onLogin(response.data.user);
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Authentication failed:', error);
          window.location.href = '/login?error=auth_failed';
        });
    } else {
      window.location.href = '/login?error=no_token';
    }
  }, [onLogin]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Authenticating...</span>
      </div>
    </div>
  );
};

export default App;
