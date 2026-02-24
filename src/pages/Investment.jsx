import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDay,
  faBolt,
  faCalendarWeek,
  faCalendarAlt,
  faDollarSign,
  faClock,
  faChartLine,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../investment.css';

const Investment = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Plans', icon: faChartLine },
    { id: 'daily', name: 'Daily', icon: faCalendarDay },
    { id: '3days', name: '3-Day', icon: faBolt },
    { id: 'weekly', name: 'Weekly', icon: faCalendarWeek },
    { id: '3weeks', name: '3-Week', icon: faCalendarAlt }
  ];

  const investmentPlans = [
    {
      id: 1,
      name: 'Daily Starter',
      category: 'daily',
      categoryLabel: 'Daily Plan',
      categoryIcon: faCalendarDay,
      minAmount: 1000,
      maxAmount: 3000,
      returnRate: 11,
      returnLabel: '11% Daily',
      duration: 1,
      durationLabel: '24 Hours',
      totalReturn: 11,
      description: 'Quick 24-hour cycle. Earn 11% on your investment in just one day.',
      badge: 'Daily',
      badgeClass: 'badge-low',
      color: '#27ae60',
    },
    {
      id: 2,
      name: '3-Day Plan',
      category: '3days',
      categoryLabel: '3-Day Plan',
      categoryIcon: faBolt,
      minAmount: 100,
      maxAmount: 999,
      returnRate: 35,
      returnLabel: '35% in 3 Days',
      duration: 3,
      durationLabel: '3 Days',
      totalReturn: 35,
      description: 'Solid 3-day returns. Perfect for entry-level investors.',
      badge: 'Fast Return',
      badgeClass: 'badge-fast',
      color: '#d35400',
    },
    {
      id: 3,
      name: 'Weekly Starter',
      category: 'weekly',
      categoryLabel: 'Weekly Plan',
      categoryIcon: faCalendarWeek,
      minAmount: 1000,
      maxAmount: 4999,
      returnRate: 55,
      returnLabel: '55% per Week',
      duration: 7,
      durationLabel: '7 Days',
      totalReturn: 55,
      description: 'Steady 7-day plan for mid-range investors. 55% total return.',
      badge: 'Popular',
      badgeClass: 'badge-popular',
      color: '#2980b9',
    },
    {
      id: 4,
      name: 'Weekly Growth',
      category: 'weekly',
      categoryLabel: 'Weekly Plan',
      categoryIcon: faCalendarWeek,
      minAmount: 5000,
      maxAmount: 19999,
      returnRate: 75,
      returnLabel: '75% per Week',
      duration: 7,
      durationLabel: '7 Days',
      totalReturn: 75,
      description: 'High-yield weekly plan for serious investors. 75% total return.',
      badge: 'High Yield',
      badgeClass: 'badge-high',
      color: '#8e44ad',
    },
    {
      id: 5,
      name: 'Weekly Elite',
      category: 'weekly',
      categoryLabel: 'Weekly Plan',
      categoryIcon: faCalendarWeek,
      minAmount: 20000,
      maxAmount: 99999,
      returnRate: 175,
      returnLabel: '175% per Week',
      duration: 7,
      durationLabel: '7 Days',
      totalReturn: 175,
      description: 'Elite weekly plan with maximum returns for top-tier investors.',
      badge: 'VIP Only',
      badgeClass: 'badge-top',
      color: '#D4AF37',
    },
    {
      id: 6,
      name: '3-Week Titan',
      category: '3weeks',
      categoryLabel: '3-Week Plan',
      categoryIcon: faCalendarAlt,
      minAmount: 100000,
      maxAmount: 'Unlimited',
      returnRate: 375,
      returnLabel: '375% in 3 Weeks',
      duration: 21,
      durationLabel: '21 Days',
      totalReturn: 375,
      description: 'The ultimate 3-week wealth accelerator for elite investors.',
      badge: 'Top Earner',
      badgeClass: 'badge-top',
      color: '#c0392b',
    },
  ];

  const filteredPlans = selectedCategory === 'all'
    ? investmentPlans
    : investmentPlans.filter(plan => plan.category === selectedCategory);

  const formatAmount = (amount) => {
    if (amount === 'Unlimited') return 'Unlimited';
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="investment-plans-page">
      <Navbar />

      {/* Hero Section */}
      <section className="plans-page-hero">
        <div className="plans-hero-container">
          <div className="plans-hero-badge">
            <div className="badge-icon"></div>
            <span className="badge-text">Investment Opportunities</span>
          </div>
          <h1 className="plans-hero-title">Choose Your Investment Plan</h1>
          <p className="plans-hero-subtitle">
            From daily returns to long-term growth, find the perfect plan that matches your financial goals
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="plans-filter-section">
        <div className="plans-filter-container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <FontAwesomeIcon icon={category.icon} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans Grid */}
      <section className="plans-grid-section">
        <div className="plans-grid-container">
          <div className="plans-grid">
            {filteredPlans.map(plan => (
              <div
                key={plan.id}
                className="plan-card-modern"
                style={{ '--plan-color': plan.color }}
              >
                <div className="plan-badge-wrapper">
                  <span className={`plan-badge ${plan.badgeClass}`}>
                    {plan.badge}
                  </span>
                </div>

                <div className="plan-icon-wrapper">
                  <FontAwesomeIcon icon={plan.categoryIcon} />
                </div>

                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-category-label">{plan.categoryLabel}</p>

                <div className="plan-return-display">
                  <div className="return-percentage">{plan.totalReturn}%</div>
                  <div className="return-label">Total Return</div>
                </div>

                <div className="plan-details-grid">
                  <div className="plan-detail">
                    <FontAwesomeIcon icon={faDollarSign} />
                    <div className="detail-content">
                      <span className="detail-label">Min - Max</span>
                      <span className="detail-value">
                        {formatAmount(plan.minAmount)} - {formatAmount(plan.maxAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="plan-detail">
                    <FontAwesomeIcon icon={faClock} />
                    <div className="detail-content">
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{plan.durationLabel}</span>
                    </div>
                  </div>

                  <div className="plan-detail">
                    <FontAwesomeIcon icon={faChartLine} />
                    <div className="detail-content">
                      <span className="detail-label">Rate</span>
                      <span className="detail-value">{plan.returnLabel}</span>
                    </div>
                  </div>
                </div>

                <p className="plan-description">{plan.description}</p>

                <Link to="/signup" className="plan-select-btn">
                  Get Started
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Comparison Section */}
      <section className="plans-comparison-section">
        <div className="plans-comparison-container">
          <div className="comparison-header">
            <h2>Compare Investment Plans</h2>
            <p>Find the plan that best suits your investment strategy</p>
          </div>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Minimum</th>
                  <th>Maximum</th>
                  <th>Duration</th>
                  <th>Return Rate</th>
                  <th>Total Return</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {investmentPlans.map(plan => (
                  <tr key={plan.id}>
                    <td>
                      <div className="table-plan-name">
                        <FontAwesomeIcon icon={plan.categoryIcon} style={{ color: plan.color }} />
                        <span>{plan.name}</span>
                      </div>
                    </td>
                    <td>{formatAmount(plan.minAmount)}</td>
                    <td>{formatAmount(plan.maxAmount)}</td>
                    <td>{plan.durationLabel}</td>
                    <td>{plan.returnLabel}</td>
                    <td className="total-return">{plan.totalReturn}%</td>
                    <td>
                      <Link to="/signup" className="table-invest-btn">
                        Invest Now
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="plans-how-it-works">
        <div className="how-it-works-container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Your Plan</h3>
              <p>Select the investment plan that matches your goals and budget</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Make Deposit</h3>
              <p>Fund your account using any of our secure payment methods</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Start Earning</h3>
              <p>Watch your investment grow with guaranteed returns</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Withdraw Profits</h3>
              <p>Request withdrawal anytime with fast processing</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investment;