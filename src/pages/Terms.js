import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function Terms() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link">Back to Home</Link>
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">Last updated: January 2026</p>
        </div>

        <div className="page-content legal-content">
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Snaplet, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </div>

          <div className="legal-section">
            <h2>2. Use License</h2>
            <p>We grant you a personal, non-transferable license to use Snaplet for your personal or business use, subject to these terms.</p>
          </div>

          <div className="legal-section">
            <h2>3. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account, all content you upload, and all activities under your account.</p>
          </div>

          <div className="legal-section">
            <h2>4. Prohibited Uses</h2>
            <p>You may not use Snaplet to store or share illegal content, violate intellectual property rights, or engage in any harmful activities.</p>
          </div>

          <div className="legal-section">
            <h2>5. Payment and Refunds</h2>
            <p>Subscription fees are charged annually. We offer a 30-day money-back guarantee for new subscribers.</p>
          </div>

          <div className="legal-section">
            <h2>6. Service Modifications</h2>
            <p>We reserve the right to modify or discontinue the service at any time, with or without notice.</p>
          </div>

          <div className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>Snaplet shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
          </div>

          <div className="legal-section">
            <h2>8. Contact</h2>
            <p>For questions about these Terms, contact us at snapletapp@gmail.com</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Terms;