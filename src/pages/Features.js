import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function Features() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link"> Back to Home</Link>
          <h1 className="page-title">Features</h1>
          <p className="page-subtitle">Everything you need to organize your digital life</p>
        </div>

        <div className="page-content">
          <div className="feature-detail">
            <h2> Smart File Upload</h2>
            <p>Upload screenshots, and PDFs with ease. Drag and drop or click to upload. More formats to be added soon.</p>
          </div>

          <div className="feature-detail">
  <h2>Smart Auto-Folders & Organization</h2>
  <p>
    Every upload is automatically categorized into folders like Payments, Jobs, Education, Travel, and more. 
    Instantly switch between folder tabs to find anything in seconds—no manual sorting needed.
  </p>
</div>


          <div className="feature-detail">
            <h2> Natural Language Search</h2>
            <p>Find your files instantly using everyday language. Search for "Amazon refund receipt" or "rent agreement 2023" and get accurate results powered by AI.</p>
          </div>

          <div className="feature-detail">
            <h2> Privacy First</h2>
            <p>Your data is encrypted and stored securely. No automatic syncing means you control exactly what gets uploaded. Your files remain private and secure.</p>
          </div>

          <div className="feature-detail">
            <h2> Cloud Storage</h2>
            <p>Access your files from anywhere. Your documents are safely stored in the cloud and available whenever you need them.</p>
          </div>

          <div className="feature-detail">
            <h2> Lightning Fast</h2>
            <p>Search through hundreds of documents in milliseconds. Our optimized search engine delivers instant results.</p>
          </div>

          <div className="feature-detail">
            <h2> Mobile Friendly</h2>
            <p>Works perfectly on all devices. Upload and search on your phone, tablet, or desktop.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Features;