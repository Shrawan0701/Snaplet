import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
    }/auth/google`;
  };

  return (
    <div className="login-container">
      <Container>
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>

          {error && <Alert variant="danger" className="custom-alert">{error}</Alert>}

           <Button
            className="google-signup-btn"
            onClick={handleGoogleLogin}
          >
            <span className="google-icon"></span> Sign in with Google
          </Button>
          <div className="login-divider">
            <span>or</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group-custom">
              <Form.Label className="form-label-custom">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="form-input-custom"
              />
            </Form.Group>

            <Form.Group className="form-group-custom">
              <Form.Label className="form-label-custom">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
                className="form-input-custom"
              />
            </Form.Group>

            <Button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          <div className="login-footer">
            <p>
              Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;