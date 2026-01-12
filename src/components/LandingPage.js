import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Snaplet has completely changed how I manage my important documents. I can finally find that receipt from 6 months ago in seconds!",
      author: "David",
      role: "Freelance Designer",
      rating: 5
    },
    {
      text: "As someone who takes hundreds of screenshots for work, this is a lifesaver. The natural language search is incredibly accurate.",
      author: "Akash",
      role: "Product Manager",
      rating: 5
    },
    {
      text: "I love that I have complete control over what gets uploaded. Privacy-focused and powerful - exactly what I needed.",
      author: "Emily",
      role: "Small Business Owner",
      rating: 5
    },
    {
      text: "Finally, a solution that doesn't sync everything automatically. I upload what matters, and I can find it instantly.",
      author: "Michael",
      role: "Software Engineer",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">
             Your second brain for documents.
            </h1>
            <p className="hero-subtitle">
              Your personal memory vault for screenshots, PDFs, and documents.<br />
              Search your files using natural language.
            </p>
           <Button
              as={Link}
              to="/signup"
              className="cta-button"
            >
              Get Started Free 
            </Button>
          </div>
        </Container>
      </section>

      {/* Key Features Highlight Section */}
      <section className="highlight-features-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Features</h2>
          </div>
          
          {/* Using CSS Grid instead of Bootstrap Grid */}
          <div className="features-grid">
            <Card className="feature-card">
              <Card.Body>
                <h3 className="feature-title">Unlimited Uploads</h3>
                <p className="feature-description">
                  Upload as many screenshots, PDFs, and documents as you want without any limits.
                  Never worry about running out of space or hitting daily caps.
                </p>
              </Card.Body>
            </Card>

            <Card className="feature-card">
              <Card.Body>
                <h3 className="feature-title">AI-Powered Search</h3>
                <p className="feature-description">
                  Search your screenshots and documents using natural language.
                  Find files like "Amazon refund receipt" in seconds.
                </p>
              </Card.Body>
            </Card>

            <Card className="feature-card">
              <Card.Body>
                <h3 className="feature-title">Smart Auto-Folders</h3>
                <p className="feature-description">
                  Every upload is automatically organized into folders like
                  Payments, Jobs, Education, Travel, and more.
                </p>
              </Card.Body>
            </Card>

            <Card className="feature-card">
              <Card.Body>
                <h3 className="feature-title">Instant Folder Tabs</h3>
                <p className="feature-description">
                  Switch between folder tabs to instantly filter and find what
                  you need - no manual sorting required.
                </p>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
          </div>

          <Row className="features-grid">
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <h3 className="feature-title">Upload Your Files</h3>
                  <p className="feature-description">
                    Save screenshots, PDFs, and important files to your private vault.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <h3 className="feature-title">Search Naturally</h3>
                  <p className="feature-description">
                    Find your files instantly using everyday language.
                    Search for "Amazon refund" or "rent agreement" and get results.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <h3 className="feature-title">Private & Secure</h3>
                  <p className="feature-description">
                    Your files are stored securely in the cloud.
                    No automatic syncing. No spying. You upload only what you want.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-text">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="testimonial-author">
                <h4 className="author-name">{testimonials[currentTestimonial].author}</h4>
                <p className="author-role">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>

          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={4} className="footer-col">
              <h4 className="footer-brand">Snaplet</h4>
              <p className="footer-description">
                Your personal memory vault for important screenshots, PDFs, and documents. 
                Never lose what matters.
              </p>
            </Col>

            <Col md={2} className="footer-col">
              <h5 className="footer-heading">Product</h5>
              <ul className="footer-links">
                <li><a href="/features">Features</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </Col>

            <Col md={2} className="footer-col">
              <h5 className="footer-heading">Company</h5>
              <ul className="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </Col>

            <Col md={2} className="footer-col">
              <h5 className="footer-heading">Legal</h5>
              <ul className="footer-links">
                <li><a href="/privacy">Privacy </a></li>
                <li><a href="/terms">Terms</a></li>
              </ul>
            </Col>
          </Row>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 Snaplet. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default LandingPage;
