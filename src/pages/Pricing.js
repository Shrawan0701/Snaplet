import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function Pricing() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link"> Back to Home</Link>
          <h1 className="page-title">Simple, Transparent Pricing</h1>
          <p className="page-subtitle">Choose the plan that works for you</p>
        </div>

        <div className="page-content">
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>India</h3>
              <div className="price">₹99<span>/year</span></div>
              <ul className="pricing-features">
               <li>✓ Unlimited file uploads</li>
                <li>✓ AI-powered search</li>
                
                <li>✓ Smart auto-folders for every upload</li>
                <li>✓ Secure encryption</li>
                <li>✓ Folder tabs to find anything in seconds</li>

                <li>✓ Priority support</li>
              </ul>
              <Button as={Link} to="/signup" className="pricing-btn">Get Started</Button>
            </div>

            <div className="pricing-card">
              
              <h3>International</h3>
              <div className="price">$15<span>/year</span></div>
              <ul className="pricing-features">
                <li>✓ Unlimited file uploads</li>
                <li>✓ AI-powered search</li>
                
                <li>✓ Smart auto-folders for every upload</li>
                <li>✓ Secure encryption</li>
                <li>✓ Folder tabs to find anything in seconds</li>

                <li>✓ Priority support</li>
              </ul>
              <Button as={Link} to="/signup" className="pricing-btn">Get Started</Button>
            </div>
          </div>

          <div className="pricing-note">
            <p><strong>Note:</strong> Pricing varies by country. Select your country during signup to see your local pricing.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Pricing;