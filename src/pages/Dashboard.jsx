import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faTachometerAlt, 
  faWallet, 
  faChartLine, 
  faMoneyBillTransfer, 
  faHistory, 
  faBell, 
  faUserCircle, 
  faShield, 
  faSignOutAlt,
  faDollarSign,
  faArrowUp,
  faArrowDown,
  faClock,
  faDownload,
  faPlus,
  faUsers,
  faCheckCircle,
  faExclamationCircle,
  faSave,
  faKey,
  faLock,
  faCreditCard,
  faCopy,
  faBolt,
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import '../Dashboard.css';

// ─── Dummy wallet addresses ──────────────────────────────────────────────────
const WALLET_ADDRESSES = {
  'Bitcoin (BTC)':  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  'Ethereum (ETH)': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  'USDT (TRC20)':   'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
};

// ─── 8 Investment Plans ───────────────────────────────────────────────────────
// 3 Daily | 3 for 72-Hours | 2 Weekly | 1 Monthly
const INVESTMENT_PLANS = [
  // ── DAILY PLANS (3) ────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Daily Starter',
    category: 'daily',
    categoryLabel: 'Daily Plan',
    categoryIcon: faCalendarDay,
    minAmount: 100,
    maxAmount: 999,
    returnRate: 3,
    returnLabel: '3% Daily',
    duration: 1,
    durationLabel: '24 Hours',
    totalReturn: 3,
    description: 'Quick 24-hour cycle. Perfect for testing the waters.',
    badge: 'Low Risk',
    badgeClass: 'badge-low',
    color: '#27ae60',
  },
  {
    id: 2,
    name: 'Daily Growth',
    category: 'daily',
    categoryLabel: 'Daily Plan',
    categoryIcon: faCalendarDay,
    minAmount: 1000,
    maxAmount: 4999,
    returnRate: 5,
    returnLabel: '5% Daily',
    duration: 1,
    durationLabel: '24 Hours',
    totalReturn: 5,
    description: 'Accelerated daily returns for mid-range capital.',
    badge: 'Popular',
    badgeClass: 'badge-popular',
    color: '#2980b9',
  },
  {
    id: 3,
    name: 'Daily Elite',
    category: 'daily',
    categoryLabel: 'Daily Plan',
    categoryIcon: faCalendarDay,
    minAmount: 5000,
    maxAmount: 19999,
    returnRate: 7,
    returnLabel: '7% Daily',
    duration: 1,
    durationLabel: '24 Hours',
    totalReturn: 7,
    description: 'Premium daily returns for serious daily traders.',
    badge: 'High Yield',
    badgeClass: 'badge-high',
    color: '#8e44ad',
  },

  // ── 72-HOUR PLANS (3) ───────────────────────────────────────────────────────
  {
    id: 4,
    name: '72H Bronze',
    category: '72hours',
    categoryLabel: '72-Hour Plan',
    categoryIcon: faBolt,
    minAmount: 500,
    maxAmount: 2499,
    returnRate: 12,
    returnLabel: '12% in 72hrs',
    duration: 3,
    durationLabel: '72 Hours',
    totalReturn: 12,
    description: 'Triple-day compounding. Entry-level power cycle.',
    badge: 'Fast Return',
    badgeClass: 'badge-fast',
    color: '#d35400',
  },
  {
    id: 5,
    name: '72H Silver',
    category: '72hours',
    categoryLabel: '72-Hour Plan',
    categoryIcon: faBolt,
    minAmount: 2500,
    maxAmount: 9999,
    returnRate: 18,
    returnLabel: '18% in 72hrs',
    duration: 3,
    durationLabel: '72 Hours',
    totalReturn: 18,
    description: 'Turbo-charged 3-day plan for high-frequency investors.',
    badge: 'Best Value',
    badgeClass: 'badge-popular',
    color: '#16a085',
  },
  {
    id: 6,
    name: '72H Gold',
    category: '72hours',
    categoryLabel: '72-Hour Plan',
    categoryIcon: faBolt,
    minAmount: 10000,
    maxAmount: 'Unlimited',
    returnRate: 25,
    returnLabel: '25% in 72hrs',
    duration: 3,
    durationLabel: '72 Hours',
    totalReturn: 25,
    description: 'Maximum 72-hour yield for top-tier investors.',
    badge: 'Premium',
    badgeClass: 'badge-high',
    color: '#D4AF37',
  },

  // ── WEEKLY PLANS (2) ────────────────────────────────────────────────────────
  {
    id: 7,
    name: 'Weekly Pro',
    category: 'weekly',
    categoryLabel: 'Weekly Plan',
    categoryIcon: faCalendarWeek,
    minAmount: 1000,
    maxAmount: 24999,
    returnRate: 40,
    returnLabel: '40% per Week',
    duration: 7,
    durationLabel: '7 Days',
    totalReturn: 40,
    description: 'Steady 7-day returns with daily compounding.',
    badge: 'Steady',
    badgeClass: 'badge-low',
    color: '#555a69',
  },
  {
    id: 8,
    name: 'Weekly VIP',
    category: 'weekly',
    categoryLabel: 'Weekly Plan',
    categoryIcon: faCalendarWeek,
    minAmount: 25000,
    maxAmount: 'Unlimited',
    returnRate: 60,
    returnLabel: '60% per Week',
    duration: 7,
    durationLabel: '7 Days',
    totalReturn: 60,
    description: 'VIP exclusive weekly plan with premium returns.',
    badge: 'VIP Only',
    badgeClass: 'badge-high',
    color: '#c0392b',
  },

  // ── MONTHLY PLAN (1) ────────────────────────────────────────────────────────
  {
    id: 9,
    name: 'Monthly Titan',
    category: 'monthly',
    categoryLabel: 'Monthly Plan',
    categoryIcon: faCalendarAlt,
    minAmount: 5000,
    maxAmount: 'Unlimited',
    returnRate: 300,
    returnLabel: '300% per Month',
    duration: 30,
    durationLabel: '30 Days',
    totalReturn: 300,
    description: 'The ultimate 30-day wealth accelerator. Maximum returns for committed investors.',
    badge: 'Top Earner',
    badgeClass: 'badge-top',
    color: '#D4AF37',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    user, 
    logout, 
    fetchDashboardData, 
    fetchUserStats,
    refreshUser,
    createDeposit,
    createWithdrawal,
    createInvestment,
  } = useUser();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Deposit form states
  const [depositAmount, setDepositAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState('Bitcoin (BTC)');
  const [depositWallet, setDepositWallet] = useState('');

  // Withdrawal form states
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('Bitcoin (BTC)');
  const [withdrawWallet, setWithdrawWallet] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // ── Investment Modal State ──────────────────────────────────────────────────
  const [investModal, setInvestModal] = useState(null);   // plan object or null
  const [investAmount, setInvestAmount] = useState('');
  const [investSubmitting, setInvestSubmitting] = useState(false);
  const [investError, setInvestError] = useState('');
  const [investSuccess, setInvestSuccess] = useState('');

  // ── Category filter for plans ──────────────────────────────────────────────
  const [planFilter, setPlanFilter] = useState('all');

  useEffect(() => { loadDashboardData(); }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboardData();
      if (result.success) {
        setDashboardData(result.data);
        setActiveInvestments(result.data.activeInvestments || []);
        setTransactions(result.data.recentTransactions || []);
        setNotifications(result.data.notifications || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ── Invest Now handler ──────────────────────────────────────────────────────
  const openInvestModal = (plan) => {
    setInvestModal(plan);
    setInvestAmount('');
    setInvestError('');
    setInvestSuccess('');
  };

  const closeInvestModal = () => {
    setInvestModal(null);
    setInvestAmount('');
    setInvestError('');
    setInvestSuccess('');
  };

  const handleInvest = async (e) => {
    e.preventDefault();
    setInvestError('');
    setInvestSuccess('');

    const amount = parseFloat(investAmount);
    const plan = investModal;

    if (!amount || isNaN(amount)) {
      setInvestError('Please enter a valid amount.');
      return;
    }
    if (amount < plan.minAmount) {
      setInvestError(`Minimum investment for ${plan.name} is $${plan.minAmount.toLocaleString()}.`);
      return;
    }
    const maxAmt = typeof plan.maxAmount === 'number' ? plan.maxAmount : Infinity;
    if (amount > maxAmt) {
      setInvestError(`Maximum investment for ${plan.name} is $${plan.maxAmount.toLocaleString()}.`);
      return;
    }
    if (amount > (user?.availableBalance || 0)) {
      setInvestError('Insufficient available balance. Please deposit funds first.');
      return;
    }

    setInvestSubmitting(true);
    try {
      const result = await createInvestment(plan.id, amount);
      if (result.success || result.status === 'success') {
        setInvestSuccess(`🎉 Investment of $${amount.toLocaleString()} in ${plan.name} was successful!`);
        await loadDashboardData();
        setTimeout(() => {
          closeInvestModal();
          navigate('/dashboard/investments');
        }, 2000);
      } else {
        setInvestError(result.message || 'Investment failed. Please try again.');
      }
    } catch (err) {
      setInvestError('An error occurred. Please try again.');
    } finally {
      setInvestSubmitting(false);
    }
  };

  // ── Deposit handler ─────────────────────────────────────────────────────────
  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!depositAmount || parseFloat(depositAmount) < 100) {
      toast.error('Minimum deposit amount is $100');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createDeposit(parseFloat(depositAmount), depositMethod, depositWallet || null);
      if (result.success) {
        toast.success('Deposit request created successfully! Please wait for confirmation.');
        setDepositAmount(''); setDepositWallet('');
        await loadDashboardData();
      } else {
        toast.error(result.message || 'Failed to create deposit request');
      }
    } catch (error) {
      toast.error('Error creating deposit: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Withdrawal handler ──────────────────────────────────────────────────────
  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || parseFloat(withdrawAmount) < 50) {
      toast.error('Minimum withdrawal amount is $50');
      return;
    }
    if (!withdrawWallet) { toast.error('Please enter your wallet address'); return; }
    if (parseFloat(withdrawAmount) > user.availableBalance) {
      toast.error('Insufficient balance');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createWithdrawal(parseFloat(withdrawAmount), withdrawMethod, withdrawWallet);
      if (result.success) {
        toast.success('Withdrawal request submitted successfully! Awaiting admin approval.');
        setWithdrawAmount(''); setWithdrawWallet('');
        await loadDashboardData();
      } else {
        toast.error(result.message || 'Failed to create withdrawal request');
      }
    } catch (error) {
      toast.error('Error creating withdrawal: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActiveSection = () => {
    const path = location.pathname.split('/').pop();
    return path === 'dashboard' ? 'overview' : path;
  };
  const activeSection = getActiveSection();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleNavigation = (section) => navigate(`/dashboard/${section}`);
  const handleLogout = async () => await logout();
  const copyReferralLink = () => {
    const referralLink = `https://wallstreettrade.com/ref/${user?.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  // ── Filtered plans ──────────────────────────────────────────────────────────
  const filteredPlans = planFilter === 'all'
    ? INVESTMENT_PLANS
    : INVESTMENT_PLANS.filter(p => p.category === planFilter);

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle} />
        <p style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}>
          Checking permissions…
        </p>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard">

      {/* ── Invest Now Modal ─────────────────────────────────────────────────── */}
      {investModal && (
        <div className="invest-modal-overlay" onClick={closeInvestModal}>
          <div className="invest-modal" onClick={(e) => e.stopPropagation()}>
            <div className="invest-modal-header" style={{ borderColor: investModal.color }}>
              <div className="invest-modal-title">
                <div className="invest-modal-icon" style={{ background: investModal.color }}>
                  <FontAwesomeIcon icon={investModal.categoryIcon} />
                </div>
                <div>
                  <h3>{investModal.name}</h3>
                  <span className={`plan-badge ${investModal.badgeClass}`}>{investModal.badge}</span>
                </div>
              </div>
              <button className="invest-modal-close" onClick={closeInvestModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="invest-modal-body">
              <div className="invest-modal-summary">
                <div className="invest-summary-item">
                  <span className="invest-summary-label">Return</span>
                  <span className="invest-summary-val" style={{ color: investModal.color }}>{investModal.returnLabel}</span>
                </div>
                <div className="invest-summary-item">
                  <span className="invest-summary-label">Duration</span>
                  <span className="invest-summary-val">{investModal.durationLabel}</span>
                </div>
                <div className="invest-summary-item">
                  <span className="invest-summary-label">Min Amount</span>
                  <span className="invest-summary-val">${investModal.minAmount.toLocaleString()}</span>
                </div>
                <div className="invest-summary-item">
                  <span className="invest-summary-label">Max Amount</span>
                  <span className="invest-summary-val">
                    {typeof investModal.maxAmount === 'number'
                      ? `$${investModal.maxAmount.toLocaleString()}`
                      : investModal.maxAmount}
                  </span>
                </div>
              </div>

              <div className="invest-modal-balance">
                <FontAwesomeIcon icon={faWallet} />
                <span>Available Balance: <strong>${user.availableBalance?.toLocaleString() || '0.00'}</strong></span>
              </div>

              {investSuccess ? (
                <div className="invest-success-msg">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>{investSuccess}</p>
                </div>
              ) : (
                <form className="invest-modal-form" onSubmit={handleInvest}>
                  {investError && (
                    <div className="invest-error-msg">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      <p>{investError}</p>
                    </div>
                  )}
                  <div className="form-group">
                    <label>Investment Amount (USD)</label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input
                        type="number"
                        placeholder={`Min $${investModal.minAmount.toLocaleString()}`}
                        min={investModal.minAmount}
                        max={typeof investModal.maxAmount === 'number' ? investModal.maxAmount : undefined}
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    {investAmount && !isNaN(parseFloat(investAmount)) && (
                      <div className="invest-preview">
                        <p>
                          Expected Return:{' '}
                          <strong style={{ color: investModal.color }}>
                            ${((parseFloat(investAmount) * investModal.totalReturn) / 100).toFixed(2)}
                          </strong>
                          {' '}in {investModal.durationLabel}
                        </p>
                        <p>
                          Total Payout:{' '}
                          <strong>
                            ${(parseFloat(investAmount) + (parseFloat(investAmount) * investModal.totalReturn) / 100).toFixed(2)}
                          </strong>
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-primary btn-block invest-submit-btn"
                    disabled={investSubmitting}
                    style={{ background: investModal.color }}
                  >
                    <FontAwesomeIcon icon={faChartLine} />
                    {investSubmitting ? 'Processing Investment...' : `Invest Now in ${investModal.name}`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar overlay for mobile ──────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────────────────────── */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Wallstreet</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`} onClick={() => handleNavigation('overview')}>
            <FontAwesomeIcon icon={faTachometerAlt} />
            {sidebarOpen && <span>Overview</span>}
          </button>
          <button className={`nav-item ${activeSection === 'investments' ? 'active' : ''}`} onClick={() => handleNavigation('investments')}>
            <FontAwesomeIcon icon={faChartLine} />
            {sidebarOpen && <span>Investments</span>}
          </button>
          <button className={`nav-item ${activeSection === 'wallet' ? 'active' : ''}`} onClick={() => handleNavigation('wallet')}>
            <FontAwesomeIcon icon={faWallet} />
            {sidebarOpen && <span>Wallet</span>}
          </button>
          <button className={`nav-item ${activeSection === 'deposit' ? 'active' : ''}`} onClick={() => handleNavigation('deposit')}>
            <FontAwesomeIcon icon={faArrowDown} />
            {sidebarOpen && <span>Deposit</span>}
          </button>
          <button className={`nav-item ${activeSection === 'withdraw' ? 'active' : ''}`} onClick={() => handleNavigation('withdraw')}>
            <FontAwesomeIcon icon={faMoneyBillTransfer} />
            {sidebarOpen && <span>Withdraw</span>}
          </button>
          <button className={`nav-item ${activeSection === 'transactions' ? 'active' : ''}`} onClick={() => handleNavigation('transactions')}>
            <FontAwesomeIcon icon={faHistory} />
            {sidebarOpen && <span>Transactions</span>}
          </button>
          <button className={`nav-item ${activeSection === 'referral' ? 'active' : ''}`} onClick={() => handleNavigation('referral')}>
            <FontAwesomeIcon icon={faUsers} />
            {sidebarOpen && <span>Referral</span>}
          </button>
          <button className={`nav-item ${activeSection === 'notifications' ? 'active' : ''}`} onClick={() => handleNavigation('notifications')}>
            <FontAwesomeIcon icon={faBell} />
            {sidebarOpen && <span>Notifications</span>}
            {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
          </button>
          <button className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => handleNavigation('profile')}>
            <FontAwesomeIcon icon={faUserCircle} />
            {sidebarOpen && <span>Profile</span>}
          </button>
          <button className={`nav-item ${activeSection === 'security' ? 'active' : ''}`} onClick={() => handleNavigation('security')}>
            <FontAwesomeIcon icon={faShield} />
            {sidebarOpen && <span>Security</span>}
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <main className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-toggle" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="page-title">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
          </div>
          <div className="topbar-right">
            <div className="user-profile">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="dashboard-content">

          {/* ── Overview ───────────────────────────────────────────────────── */}
          {activeSection === 'overview' && (
            <div className="overview-section">
              <div className="overview-cards">
                <div className="overview-card primary">
                  <div className="card-icon"><FontAwesomeIcon icon={faWallet} /></div>
                  <div className="card-content">
                    <p className="card-label">Total Balance</p>
                    <h2 className="card-value">${user.totalBalance?.toLocaleString() || '0.00'}</h2>
                    <p className="card-change positive"><FontAwesomeIcon icon={faArrowUp} /> +12.5% this month</p>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                  <div className="card-content">
                    <p className="card-label">Active Investments</p>
                    <h2 className="card-value">{activeInvestments.length || 0}</h2>
                    <p className="card-subtitle">Plans running</p>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon"><FontAwesomeIcon icon={faDollarSign} /></div>
                  <div className="card-content">
                    <p className="card-label">Daily Earnings</p>
                    <h2 className="card-value">${user.dailyEarnings || '0.00'}</h2>
                    <p className="card-subtitle">Last 24 hours</p>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon"><FontAwesomeIcon icon={faArrowUp} /></div>
                  <div className="card-content">
                    <p className="card-label">Total Profit</p>
                    <h2 className="card-value">${user.totalProfit?.toLocaleString() || '0.00'}</h2>
                    <p className="card-change positive"><FontAwesomeIcon icon={faArrowUp} /> All time</p>
                  </div>
                </div>
              </div>

              <div className="section-card">
                <div className="section-header">
                  <h3>Active Investment Plans</h3>
                  <button className="btn-primary" onClick={() => handleNavigation('investments')}>
                    <FontAwesomeIcon icon={faPlus} /> New Investment
                  </button>
                </div>
                <div className="investments-list">
                  {activeInvestments.length > 0 ? (
                    activeInvestments.map(investment => (
                      <div key={investment.id} className="investment-item">
                        <div className="investment-header">
                          <h4>{investment.plan}</h4>
                          <span className="investment-amount">${investment.amount?.toLocaleString()}</span>
                        </div>
                        <div className="investment-details">
                          <div className="detail-item">
                            <span className="detail-label">Daily Return</span>
                            <span className="detail-value">{investment.dailyReturn}%</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Days Remaining</span>
                            <span className="detail-value">{investment.daysRemaining} days</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Next Payout</span>
                            <span className="detail-value"><FontAwesomeIcon icon={faClock} /> {investment.nextPayout}</span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${investment.progress}%` }}></div>
                        </div>
                        <p className="progress-text">{investment.progress}% Complete</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No active investments. Start investing today!</p>
                  )}
                </div>
              </div>

              <div className="earnings-section">
                <div className="section-card earnings-card">
                  <h3>Earnings Tracker</h3>
                  <div className="earnings-grid">
                    <div className="earnings-item">
                      <p className="earnings-label">Today</p>
                      <h4 className="earnings-value">${user.dailyEarnings || '0.00'}</h4>
                    </div>
                    <div className="earnings-item">
                      <p className="earnings-label">This Week</p>
                      <h4 className="earnings-value">${((user.dailyEarnings || 0) * 7).toFixed(2)}</h4>
                    </div>
                    <div className="earnings-item">
                      <p className="earnings-label">Total Earned</p>
                      <h4 className="earnings-value">${user.totalProfit?.toLocaleString() || '0.00'}</h4>
                    </div>
                  </div>
                </div>
                <div className="section-card quick-actions">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button className="action-btn primary" onClick={() => handleNavigation('deposit')}>
                      <FontAwesomeIcon icon={faPlus} /><span>Deposit Funds</span>
                    </button>
                    <button className="action-btn secondary" onClick={() => handleNavigation('investments')}>
                      <FontAwesomeIcon icon={faChartLine} /><span>Invest Now</span>
                    </button>
                    <button className="action-btn tertiary" onClick={() => handleNavigation('withdraw')}>
                      <FontAwesomeIcon icon={faArrowUp} /><span>Withdraw</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="section-card">
                <div className="section-header">
                  <h3>Recent Transactions</h3>
                  <button className="btn-text" onClick={() => handleNavigation('transactions')}>View All</button>
                </div>
                <div className="transactions-table">
                  <table>
                    <thead>
                      <tr><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                      {transactions.length > 0 ? (
                        transactions.slice(0, 5).map(transaction => (
                          <tr key={transaction.id}>
                            <td><span className={`transaction-type ${transaction.type}`}>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span></td>
                            <td className="amount">{transaction.type === 'withdrawal' || transaction.type === 'investment' ? '-' : '+'}${transaction.amount?.toLocaleString()}</td>
                            <td><span className={`status-badge ${transaction.status}`}>{transaction.status}</span></td>
                            <td>{transaction.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="no-data">No transactions yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Investments ─────────────────────────────────────────────────── */}
          {activeSection === 'investments' && (
            <div className="investments-section">
              {/* Active investments */}
              <div className="section-card">
                <h3>My Active Investments</h3>
                <div className="investments-list">
                  {activeInvestments.length > 0 ? (
                    activeInvestments.map(investment => (
                      <div key={investment.id} className="investment-item">
                        <div className="investment-header">
                          <h4>{investment.plan}</h4>
                          <span className="investment-amount">${investment.amount?.toLocaleString()}</span>
                        </div>
                        <div className="investment-details">
                          <div className="detail-item">
                            <span className="detail-label">Daily Return</span>
                            <span className="detail-value">{investment.dailyReturn}%</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Days Remaining</span>
                            <span className="detail-value">{investment.daysRemaining} / {investment.totalDays} days</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Total Earned</span>
                            <span className="detail-value">
                              ${((investment.amount * investment.dailyReturn / 100) * (investment.totalDays - investment.daysRemaining)).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${investment.progress}%` }}></div>
                        </div>
                        <p className="progress-text">{investment.progress}% Complete</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No active investments. Choose a plan below to get started!</p>
                  )}
                </div>
              </div>

              {/* ── Available Plans ─────────────────────────────────────────── */}
              <div className="section-card">
                <div className="section-header">
                  <h3>Available Investment Plans</h3>
                  <div className="plan-category-filters">
                    {[
                      { key: 'all',      label: 'All Plans' },
                      { key: 'daily',    label: 'Daily' },
                      { key: '72hours',  label: '72 Hours' },
                      { key: 'weekly',   label: 'Weekly' },
                      { key: 'monthly',  label: 'Monthly' },
                    ].map(f => (
                      <button
                        key={f.key}
                        className={`filter-btn ${planFilter === f.key ? 'active' : ''}`}
                        onClick={() => setPlanFilter(f.key)}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category headings + cards */}
                {['daily', '72hours', 'weekly', 'monthly'].map(cat => {
                  const catPlans = filteredPlans.filter(p => p.category === cat);
                  if (catPlans.length === 0) return null;
                  const catMeta = {
                    daily:   { label: '⚡ Daily Plans', sub: 'Earn every 24 hours', icon: faCalendarDay },
                    '72hours':{ label: '🚀 72-Hour Plans', sub: 'Fast 3-day turnaround', icon: faBolt },
                    weekly:  { label: '📅 Weekly Plans', sub: 'Consistent 7-day returns', icon: faCalendarWeek },
                    monthly: { label: '🏆 Monthly Plan', sub: 'Maximum 30-day wealth growth', icon: faCalendarAlt },
                  }[cat];
                  return (
                    <div key={cat} className="plan-category-section">
                      <div className="plan-category-header">
                        <div className="plan-cat-title">
                          <h4>{catMeta.label}</h4>
                          <span className="plan-cat-sub">{catMeta.sub}</span>
                        </div>
                        <span className="plan-cat-count">{catPlans.length} plan{catPlans.length > 1 ? 's' : ''}</span>
                      </div>
                      <div className="investment-plans-grid">
                        {catPlans.map(plan => (
                          <div key={plan.id} className="plan-card" style={{ '--plan-color': plan.color }}>
                            <div className="plan-top-accent" style={{ background: plan.color }}></div>
                            <div className="plan-header">
                              <div className="plan-header-left">
                                <div className="plan-icon" style={{ background: plan.color + '22', color: plan.color }}>
                                  <FontAwesomeIcon icon={plan.categoryIcon} />
                                </div>
                                <div>
                                  <h4>{plan.name}</h4>
                                  <span className="plan-category-tag">{plan.categoryLabel}</span>
                                </div>
                              </div>
                              <span className={`plan-badge ${plan.badgeClass}`}>{plan.badge}</span>
                            </div>

                            <div className="plan-return-display" style={{ color: plan.color }}>
                              <span className="plan-return-rate">{plan.returnLabel}</span>
                            </div>

                            <p className="plan-description">{plan.description}</p>

                            <div className="plan-body">
                              <div className="plan-detail">
                                <span className="plan-label">Min Amount</span>
                                <span className="plan-value">${plan.minAmount.toLocaleString()}</span>
                              </div>
                              <div className="plan-detail">
                                <span className="plan-label">Max Amount</span>
                                <span className="plan-value">
                                  {typeof plan.maxAmount === 'number' ? `$${plan.maxAmount.toLocaleString()}` : plan.maxAmount}
                                </span>
                              </div>
                              <div className="plan-detail">
                                <span className="plan-label">Duration</span>
                                <span className="plan-value">{plan.durationLabel}</span>
                              </div>
                              <div className="plan-detail">
                                <span className="plan-label">Total Return</span>
                                <span className="plan-value" style={{ color: plan.color, fontWeight: 700 }}>{plan.totalReturn}%</span>
                              </div>
                            </div>

                            <button
                              className="btn-invest-now"
                              style={{ background: plan.color }}
                              onClick={() => openInvestModal(plan)}
                            >
                              <FontAwesomeIcon icon={faChartLine} /> Invest Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Wallet ──────────────────────────────────────────────────────── */}
          {activeSection === 'wallet' && (
            <div className="wallet-section">
              <div className="wallet-overview">
                <div className="overview-card primary">
                  <div className="card-icon"><FontAwesomeIcon icon={faWallet} /></div>
                  <div className="card-content">
                    <p className="card-label">Total Balance</p>
                    <h2 className="card-value">${user.totalBalance?.toLocaleString() || '0.00'}</h2>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon"><FontAwesomeIcon icon={faDollarSign} /></div>
                  <div className="card-content">
                    <p className="card-label">Available Balance</p>
                    <h2 className="card-value">${user.availableBalance?.toLocaleString() || '0.00'}</h2>
                  </div>
                </div>
                <div className="overview-card">
                  <div className="card-icon"><FontAwesomeIcon icon={faChartLine} /></div>
                  <div className="card-content">
                    <p className="card-label">Invested Amount</p>
                    <h2 className="card-value">${((user.totalBalance || 0) - (user.availableBalance || 0)).toLocaleString()}</h2>
                  </div>
                </div>
              </div>
              <div className="section-card">
                <h3>Quick Actions</h3>
                <div className="wallet-actions">
                  <button className="wallet-action-btn" onClick={() => handleNavigation('deposit')}><FontAwesomeIcon icon={faArrowDown} /><span>Deposit</span></button>
                  <button className="wallet-action-btn" onClick={() => handleNavigation('withdraw')}><FontAwesomeIcon icon={faArrowUp} /><span>Withdraw</span></button>
                  <button className="wallet-action-btn" onClick={() => handleNavigation('investments')}><FontAwesomeIcon icon={faChartLine} /><span>Invest</span></button>
                  <button className="wallet-action-btn" onClick={() => handleNavigation('transactions')}><FontAwesomeIcon icon={faHistory} /><span>History</span></button>
                </div>
              </div>
              <div className="section-card">
                <h3>Recent Wallet Activity</h3>
                <div className="wallet-activity">
                  {transactions.filter(t => t.type === 'deposit' || t.type === 'withdrawal').length > 0 ? (
                    transactions.filter(t => t.type === 'deposit' || t.type === 'withdrawal').map(transaction => (
                      <div key={transaction.id} className="activity-item">
                        <div className="activity-icon"><FontAwesomeIcon icon={transaction.type === 'deposit' ? faArrowDown : faArrowUp} /></div>
                        <div className="activity-info">
                          <p className="activity-type">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</p>
                          <p className="activity-method">{transaction.method}</p>
                        </div>
                        <div className="activity-amount">
                          <p className={`amount ${transaction.type}`}>{transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount?.toLocaleString()}</p>
                          <p className="activity-date">{transaction.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No wallet activity yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Deposit ─────────────────────────────────────────────────────── */}
          {activeSection === 'deposit' && (
            <div className="deposit-section">
              <div className="section-card">
                <h3>Deposit Funds</h3>
                <div className="deposit-balance">
                  <p className="balance-label">Current Balance</p>
                  <h2 className="balance-amount">${user.availableBalance?.toLocaleString() || '0.00'}</h2>
                </div>
                <form className="deposit-form" onSubmit={handleDeposit}>
                  <div className="form-group">
                    <label>Deposit Amount</label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input type="number" placeholder="Enter amount" min="100" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} required />
                    </div>
                    <p className="form-hint">Minimum deposit: $100</p>
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <div className="payment-methods">
                      {['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDT (TRC20)'].map(method => (
                        <div className="payment-method" key={method}>
                          <input type="radio" name="payment" id={method} value={method} checked={depositMethod === method} onChange={(e) => setDepositMethod(e.target.value)} />
                          <label htmlFor={method}><FontAwesomeIcon icon={faCreditCard} /><span>{method}</span></label>
                        </div>
                      ))}
                      {/* ── Bank Transfer commented out ──────────────────────
                      <div className="payment-method">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="bank"
                          value="Bank Transfer"
                          checked={depositMethod === 'Bank Transfer'}
                          onChange={(e) => setDepositMethod(e.target.value)}
                        />
                        <label htmlFor="bank">
                          <FontAwesomeIcon icon={faCreditCard} />
                          <span>Bank Transfer</span>
                        </label>
                      </div>
                      ─────────────────────────────────────────────────────── */}
                    </div>
                  </div>
                  {WALLET_ADDRESSES[depositMethod] && (
                    <div className="form-group">
                      <label>Send {depositMethod} to this address</label>
                      <div className="referral-link-box">
                        <input type="text" value={WALLET_ADDRESSES[depositMethod]} readOnly />
                        <button type="button" className="btn-primary" onClick={() => copyToClipboard(WALLET_ADDRESSES[depositMethod], 'deposit-addr')}>
                          <FontAwesomeIcon icon={faCopy} />{copiedKey === 'deposit-addr' ? ' Copied!' : ' Copy'}
                        </button>
                      </div>
                      <p className="form-hint">Send the exact deposit amount to the address above, then submit this form.</p>
                    </div>
                  )}
                  <div className="form-group">
                    <label>Your Wallet Address (Optional)</label>
                    <input type="text" placeholder="Enter your sending wallet address (optional)" value={depositWallet} onChange={(e) => setDepositWallet(e.target.value)} />
                  </div>
                  <button type="submit" className="btn-primary btn-block" disabled={isSubmitting}>
                    <FontAwesomeIcon icon={faArrowDown} /> {isSubmitting ? 'Processing...' : 'Proceed to Deposit'}
                  </button>
                </form>
              </div>
              <div className="section-card">
                <h3>Deposit Instructions</h3>
                <div className="deposit-instructions">
                  {[
                    { n: 1, title: 'Select Amount & Method', body: 'Choose your deposit amount and preferred payment method' },
                    { n: 2, title: 'Copy Wallet Address', body: 'Copy the wallet address shown and send the exact amount to it' },
                    { n: 3, title: 'Submit the Form', body: 'Click "Proceed to Deposit" to notify us of your payment' },
                    { n: 4, title: 'Confirmation', body: 'Your balance will be credited after confirmation (usually 10–30 minutes)' },
                  ].map(item => (
                    <div className="instruction-item" key={item.n}>
                      <div className="instruction-number">{item.n}</div>
                      <div className="instruction-content"><h4>{item.title}</h4><p>{item.body}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-card">
                <h3>Recent Deposits</h3>
                <div className="deposit-history">
                  {transactions.filter(t => t.type === 'deposit').length > 0 ? (
                    transactions.filter(t => t.type === 'deposit').map(deposit => (
                      <div key={deposit.id} className="deposit-item">
                        <div className="deposit-info"><p className="deposit-method">{deposit.method}</p><p className="deposit-amount">${deposit.amount?.toLocaleString()}</p></div>
                        <div className="deposit-status"><span className={`status-badge ${deposit.status}`}>{deposit.status}</span><p className="deposit-date">{deposit.date}</p></div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No deposits yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Withdraw ────────────────────────────────────────────────────── */}
          {activeSection === 'withdraw' && (
            <div className="withdraw-section">
              <div className="section-card">
                <h3>Withdrawal</h3>
                <div className="withdraw-balance">
                  <p className="balance-label">Available Balance</p>
                  <h2 className="balance-amount">${user.availableBalance?.toLocaleString() || '0.00'}</h2>
                </div>
                <form className="withdraw-form" onSubmit={handleWithdrawal}>
                  <div className="form-group">
                    <label>Withdrawal Amount</label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input type="number" placeholder="Enter amount" min="50" max={user.availableBalance || 0} value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} required />
                    </div>
                    <p className="form-hint">Minimum withdrawal: $50</p>
                  </div>
                  <div className="form-group">
                    <label>Withdrawal Method</label>
                    <select value={withdrawMethod} onChange={(e) => setWithdrawMethod(e.target.value)} required>
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>USDT (TRC20)</option>
                      {/* <option>Bank Transfer</option> */}
                    </select>
                  </div>
                  {WALLET_ADDRESSES[withdrawMethod] && (
                    <div className="form-group">
                      <label>Our {withdrawMethod} Receiving Address</label>
                      <div className="referral-link-box">
                        <input type="text" value={WALLET_ADDRESSES[withdrawMethod]} readOnly />
                        <button type="button" className="btn-primary" onClick={() => copyToClipboard(WALLET_ADDRESSES[withdrawMethod], 'withdraw-addr')}>
                          <FontAwesomeIcon icon={faCopy} />{copiedKey === 'withdraw-addr' ? ' Copied!' : ' Copy'}
                        </button>
                      </div>
                      <p className="form-hint">This is the address your funds will be sent to upon approval.</p>
                    </div>
                  )}
                  <div className="form-group">
                    <label>Your Wallet Address / Bank Account</label>
                    <input type="text" placeholder="Enter your wallet address or bank account" value={withdrawWallet} onChange={(e) => setWithdrawWallet(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn-primary btn-block" disabled={isSubmitting}>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} /> {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
                  </button>
                </form>
              </div>
              <div className="section-card">
                <h3>Withdrawal Information</h3>
                <div className="withdrawal-info-grid">
                  <div className="info-item"><FontAwesomeIcon icon={faClock} className="info-icon" /><div className="info-content"><h4>Processing Time</h4><p>24–48 hours</p></div></div>
                  <div className="info-item"><FontAwesomeIcon icon={faDollarSign} className="info-icon" /><div className="info-content"><h4>Minimum Amount</h4><p>$50</p></div></div>
                  <div className="info-item"><FontAwesomeIcon icon={faCheckCircle} className="info-icon" /><div className="info-content"><h4>Withdrawal Fee</h4><p>2% or $5 (whichever is higher)</p></div></div>
                </div>
              </div>
              <div className="section-card">
                <h3>Withdrawal History</h3>
                <div className="withdrawal-history">
                  {transactions.filter(t => t.type === 'withdrawal').length > 0 ? (
                    transactions.filter(t => t.type === 'withdrawal').map(withdrawal => (
                      <div key={withdrawal.id} className="withdrawal-item">
                        <div className="withdrawal-info"><p className="withdrawal-amount">${withdrawal.amount?.toLocaleString()}</p><p className="withdrawal-method">{withdrawal.method}</p></div>
                        <div className="withdrawal-status"><span className={`status-badge ${withdrawal.status}`}>{withdrawal.status}</span><p className="withdrawal-date">{withdrawal.date}</p></div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No withdrawals yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Transactions ────────────────────────────────────────────────── */}
          {activeSection === 'transactions' && (
            <div className="transactions-section">
              <div className="section-card">
                <div className="section-header">
                  <h3>Transaction History</h3>
                  <div className="filter-buttons">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">Deposits</button>
                    <button className="filter-btn">Withdrawals</button>
                    <button className="filter-btn">Earnings</button>
                  </div>
                </div>
                <div className="transactions-table">
                  <table>
                    <thead>
                      <tr><th>Type</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {transactions.length > 0 ? (
                        transactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td><span className={`transaction-type ${transaction.type}`}>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span></td>
                            <td className="amount">{transaction.type === 'withdrawal' || transaction.type === 'investment' ? '-' : '+'}${transaction.amount?.toLocaleString()}</td>
                            <td>{transaction.method}</td>
                            <td><span className={`status-badge ${transaction.status}`}>{transaction.status}</span></td>
                            <td>{transaction.date}</td>
                            <td><button className="btn-icon"><FontAwesomeIcon icon={faDownload} /></button></td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="no-data">No transactions yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications ────────────────────────────────────────────────── */}
          {activeSection === 'notifications' && (
            <div className="notifications-section">
              <div className="section-card">
                <div className="section-header">
                  <h3>Notifications</h3>
                  <button className="btn-text">Mark all as read</button>
                </div>
                <div className="notifications-list">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className={`notification-item ${notification.type}`}>
                        <FontAwesomeIcon icon={notification.type === 'success' ? faCheckCircle : faExclamationCircle} className="notification-icon" />
                        <div className="notification-content">
                          <p className="notification-message">{notification.message}</p>
                          <p className="notification-time">{notification.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No notifications</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Referral ─────────────────────────────────────────────────────── */}
          {activeSection === 'referral' && (
            <div className="referral-section">
              <div className="section-card">
                <h3>Referral Program</h3>
                <div className="referral-stats">
                  <div className="referral-stat"><p className="stat-label">Total Earnings</p><h3 className="stat-value">${user.referralEarnings || '0.00'}</h3></div>
                  <div className="referral-stat"><p className="stat-label">Referred Users</p><h3 className="stat-value">{user.referredUsersCount || 0}</h3></div>
                  <div className="referral-stat"><p className="stat-label">Commission Rate</p><h3 className="stat-value">10%</h3></div>
                </div>
                <div className="referral-link-section">
                  <label>Your Referral Link</label>
                  <div className="referral-link-box">
                    <input type="text" value={`https://wallstreettrade.com/ref/${user.referralCode || ''}`} readOnly />
                    <button className="btn-primary" onClick={copyReferralLink}><FontAwesomeIcon icon={faCopy} /> Copy</button>
                  </div>
                </div>
              </div>
              <div className="section-card">
                <h3>How It Works</h3>
                <div className="referral-steps">
                  {[
                    { n: 1, title: 'Share Your Link', body: 'Share your unique referral link with friends and family' },
                    { n: 2, title: 'They Sign Up', body: 'When they register and make their first investment' },
                    { n: 3, title: 'Earn Commission', body: 'You earn 10% of their investment as commission' },
                  ].map(s => (
                    <div key={s.n} className="referral-step">
                      <div className="step-number">{s.n}</div>
                      <div className="step-content"><h4>{s.title}</h4><p>{s.body}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Profile ──────────────────────────────────────────────────────── */}
          {activeSection === 'profile' && (
            <div className="profile-section">
              <div className="section-card">
                <h3>Personal Information</h3>
                <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group"><label>Full Name</label><input type="text" defaultValue={user.name} /></div>
                    <div className="form-group"><label>Email Address</label><input type="email" defaultValue={user.email} disabled /></div>
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label>Phone Number</label><input type="tel" defaultValue={user.phone || ''} /></div>
                    <div className="form-group"><label>Country</label><input type="text" defaultValue={user.country || ''} /></div>
                  </div>
                  <div className="form-group"><label>Address</label><input type="text" defaultValue={user.address || ''} /></div>
                  <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faSave} /> Save Changes</button>
                </form>
              </div>
              <div className="section-card">
                <h3>Account Details</h3>
                <div className="account-details">
                  <div className="detail-row"><span className="detail-label">Member Since</span><span className="detail-value">{new Date(user.createdAt).toLocaleDateString() || 'N/A'}</span></div>
                  <div className="detail-row"><span className="detail-label">Account Status</span><span className="detail-value"><span className="status-badge completed">{user.accountStatus || 'Active'}</span></span></div>
                  <div className="detail-row"><span className="detail-label">Verification Status</span><span className="detail-value"><span className="status-badge completed">{user.verificationStatus || 'Unverified'}</span></span></div>
                  <div className="detail-row"><span className="detail-label">Total Investments</span><span className="detail-value">${((user.totalBalance || 0) - (user.availableBalance || 0)).toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* ── Security ─────────────────────────────────────────────────────── */}
          {activeSection === 'security' && (
            <div className="security-section">
              <div className="section-card">
                <h3>Change Password</h3>
                <form className="security-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group"><label>Current Password</label><input type="password" placeholder="Enter current password" /></div>
                  <div className="form-group"><label>New Password</label><input type="password" placeholder="Enter new password" /></div>
                  <div className="form-group"><label>Confirm New Password</label><input type="password" placeholder="Confirm new password" /></div>
                  <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faKey} /> Update Password</button>
                </form>
              </div>
              <div className="section-card">
                <h3>Two-Factor Authentication</h3>
                <div className="two-factor-section">
                  <div className="two-factor-status">
                    <div className="status-info">
                      <FontAwesomeIcon icon={faShield} className="status-icon" />
                      <div><h4>2FA Status</h4><p>Two-factor authentication is currently disabled</p></div>
                    </div>
                    <button className="btn-primary"><FontAwesomeIcon icon={faLock} /> Enable 2FA</button>
                  </div>
                </div>
              </div>
              <div className="section-card">
                <h3>Security Tips</h3>
                <div className="security-tips">
                  {[
                    { title: 'Use a strong password', body: 'Combine uppercase, lowercase, numbers, and special characters' },
                    { title: 'Enable 2FA', body: 'Add an extra layer of security to your account' },
                    { title: 'Never share your password', body: 'Keep your login credentials private and secure' },
                  ].map((tip, i) => (
                    <div key={i} className="tip-item">
                      <FontAwesomeIcon icon={faCheckCircle} className="tip-icon" />
                      <div className="tip-content"><h4>{tip.title}</h4><p>{tip.body}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

const loadingStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#0d0f14',
  gap: '1rem',
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '3px solid #2a2f3d',
  borderTopColor: '#D4AF37',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
};

export default Dashboard;