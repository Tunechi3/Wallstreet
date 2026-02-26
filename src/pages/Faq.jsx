import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown,
  faQuestionCircle,
  faShieldAlt,
  faMoneyBillWave,
  faChartLine,
  faUserCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../faq.css';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeQuestion, setActiveQuestion] = useState(null);

  const categories = [
    { id: 'all', name: 'All Questions', icon: faQuestionCircle },
    { id: 'getting-started', name: 'Getting Started', icon: faUserCircle },
    { id: 'investments', name: 'Investments', icon: faChartLine },
    { id: 'withdrawals', name: 'Withdrawals', icon: faMoneyBillWave },
    { id: 'security', name: 'Security', icon: faShieldAlt },
    { id: 'general', name: 'General', icon: faClock }
  ];

  const faqData = [
    {
      category: 'getting-started',
      question: 'How do I create an account on Wallstreet Trade?',
      answer: 'Creating an account is simple! Click the "Sign Up" button on the homepage, fill in your personal information including name, email, phone number, and create a secure password. Once registered, verify your email address and you can start investing immediately.'
    },
    {
      category: 'investments',
      question: 'How are returns calculated and paid?',
      answer: 'Returns are calculated based on your investment amount and plan selection. They are credited to your account weekly on the same day you made your initial investment. You can withdraw your returns at any time or reinvest them for compound growth.'
    },
    {
      category: 'investments',
      question: 'Can I have multiple active investments?',
      answer: 'Yes! You can have multiple active investment plans running simultaneously. There\'s no limit to the number of investments you can make, allowing you to diversify across different plan types and investment periods.'
    },
    {
      category: 'investments',
      question: 'What happens when my investment plan matures?',
      answer: 'When your investment plan reaches maturity, your principal amount plus all accumulated returns are automatically credited to your wallet balance. You can then choose to withdraw the funds, reinvest in a new plan, or upgrade to a higher tier plan.'
    },
    {
      category: 'withdrawals',
      question: 'How do I withdraw my earnings?',
      answer: 'Navigate to the Withdrawal section in your dashboard, enter the amount you wish to withdraw and submit your request. Withdrawals are processed within 24-48 hours.'
    },
    {
      category: 'withdrawals',
      question: 'Are there any withdrawal fees?',
      answer: 'Standard withdrawals have no fees. '
    },
    {
      category: 'withdrawals',
      question: 'How long does it take to receive my withdrawal?',
      answer: 'Standard withdrawals are processed within 2 hours.'
    },
    {
      category: 'withdrawals',
      question: 'Can I cancel a withdrawal request?',
      answer: 'Yes, you can cancel a withdrawal request as long as it hasn\'t been processed yet. Once a withdrawal enters "Processing" status, it cannot be canceled. Pending withdrawals can be canceled from your transaction history.'
    },
    {
      category: 'security',
      question: 'How is my money protected?',
      answer: 'Your funds are secured through multiple layers of protection including bank-grade 256-bit SSL encryption, cold storage for cryptocurrency assets, regular security audits, and compliance with international financial regulations. We never store your payment information on our servers.'
    },
    {
      category: 'security',
      question: 'What is two-factor authentication (2FA)?',
      answer: '2FA adds an extra layer of security by requiring a verification code from your phone in addition to your password when logging in. We highly recommend enabling 2FA in your security settings to protect your account from unauthorized access.'
    },
    {
      category: 'security',
      question: 'What should I do if I suspect unauthorized access?',
      answer: 'Immediately change your password, enable 2FA if not already active, and contact our support team at security@wallstreettrade.com. We\'ll investigate the issue, secure your account, and help you recover any lost funds if applicable.'
    },
    {
      category: 'security',
      question: 'Is my personal information safe?',
      answer: 'Absolutely. We comply with GDPR and international data protection laws. Your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, except as required by law.'
    },
    {
      category: 'general',
      question: 'Can I change my investment plan after investing?',
      answer: 'Once an investment is active, the plan cannot be changed. However, you can invest in multiple plans simultaneously or wait for your current plan to mature before starting a new one with different terms.'
    },
    {
      category: 'general',
      question: 'Do you offer customer support?',
      answer: 'Yes! Our customer support team is available 24/7 via live chat. We typically respond to inquiries within 1 hour during business days and 2 hours on weekends.'
    },
    {
      category: 'general',
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! We believe in complete transparency.'
    },
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Navbar />

      {/* Hero Section */}
      <section className="faq-hero">
        <div className="faq-hero-container">
          <div className="faq-hero-badge">
            <div className="badge-icon"></div>
            <span className="badge-text">Help Center</span>
          </div>
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Find answers to common questions about investing, withdrawals, security, and more
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="faq-content-container">
          {/* Category Filter */}
          <div className="faq-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <FontAwesomeIcon icon={category.icon} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-questions-section">
            <div className="faq-list">
              {filteredFAQs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
                >
                  <div 
                    className="faq-question" 
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3>{faq.question}</h3>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="faq-support-card">
            <h3>Still have questions?</h3>
            <p>Our support team is here to help you 24/7</p>
            <div className="support-actions">
              <a href="mailto:support@wallstreettrade.com" className="support-btn primary">
                Email Support
              </a>
              <Link to="/contact" className="support-btn secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;