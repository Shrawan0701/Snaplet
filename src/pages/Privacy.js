import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function Privacy() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link"> Back to Home</Link>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: January 2026</p>
        </div>

        <div className="page-content legal-content">
          <div className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including your email address, uploaded files, and usage data.</p>
          </div>

          <div className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you.</p>
          </div>

          <div className="legal-section">
            <h2>3. Data Storage and Security</h2>
            <p>Your files are encrypted during upload and storage. We use industry-standard security measures to protect your data.</p>
          </div>

          <div className="legal-section">
            <h2>4. Data Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We only share data as necessary to provide our services.</p>
          </div>

          <div className="legal-section">
            <h2>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You can also export your data at any time.</p>
          </div>

          <div className="legal-section">
            <h2>6. Cookies</h2>
            <p>We use cookies to improve your experience and analyze usage patterns. You can control cookies through your browser settings.</p>
          </div>

          <div className="legal-section">
            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at snapletapp@gmail.com</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Privacy;