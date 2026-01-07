import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function About() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link"> Back to Home</Link>
          <h1 className="page-title">About Snaplet</h1>
          <p className="page-subtitle">Your personal memory vault</p>
        </div>

        <div className="page-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>We believe everyone deserves a simple, secure way to organize their digital life. Snaplet helps you find important screenshots, receipts, and documents instantly - without the clutter.</p>
          </div>

          <div className="about-section">
            <h2>Why We Built Snaplet</h2>
            <p>We were tired of losing important screenshots in camera rolls and searching endlessly for receipts and documents. So we built Snaplet - a smart, searchable vault for everything that matters.</p>
          </div>

          <div className="about-section">
            <h2>Privacy First</h2>
            <p>Unlike other services, we don't automatically sync all your files. You choose what to upload. Your data is encrypted, secure, and always under your control.</p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Privacy:</strong> Your data belongs to you</li>
              <li><strong>Simplicity:</strong> Easy to use, no complexity</li>
              <li><strong>Security:</strong> Industry-standard encryption</li>
              <li><strong>Transparency:</strong> Clear pricing, no hidden fees</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;