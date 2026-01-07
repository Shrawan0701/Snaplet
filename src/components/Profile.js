import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PaywallModal from './PaywallModal';
import '../Profile.css';

function Profile({ user, onLogout, setUser }) {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const response = await api.get('/payment/status');
      setPaymentDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
      navigate('/');
    }
  };

  const handleRenew = () => {
  setShowPaywall(true);
};


  const handlePaymentSuccess = () => {
  setShowPaywall(false);

  api.get('/auth/me').then(response => {
    setUser(response.data.user);
  });

  fetchPaymentDetails();
};


  const getPlanName = () => {
    if (user.is_paid) {
      return 'Premium';
    }
    return 'Free';
  };

  const getPlanBadgeVariant = () => {
    return user.is_paid ? 'success' : 'secondary';
  };

  const getCountryName = (code) => {
    const countries = {
      'IN': 'India',
      'US': 'United States',
      'GB': 'United Kingdom',
      'OTHER': 'Other'
    };
    return countries[code] || code;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntilExpiry = () => {
  if (!user.subscription_expires_at) return null;

  const expiryDate = new Date(user.subscription_expires_at);
  const today = new Date();
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const isExpiringSoon = () => {
  const daysRemaining = getDaysUntilExpiry();
  return daysRemaining !== null && daysRemaining <= 30 && daysRemaining > 0;
};

const isExpired = () => {
  const daysRemaining = getDaysUntilExpiry();
  return daysRemaining !== null && daysRemaining <= 0;
};


  if (loading) {
    return (
      <Container className="profile-container">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="profile-container">
      <div className="profile-header mb-4">
        <h2>My Profile</h2>
        <p className="text-muted">Manage your account settings and subscription</p>
      </div>

      <Row>
        <Col lg={8} className="mx-auto">
          {/* Account Information Card */}
          <Card className="profile-card mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <div className="profile-avatar">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div className="ms-3">
                  <h4 className="mb-0">{user.email.split('@')[0]}</h4>
                  <Badge bg={getPlanBadgeVariant()} className="mt-1">
                    {getPlanName()} Plan
                  </Badge>
                </div>
              </div>

              <hr />

              <Row className="profile-info">
                <Col md={6} className="mb-3">
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{user.email}</div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="info-label">Country</div>
                  <div className="info-value">{getCountryName(user.country)}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Subscription Card */}
          <Card className="profile-card mb-4">
            <Card.Body>
              <h5 className="mb-3">
                <span className="me-2"></span>
                Subscription Details
              </h5>

              {user.is_paid ? (
                <div className="subscription-active">
                 {isExpired() ? (
  <Alert variant="danger">
    <strong>Subscription Expired</strong>
    <div className="small">
      Your premium subscription has expired. Renew to continue premium features.
    </div>
  </Alert>
) : isExpiringSoon() ? (
  <Alert variant="warning">
    <strong>Subscription Expiring Soon</strong>
    <div className="small">
      Expires in {getDaysUntilExpiry()} days.
    </div>
  </Alert>
) : (
  <Alert variant="success">
    <strong>Premium Plan Active</strong>
    <div className="small">You have unlimited uploads and searches</div>
  </Alert>
)}


                  <Row className="mt-3">
                    <Col md={6} className="mb-3">
                      <div className="info-label">Plan Price</div>
                      <div className="info-value">
                        {user.country === 'IN' ? '₹99' : '$15'} / year
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-label">Status</div>
                      <div className="info-value">
                        <Badge bg="success">Active</Badge>
                      </div>
                    </Col>
                    {user.subscription_expires_at && (
  <Col md={6} className="mb-3">
    <div className="info-label">
      {isExpired() ? 'Expired On' : 'Expires On'}
    </div>
    <div className="info-value">
      {formatDate(user.subscription_expires_at)}
    </div>
  </Col>
)}

                    {paymentDetails?.payment && (
                      <>
                        <Col md={6} className="mb-3">
                          <div className="info-label">Payment Date</div>
                          <div className="info-value">
                            {formatDate(paymentDetails.payment.created_at)}
                          </div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="info-label">Payment ID</div>
                          <div className="info-value small">
                            {paymentDetails.payment.razorpay_payment_id}
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                  {(isExpired() || isExpiringSoon()) && (
  <div className="mt-3">
    <Button
      variant="primary"
      className="btn-gradient"
      onClick={handleRenew}
    >
      Renew Subscription
    </Button>
  </div>
)}


                  <div className="mt-3">
                    <div className="feature-list">
                      <div className="feature-item">✅ Unlimited file uploads</div>
                      <div className="feature-item">✅ Smart auto-folders for every upload</div>
                      <div className="feature-item">✅ Secure cloud storage</div>
                      <div className='feature-item'>✅ Folder tabs to find anything in seconds</div>
                      <div className="feature-item">✅ Priority support</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="subscription-free">
                  

                 

                  <div className="upgrade-section mt-4">
                    <h6>Upgrade to Premium</h6>
                    <p className="text-muted small mb-3">
                      Get unlimited uploads and searches for just {user.country === 'IN' ? '₹99' : '$15'} per year
                    </p>
                    <Button 
                      variant="primary" 
                      className="btn-gradient"
                      onClick={() => setShowPaywall(true)}
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Help Section */}
          <Card className="profile-card">
            <Card.Body>
              <h6 className="mb-3">Need Help?</h6>
              <p className="text-muted small mb-3">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
              <div className="text-muted small">
                <div> Email: snapletapp@gmail.com</div>
                <div> Response time: Within 24 hours</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Paywall Modal */}
      <PaywallModal
  show={showPaywall}
  onHide={() => setShowPaywall(false)}
  userCountry={user.country}
  onPaymentSuccess={handlePaymentSuccess}
  isRenewal={true}
/>

    </Container>
  );
}

export default Profile;