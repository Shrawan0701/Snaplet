import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function Contact() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link">Back to Home</Link>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>

        <div className="page-content">
          <div className="contact-section">
            <h2>Get in Touch</h2>
            <p>Have questions, feedback, or need help? Reach out to us and we'll get back to you as soon as possible.</p>
          </div>

          <div className="contact-methods">
            <div className="contact-method">
              <h3> Email</h3>
              <p><a href="mailto:support@snaplet.com">snapletapp@gmail.com</a></p>
              <span className="response-time">We typically respond within 24 hours</span>
            </div>

            <div className="contact-method">
              <h3>Support</h3>
              <p>For technical support and account issues</p>
              <span className="response-time">Available Monday-Friday, 9 AM - 6 PM IST</span>
            </div>

           
          </div>

          <div className="contact-note">
            <p><strong>Note:</strong> For account-specific issues, please include your registered email address in your message.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact;