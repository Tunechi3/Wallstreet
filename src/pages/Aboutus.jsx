import React, { useState } from 'react'

const Aboutus = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
  return (
    <>
          <section className="about-us">
              <div className="about-us-container">
                  {/* Video Section */}
                  <div className="about-us-image">
                      <video
                          className="about-image"
                          autoPlay
                          loop
                          muted
                          playsInline
                      >
                          <source src="/images/man-working-with-stock-charts-minimalist-office.webm" type="video/webm" />
                          Your browser does not support the video tag.
                      </video>
                  </div>

                  {/* Content Section */}
                  <div className="about-us-content">
                      <h1 className="about-label">ABOUT US</h1>
                      <h2 className="about-title">
                          Trusted by over 220,000 prop firm traders worldwide.
                      </h2>
                      <p className="about-description">
                          Wallstreet Trade is a modern investment platform built to provide individuals with accessible, structured, and performance-driven trading opportunities. 
                      </p>
                      <p className="about-description">
                          We specialize in structured investment plans where members allocate capital into professionally managed trading activities designed to generate daily returns over a defined investment period. 
                      </p>
                  </div>
              </div>
          </section>

          {/* How it Works Section */}
          <section className="how-it-works">
              <div className="how-it-works-container">
                  <h2 className="how-it-works-title">How it Works</h2>
                  <div className="how-it-works-cards">
                      <div className="how-it-works-card">
                          <div className="card-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="1" x2="12" y2="23"></line>
                                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                              </svg>
                          </div>
                          <h3 className="card-title">Capital Allocation</h3>
                          <p className="card-description">Invest into structured trading plans.</p>
                      </div>

                      <div className="how-it-works-card">
                          <div className="card-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                              </svg>
                          </div>
                          <h3 className="card-title">Active Market Trading</h3>
                          <p className="card-description">Experts execute disciplined strategies.</p>
                      </div>

                      <div className="how-it-works-card">
                          <div className="card-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="1" x2="12" y2="23"></line>
                                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                          </div>
                          <h3 className="card-title">Daily Returns</h3>
                          <p className="card-description">Earn profits across your investment cycle.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Investment Plans Section */}
          <section className="investment-plans">
              <div className="investment-plans-container">
                  <div className="plans-header">
                      <h2 className="plans-title">Investment Plans</h2>
                      <p className="plans-subtitle">Choose the plan that fits your investment goals. Higher investments yield greater weekly returns.</p>
                  </div>

                  <div className="plans-grid">
                      <div className="plan-card">
                          <div className="plan-badge">Starter</div>
                          <h3 className="plan-name">Basic Plan</h3>
                          <div className="plan-return">
                              <span className="return-percentage">5%</span>
                              <span className="return-label">Weekly Return</span>
                          </div>
                          <div className="plan-details">
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Duration</span>
                                      <span className="detail-value">4 Weeks</span>
                                  </div>
                              </div>
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="1" x2="12" y2="23"></line>
                                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Minimum</span>
                                      <span className="detail-value">$500</span>
                                  </div>
                              </div>
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Total Return</span>
                                      <span className="detail-value">20%</span>
                                  </div>
                              </div>
                          </div>
                          <button className="plan-cta">Get Started</button>
                      </div>

                      <div className="plan-card featured">
                          <div className="plan-badge popular">Popular</div>
                          <h3 className="plan-name">Standard Plan</h3>
                          <div className="plan-return">
                              <span className="return-percentage">8%</span>
                              <span className="return-label">Weekly Return</span>
                          </div>
                          <div className="plan-details">
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Duration</span>
                                      <span className="detail-value">8 Weeks</span>
                                  </div>
                              </div>
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="1" x2="12" y2="23"></line>
                                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Minimum</span>
                                      <span className="detail-value">$2,500</span>
                                  </div>
                              </div>
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Total Return</span>
                                      <span className="detail-value">64%</span>
                                  </div>
                              </div>
                          </div>
                          <button className="plan-cta">Get Started</button>
                      </div>

                      <div className="plan-card">
                          <div className="plan-badge premium">Premium</div>
                          <h3 className="plan-name">Pro Plan</h3>
                          <div className="plan-return">
                              <span className="return-percentage">12%</span>
                              <span className="return-label">Weekly Return</span>
                          </div>
                          <div className="plan-details">
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Duration</span>
                                      <span className="detail-value">12 Weeks</span>
                                  </div>
                              </div>
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="1" x2="12" y2="23"></line>
                                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Minimum</span>
                                      <span className="detail-value">$10,000</span>
                                  </div>
                              </div>
                              <div className="plan-detail-item">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                  </svg>
                                  <div>
                                      <span className="detail-label">Total Return</span>
                                      <span className="detail-value">144%</span>
                                  </div>
                              </div>
                          </div>
                          <button className="plan-cta">Get Started</button>
                      </div>
                  </div>
              </div>
          </section>

          {/* Why Choose Wallstreet Section */}
          <section className="why-choose">
              <div className="why-choose-container">
                  <h2 className="why-choose-title">Why Choose Wallstreet</h2>
                  <div className="why-choose-grid">
                      <div className="why-choose-card">
                          <div className="why-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                          </div>
                          <h3 className="why-card-title">Expert Management</h3>
                          <p className="why-card-description">Seasoned professionals with proven track records managing your investments with precision and expertise.</p>
                      </div>

                      <div className="why-choose-card">
                          <div className="why-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                          </div>
                          <h3 className="why-card-title">Secure Infrastructure</h3>
                          <p className="why-card-description">Bank-grade security protocols and encrypted systems protecting your capital and personal information 24/7.</p>
                      </div>

                      <div className="why-choose-card">
                          <div className="why-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                          </div>
                          <h3 className="why-card-title">Fast Withdrawals</h3>
                          <p className="why-card-description">Quick and seamless withdrawal process ensuring you have access to your funds whenever you need them.</p>
                      </div>

                      <div className="why-choose-card">
                          <div className="why-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                          </div>
                          <h3 className="why-card-title">Transparent Operations</h3>
                          <p className="why-card-description">Complete visibility into trading activities, performance metrics, and detailed reporting for full accountability.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Security & Compliance Section */}
          <section className="security-compliance">
              <div className="security-compliance-container">
                  <div className="security-header">
                      <h2 className="security-title">Security & Compliance</h2>
                      <p className="security-subtitle">Your capital protection is our top priority. We employ industry-leading security measures to safeguard your investments.</p>
                  </div>
                  
                  <div className="security-grid">
                      <div className="security-card">
                          <div className="security-icon-wrapper">
                              <div className="security-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                      <path d="M9 12l2 2 4-4"></path>
                                  </svg>
                              </div>
                          </div>
                          <h3 className="security-card-title">256-bit Encryption</h3>
                          <p className="security-card-description">Military-grade encryption technology protects all data transmissions and stored information, ensuring your sensitive financial data remains secure.</p>
                      </div>

                      <div className="security-card">
                          <div className="security-icon-wrapper">
                              <div className="security-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="1" x2="12" y2="23"></line>
                                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                      <polyline points="8 18 12 22 16 18"></polyline>
                                      <polyline points="8 6 12 2 16 6"></polyline>
                                  </svg>
                              </div>
                          </div>
                          <h3 className="security-card-title">Risk Management</h3>
                          <p className="security-card-description">Advanced risk assessment protocols and diversified trading strategies minimize exposure while maximizing potential returns.</p>
                      </div>

                      <div className="security-card">
                          <div className="security-icon-wrapper">
                              <div className="security-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                  </svg>
                              </div>
                          </div>
                          <h3 className="security-card-title">Secure Systems</h3>
                          <p className="security-card-description">Multi-layered security infrastructure with 24/7 monitoring, regular security audits, and compliance with international financial standards.</p>
                      </div>
                  </div>

                  <div className="security-badges">
                      <div className="security-badge">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                          <span>SSL Secured</span>
                      </div>
                      <div className="security-badge">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                          <span>PCI Compliant</span>
                      </div>
                      <div className="security-badge">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span>Regular Audits</span>
                      </div>
                  </div>
              </div>
          </section>

          {/* Live Platform Stats Section */}
          <section className="platform-stats">
              <div className="platform-stats-container">
                  <div className="stats-header">
                      <h2 className="stats-title">Platform Statistics</h2>
                      <p className="stats-subtitle">Real-time proof of our growing community and consistent performance</p>
                  </div>

                  <div className="stats-counters">
                      <div className="stat-item">
                          <div className="stat-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="1" x2="12" y2="23"></line>
                                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                              </svg>
                          </div>
                          <div className="stat-content">
                              <div className="stat-number">$24.8M+</div>
                              <div className="stat-label">Total Payouts</div>
                              <div className="stat-description">Successfully distributed to investors</div>
                          </div>
                      </div>

                      <div className="stat-divider"></div>

                      <div className="stat-item">
                          <div className="stat-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                          </div>
                          <div className="stat-content">
                              <div className="stat-number">18,542</div>
                              <div className="stat-label">Active Investors</div>
                              <div className="stat-description">Currently earning daily returns</div>
                          </div>
                      </div>

                      <div className="stat-divider"></div>

                      <div className="stat-item">
                          <div className="stat-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                              </svg>
                          </div>
                          <div className="stat-content">
                              <div className="stat-number">1.2M+</div>
                              <div className="stat-label">Total Transactions</div>
                              <div className="stat-description">Processed since platform launch</div>
                          </div>
                      </div>
                  </div>

                  {/* <div className="stats-footer">
                      <div className="live-indicator">
                          <span className="pulse-dot"></span>
                          <span className="live-text">Live Data • Updated in Real-Time</span>
                      </div>
                  </div> */}
              </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
              <div className="testimonials-container">
                  <div className="testimonials-header">
                      <h2 className="testimonials-title">What Our Investors Say</h2>
                      <p className="testimonials-subtitle">Real experiences from members of our investment community</p>
                  </div>
                  <div className="testimonials-grid">
                      <div className="testimonial-item">
                          <div className="testimonial-quote">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                              </svg>
                          </div>
                          <p className="testimonial-text">
                              "As someone who's tried multiple investment platforms, Wallstreet Trade stands out for its professionalism and reliability. The security measures give me peace of mind."
                          </p>
                          <div className="testimonial-author">
                              <div className="author-avatar">
                                  <span>EP</span>
                              </div>
                              <div className="author-info">
                                  <div className="author-name">Mommy Dayo</div>
                                  <div className="author-detail">Investor since 2023</div>
                              </div>
                          </div>
                      </div>

                      <div className="testimonial-item">
                          <div className="testimonial-quote">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                              </svg>
                          </div>
                          <p className="testimonial-text">
                              "The expert management team really knows what they're doing. My portfolio has grown steadily and I appreciate the detailed reporting on all trading activities."
                          </p>
                          <div className="testimonial-author">
                              <div className="author-avatar">
                                  <span>DA</span>
                              </div>
                              <div className="author-info">
                                  <div className="author-name">Daddy Dayo</div>
                                  <div className="author-detail">Pro Plan Member</div>
                              </div>
                          </div>
                      </div>

                      <div className="testimonial-item">
                          <div className="testimonial-quote">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                              </svg>
                          </div>
                          <p className="testimonial-text">
                              "What impressed me most is the consistency. Week after week, the returns come in as promised. This has become my primary source of passive income."
                          </p>
                          <div className="testimonial-author">
                              <div className="author-avatar">
                                  <span>LM</span>
                              </div>
                              <div className="author-info">
                                  <div className="author-name">Adekunle Gold</div>
                                  <div className="author-detail">Standard Plan Member</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
              <div className="faq-container">
                  <div className="faq-header">
                      <h2 className="faq-title">Frequently Asked Questions</h2>
                      <p className="faq-subtitle">Get answers to common questions about investing with Wallstreet Trade</p>
                  </div>

                  <div className="faq-list">
                      <div className={`faq-item ${activeIndex === 0 ? 'active' : ''}`}>
                          <div className="faq-question" onClick={() => toggleFaq(0)}>
                              <h3>How do returns work?</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                          </div>
                          <div className="faq-answer">
                              <p>Returns are generated daily through active market trading conducted by our expert team. When you invest in a structured plan, your capital is deployed across multiple trading strategies designed to capture market opportunities. Daily profits are calculated based on the performance of these trades and are credited to your account. At the end of your investment cycle, you receive your initial capital plus accumulated returns. All trading activities are transparent and can be monitored through your dashboard in real-time.</p>
                          </div>
                      </div>

                      <div className={`faq-item ${activeIndex === 1 ? 'active' : ''}`}>
                          <div className="faq-question" onClick={() => toggleFaq(1)}>
                              <h3>What is the withdrawal process?</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                          </div>
                          <div className="faq-answer">
                              <p>Withdrawals are processed quickly and securely through our automated system. Once your investment cycle completes, you can initiate a withdrawal request directly from your dashboard. We support multiple withdrawal methods including bank transfers and digital payment platforms. Standard withdrawals are processed within 24-48 hours on business days. There are no hidden fees, and you'll receive the full amount shown in your account balance. For security purposes, withdrawals are sent to the same payment method used for your initial deposit.</p>
                          </div>
                      </div>

                      <div className={`faq-item ${activeIndex === 2 ? 'active' : ''}`}>
                          <div className="faq-question" onClick={() => toggleFaq(2)}>
                              <h3>How secure is my investment?</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                          </div>
                          <div className="faq-answer">
                              <p>Your investment security is our highest priority. We employ 256-bit military-grade encryption for all data transmissions and storage. Our infrastructure includes multi-layered security protocols, regular third-party security audits, and compliance with international financial standards including PCI DSS. All funds are held in segregated accounts with established financial institutions. Additionally, our risk management team continuously monitors trading activities to ensure capital preservation. We maintain 24/7 system monitoring and have robust disaster recovery procedures in place.</p>
                          </div>
                      </div>

                      <div className={`faq-item ${activeIndex === 3 ? 'active' : ''}`}>
                          <div className="faq-question" onClick={() => toggleFaq(3)}>
                              <h3>What are the minimum investment requirements?</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                          </div>
                          <div className="faq-answer">
                              <p>We offer flexible investment plans to accommodate different capital levels. Our minimum investment starts at $500, making professional trading accessible to a wide range of investors. Each plan tier offers different return potentials and investment durations. Higher investment amounts may qualify for premium plans with enhanced features and dedicated account management. All plan details, including expected returns and cycle durations, are clearly outlined before you commit. You can start with a smaller amount and scale up as you become more comfortable with our platform.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </>
  )
}

export default Aboutus