import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Pages.css';

function FAQ() {
  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <Link to="/" className="back-link"> Back to Home</Link>
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">Find answers to common questions</p>
        </div>

        <div className="page-content">
          <div className="faq-item">
            <h3>What file formats do you support?</h3>
            <p>We currently support JPG, PNG, and PDF file formats. More formats will be added soon.</p>
          </div>

          <div className="faq-item">
            <h3>How does the search work?</h3>
            <p>Our AI-powered search engine extracts text from your documents and images, allowing you to search using natural language. Just type what you're looking for!</p>
          </div>

          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>Yes! All files are encrypted during upload and storage. We use industry-standard security practices to keep your data safe.</p>
          </div>

          <div className="faq-item">
            <h3>How much storage do I get?</h3>
            <p>All plans come with 10GB of storage, which is enough for thousands of screenshots and documents.</p>
          </div>

          

          

          <div className="faq-item">
            <h3>Can I use Snaplet on multiple devices?</h3>
            <p>Yes! Access your files from any device - phone, tablet, or computer. Just log in with your account.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FAQ;