import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import '../Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';
  const isProfilePage = location.pathname === '/profile';

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <BootstrapNavbar className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand
  as={Link}
  to="/"
  className="navbar-brand-custom d-flex align-items-center"
>
  <img
    src="/snaplet.png"
    alt="Snaplet logo"
    height="28"
    className="me-2"
  />
  <span>Snaplet</span>
</BootstrapNavbar.Brand>


        <Nav className="ms-auto align-items-center">
          {/* Landing page - show Login button */}
          {!user && isLandingPage && (
            <Button
              as={Link}
              to="/login"
              size="sm"
              className="login-button"
            >
              Login
            </Button>
          )}

          {/* Auth pages - show Sign Up button on login, Login button on signup */}


          {/* Dashboard page - show Profile link and user email */}
          {user && isDashboardPage && (
            <>
           
              <Button
                as={Link}
                to="/profile"
                size="sm"
                className="nav-button"
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                size="sm"
                className="logout-button"
              >
                Logout
              </Button>
            </>
          )}

          {/* Profile page - show Dashboard link */}
          {user && isProfilePage && (
            <>
              
              <Button
                as={Link}
                to="/dashboard"
                size="sm"
                className="nav-button"
              >
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                size="sm"
                className="logout-button"
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;