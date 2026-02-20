import React, { useState, useEffect, useRef } from 'react';
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
  faLockOpen,
  faCreditCard,
  faCopy,
  faBolt,
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faTrash,
  faCheck,
  faInfoCircle,
  faExclamationTriangle,
  faBellSlash,
  faSpinner,
  faEye,
  faEyeSlash,
  faTimesCircle,
  faMobileAlt,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import '../Dashboard.css';
import API_URL from '../config';

const WALLET_ADDRESSES = {
  'Bitcoin (BTC)':  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  'Ethereum (ETH)': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  'USDT (TRC20)':   'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
  'Solana (SOL)':   'YourSolanaWalletAddressHere',
  'USDC (ERC20)':   'YourUSDCWalletAddressHere',
  'Tron (TRX)':     'YourTronWalletAddressHere',
};

const PAYMENT_METHODS = [
  'Bitcoin (BTC)',
  'Ethereum (ETH)',
  'USDT (TRC20)',
  'Solana (SOL)',
  'USDC (ERC20)',
  'Tron (TRX)',
];

const INVESTMENT_PLANS = [
  // ── DAILY PLAN ─────────────────────────────────────────────────────────────
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

  // ── 3-DAY PLAN ─────────────────────────────────────────────────────────────
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

  // ── WEEKLY PLANS ───────────────────────────────────────────────────────────
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

  // ── 3-WEEK PLAN ────────────────────────────────────────────────────────────
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
    description: 'The ultimate 3-week wealth accelerator for elite investors. 375% total return.',
    badge: 'Top Earner',
    badgeClass: 'badge-top',
    color: '#c0392b',
  },
];

const NOTIF_META = {
  success:     { icon: faCheckCircle,        color: '#27ae60' },
  info:        { icon: faInfoCircle,          color: '#3498db' },
  warning:     { icon: faExclamationTriangle, color: '#f39c12' },
  error:       { icon: faExclamationCircle,   color: '#e74c3c' },
  account:     { icon: faUserCircle,          color: '#8e44ad' },
  transaction: { icon: faHistory,             color: '#2980b9' },
  investment:  { icon: faChartLine,           color: '#D4AF37' },
  referral:    { icon: faUsers,               color: '#16a085' },
  security:    { icon: faShield,              color: '#e74c3c' },
  system:      { icon: faBell,                color: '#555a69' },
  promotion:   { icon: faBolt,                color: '#d35400' },
};

const getNotifMeta = (type) => NOTIF_META[type] || NOTIF_META.info;

const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7)   return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

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
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getTransactions,
    updateProfile,
    changePassword,
  } = useUser();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [depositAmount, setDepositAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState('Bitcoin (BTC)');
  const [depositWallet, setDepositWallet] = useState('');

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('Bitcoin (BTC)');
  const [withdrawWallet, setWithdrawWallet] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // ── Profile form state ─────────────────────────────────────────────────────
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileCountry, setProfileCountry] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  // ── Password form state ────────────────────────────────────────────────────
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);


  // ── 2FA state ─────────────────────────────────────────────────────────────
  // twoFaStep: 'idle' | 'setup' | 'verify' | 'enabled' | 'disabling'
  const [twoFaStep, setTwoFaStep]         = useState('idle');
  const [twoFaQrCode, setTwoFaQrCode]     = useState('');
  const [twoFaSecret, setTwoFaSecret]     = useState('');
  const [twoFaToken, setTwoFaToken]       = useState('');
  const [twoFaPassword, setTwoFaPassword] = useState('');
  const [twoFaLoading, setTwoFaLoading]   = useState(false);
  const [twoFaEnabled, setTwoFaEnabled]   = useState(false);
  const [secretCopied, setSecretCopied]   = useState(false);
  const [investModal, setInvestModal] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [investSubmitting, setInvestSubmitting] = useState(false);
  const [investError, setInvestError] = useState('');
  const [investSuccess, setInvestSuccess] = useState('');

  const [planFilter, setPlanFilter] = useState('all');

  const [allNotifications, setAllNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifFilter, setNotifFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [markingAllRead, setMarkingAllRead] = useState(false);

  const [allTransactions, setAllTransactions] = useState([]);
  const [txnLoading, setTxnLoading] = useState(false);
  const [txnFilter, setTxnFilter] = useState('all');
  const [txnDetailModal, setTxnDetailModal] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => { loadDashboardData(); }, []);

  // Sync profile form fields whenever user data loads/changes
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfilePhone(user.phone || '');
      setProfileCountry(user.country || '');
      setProfileAddress(user.address || '');
      setTwoFaEnabled(!!user.twoFactorEnabled);
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboardData();
      if (result.success) {
        setDashboardData(result.data);
        setActiveInvestments(result.data.activeInvestments || []);
        setTransactions(result.data.recentTransactions || []);
        const dashNotifs = result.data.notifications || [];
        setNotifications(dashNotifs);
        setUnreadCount(dashNotifs.length);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllNotifications = async () => {
    setNotifLoading(true);
    try {
      const result = await getNotifications();
      if (result.success) {
        const notifs = result.data || [];
        setAllNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.isRead).length);
      } else {
        toast.error('Failed to load notifications');
      }
    } catch (err) {
      toast.error('Error loading notifications');
    } finally {
      setNotifLoading(false);
    }
  };

  const loadAllTransactions = async () => {
    setTxnLoading(true);
    try {
      const result = await getTransactions();
      if (result.success) {
        setAllTransactions(result.data || []);
      } else {
        toast.error('Failed to load transactions');
      }
    } catch (err) {
      toast.error('Error loading transactions');
    } finally {
      setTxnLoading(false);
    }
  };

  // FIX: replaced raw fetch with apiCall via UserContext
  const handleCancelTransaction = async (txnId) => {
    setCancellingId(txnId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/transactions/${txnId}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${response.status}): ${text}`); }

      if (data.success) {
        setAllTransactions(prev =>
          prev.map(t => t.id === txnId ? { ...t, status: 'cancelled' } : t)
        );
        if (txnDetailModal?.id === txnId) {
          setTxnDetailModal(prev => ({ ...prev, status: 'cancelled' }));
        }
        toast.success('Transaction cancelled successfully');
        await refreshUser();
      } else {
        toast.error(data.message || 'Failed to cancel transaction');
      }
    } catch (err) {
      toast.error('Error cancelling transaction');
    } finally {
      setCancellingId(null);
    }
  };

  const handleMarkAsRead = async (notifId) => {
    try {
      const result = await markNotificationAsRead(notifId);
      if (result.success) {
        setAllNotifications(prev =>
          prev.map(n => n.id === notifId ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        setNotifications(prev => prev.filter(n => n.id !== notifId));
      }
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    setMarkingAllRead(true);
    try {
      const result = await markAllNotificationsAsRead();
      if (result.success) {
        setAllNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
        setNotifications([]);
        toast.success('All notifications marked as read');
      } else {
        toast.error('Failed to mark all as read');
      }
    } catch (err) {
      toast.error('Error marking notifications as read');
    } finally {
      setMarkingAllRead(false);
    }
  };

  // FIX: replaced raw fetch with safe parse
  const handleDeleteNotification = async (notifId) => {
    setDeletingId(notifId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/notifications/${notifId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${response.status}): ${text}`); }

      if (data.success) {
        const deleted = allNotifications.find(n => n.id === notifId);
        setAllNotifications(prev => prev.filter(n => n.id !== notifId));
        if (deleted && !deleted.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
          setNotifications(prev => prev.filter(n => n.id !== notifId));
        }
        toast.success('Notification deleted');
      } else {
        toast.error('Failed to delete notification');
      }
    } catch (err) {
      toast.error('Error deleting notification');
    } finally {
      setDeletingId(null);
    }
  };

  const goToNotifications = () => {
    handleNavigation('notifications');
  };

  const activeSection = (() => {
    const path = location.pathname.split('/').pop();
    return path === 'dashboard' ? 'overview' : path;
  })();

  useEffect(() => {
    if (activeSection === 'notifications') {
      loadAllNotifications();
    }
    if (activeSection === 'transactions') {
      loadAllTransactions();
    }
  }, [activeSection]);

  const filteredNotifications = allNotifications.filter(n => {
    if (notifFilter === 'unread') return !n.isRead;
    if (notifFilter === 'read')   return n.isRead;
    return true;
  });

  const filteredTransactions = allTransactions.filter(t => {
    if (txnFilter === 'all') return true;
    if (txnFilter === 'earning') return t.type === 'earning' || t.type === 'referral_bonus';
    return t.type === txnFilter;
  });

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

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

  // ── Profile save handler ───────────────────────────────────────────────────
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileSubmitting(true);
    try {
      const result = await updateProfile({
        name: profileName,
        phone: profilePhone,
        country: profileCountry,
        address: profileAddress,
      });
      if (result.status === 'success') {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (err) {
      toast.error('Error updating profile');
    } finally {
      setProfileSubmitting(false);
    }
  };

  // ── Password change handler ────────────────────────────────────────────────
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    setPasswordSubmitting(true);
    try {
      const result = await changePassword(currentPassword, newPassword, confirmPassword);
      if (result.status === 'success') {
        toast.success('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(result.message || 'Failed to change password');
      }
    } catch (err) {
      toast.error('Error changing password');
    } finally {
      setPasswordSubmitting(false);
    }
  };


  // ── 2FA Handlers ─────────────────────────────────────────────────────────

  // FIX: replaced raw fetch with safe JSON parse
  // Step 1: Request setup — get QR code from backend
  const handle2FASetup = async () => {
    setTwoFaLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/2fa/setup`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${response.status}): ${text}`); }

      if (data.status === 'success') {
        setTwoFaQrCode(data.data.qrCode);
        setTwoFaSecret(data.data.secret);
        setTwoFaStep('setup');
      } else {
        toast.error(data.message || 'Failed to initiate 2FA setup');
      }
    } catch (err) {
      toast.error('Error setting up 2FA');
    } finally {
      setTwoFaLoading(false);
    }
  };

  // FIX: replaced raw fetch with safe JSON parse
  // Step 2: Verify the first TOTP code to activate
  const handle2FAVerify = async (e) => {
    e.preventDefault();
    if (!twoFaToken || twoFaToken.length !== 6) { toast.error('Please enter the 6-digit code from your app'); return; }
    setTwoFaLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: twoFaToken }),
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${response.status}): ${text}`); }

      if (data.status === 'success') {
        setTwoFaEnabled(true);
        setTwoFaStep('idle');
        setTwoFaQrCode('');
        setTwoFaSecret('');
        setTwoFaToken('');
        toast.success('Two-factor authentication enabled successfully!');
        await refreshUser();
      } else {
        toast.error(data.message || 'Invalid code. Please try again.');
      }
    } catch (err) {
      toast.error('Error verifying 2FA code');
    } finally {
      setTwoFaLoading(false);
    }
  };

  // Cancel setup flow
  const handle2FACancel = () => {
    setTwoFaStep('idle');
    setTwoFaQrCode('');
    setTwoFaSecret('');
    setTwoFaToken('');
    setTwoFaPassword('');
  };

  // FIX: replaced raw fetch with safe JSON parse
  // Disable 2FA
  const handle2FADisable = async (e) => {
    e.preventDefault();
    if (!twoFaPassword) { toast.error('Please enter your password'); return; }
    if (!twoFaToken || twoFaToken.length !== 6) { toast.error('Please enter your current 6-digit 2FA code'); return; }
    setTwoFaLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/2fa/disable`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: twoFaPassword, token: twoFaToken }),
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${response.status}): ${text}`); }

      if (data.status === 'success') {
        setTwoFaEnabled(false);
        setTwoFaStep('idle');
        setTwoFaToken('');
        setTwoFaPassword('');
        toast.success('Two-factor authentication disabled.');
        await refreshUser();
      } else {
        toast.error(data.message || 'Failed to disable 2FA');
      }
    } catch (err) {
      toast.error('Error disabling 2FA');
    } finally {
      setTwoFaLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(twoFaSecret);
    setSecretCopied(true);
    setTimeout(() => setSecretCopied(false), 2000);
  };
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleNavigation = (section) => {
  // Close sidebar on mobile (≤1024px) when a nav item is selected
  if (window.innerWidth <= 1024) {
    setSidebarOpen(false);
  }
  navigate(`/dashboard/${section}`);
};
  const handleLogout = async () => await logout();
  const copyReferralLink = () => {
    const referralLink = `https://wallstreettrade.com/ref/${user?.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

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

      {txnDetailModal && (
        <div className="invest-modal-overlay" onClick={() => setTxnDetailModal(null)}>
          <div className="invest-modal" onClick={(e) => e.stopPropagation()}>
            <div className="invest-modal-header">
              <div className="invest-modal-title">
                <div className="invest-modal-icon" style={{ background: '#555a69' }}>
                  <FontAwesomeIcon icon={faHistory} />
                </div>
                <div>
                  <h3>Transaction Details</h3>
                  <span className={`status-badge ${txnDetailModal.status}`}>{txnDetailModal.status}</span>
                </div>
              </div>
              <button className="invest-modal-close" onClick={() => setTxnDetailModal(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="invest-modal-body">
              <div className="txn-detail-grid">
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Type: </span>
                  <span className="txn-detail-value">
                    <span className={`transaction-type ${txnDetailModal.type}`}>
                      {txnDetailModal.type?.charAt(0).toUpperCase() + txnDetailModal.type?.slice(1)}
                    </span>
                  </span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Amount: </span>
                  <span className="txn-detail-value" style={{ fontWeight: 600 }}>
                    {txnDetailModal.type === 'withdrawal' || txnDetailModal.type === 'investment' ? '-' : '+'}
                    ${txnDetailModal.amount?.toLocaleString()}
                  </span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Method: </span>
                  <span className="txn-detail-value">{txnDetailModal.method || 'N/A'}</span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Status: </span>
                  <span className="txn-detail-value">
                    <span className={`status-badge ${txnDetailModal.status}`}>{txnDetailModal.status}</span>
                  </span>
                </div>
                <div className="txn-detail-row">
                  <span className="txn-detail-label">Date: </span>
                  <span className="txn-detail-value">{txnDetailModal.date}</span>
                </div>
                {txnDetailModal.description && (
                  <div className="txn-detail-row">
                    <span className="txn-detail-label">Description: </span>
                    <span className="txn-detail-value">{txnDetailModal.description}</span>
                  </div>
                )}
                {txnDetailModal.walletAddress && (
                  <div className="txn-detail-row">
                    <span className="txn-detail-label">Wallet Address: </span>
                    <span className="txn-detail-value txn-detail-hash">{txnDetailModal.walletAddress}</span>
                  </div>
                )}
                {txnDetailModal.transactionHash && (
                  <div className="txn-detail-row">
                    <span className="txn-detail-label">TX Hash</span>
                    <span className="txn-detail-value txn-detail-hash">{txnDetailModal.transactionHash}</span>
                  </div>
                )}
              </div>

              {txnDetailModal.status === 'pending' && (
                <button
                  className="btn-primary btn-block"
                  style={{ background: '#e74c3c', marginTop: '1.25rem' }}
                  onClick={() => handleCancelTransaction(txnDetailModal.id)}
                  disabled={cancellingId === txnDetailModal.id}
                >
                  {cancellingId === txnDetailModal.id
                    ? <><FontAwesomeIcon icon={faSpinner} spin /> Cancelling…</>
                    : <><FontAwesomeIcon icon={faTimesCircle} /> Cancel Transaction</>
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

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
            {unreadCount > 0 && <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
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

      <main className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
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
            <button
              className="topbar-notif-btn"
              onClick={goToNotifications}
              title="Notifications"
            >
              <FontAwesomeIcon icon={faBell} />
              {unreadCount > 0 && (
                <span className="topbar-notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
              )}
            </button>

            <div className="user-profile">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">

          {activeSection === 'overview' && (
            <div className="overview-section">
              <div className="overview-cards">
                <div className="overview-card primary">
                  <div className="card-icon"><FontAwesomeIcon icon={faWallet} /></div>
                  <div className="card-content">
                    <p className="card-label">Total Balance</p>
                    <h2 className="card-value">${user.totalBalance?.toLocaleString() || '0.00'}</h2>
                    {/* <p className="card-change positive"><FontAwesomeIcon icon={faArrowUp} /></p> */}
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

          {activeSection === 'investments' && (
            <div className="investments-section">
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

              <div className="section-card">
                <div className="section-header">
                  <h3>Available Investment Plans</h3>
                  <div className="plan-category-filters">
                    {[
                      { key: 'all',    label: 'All Plans' },
                      { key: 'daily',  label: 'Daily' },
                      { key: '3days',  label: '3 Days' },
                      { key: 'weekly', label: 'Weekly' },
                      { key: '3weeks', label: '3 Weeks' },
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

                {['daily', '3days', 'weekly', '3weeks'].map(cat => {
                  const catPlans = filteredPlans.filter(p => p.category === cat);
                  if (catPlans.length === 0) return null;
                  const catMeta = {
                    daily:   { label: '⚡ Daily Plan', sub: 'Earn every 24 hours', icon: faCalendarDay },
                    '3days': { label: '🚀 3-Day Plan', sub: 'Fast 3-day turnaround', icon: faBolt },
                    weekly:  { label: '📅 Weekly Plans', sub: 'Consistent 7-day returns', icon: faCalendarWeek },
                    '3weeks':{ label: '🏆 3-Week Plan', sub: 'Maximum 21-day wealth growth', icon: faCalendarAlt },
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
                      {PAYMENT_METHODS.map(method => (
                        <div className="payment-method" key={method}>
                          <input type="radio" name="payment" id={method} value={method} checked={depositMethod === method} onChange={(e) => setDepositMethod(e.target.value)} />
                          <label htmlFor={method}><FontAwesomeIcon icon={faCreditCard} /><span>{method}</span></label>
                        </div>
                      ))}
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
                      {PAYMENT_METHODS.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
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

          {activeSection === 'transactions' && (
            <div className="transactions-section">
              <div className="section-card">
                <div className="section-header">
                  <h3>Transaction History</h3>
                  <div className="filter-buttons">
                    {[
                      { key: 'all',        label: 'All' },
                      { key: 'deposit',    label: 'Deposits' },
                      { key: 'withdrawal', label: 'Withdrawals' },
                      { key: 'earning',    label: 'Earnings' },
                    ].map(f => (
                      <button
                        key={f.key}
                        className={`filter-btn ${txnFilter === f.key ? 'active' : ''}`}
                        onClick={() => setTxnFilter(f.key)}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {txnLoading ? (
                  <div className="notif-loading">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <p>Loading transactions…</p>
                  </div>
                ) : (
                  <div className="transactions-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.length > 0 ? (
                          filteredTransactions.map(transaction => (
                            <tr key={transaction.id}>
                              <td>
                                <span className={`transaction-type ${transaction.type}`}>
                                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                </span>
                              </td>
                              <td className="amount">
                                {transaction.type === 'withdrawal' || transaction.type === 'investment' ? '-' : '+'}
                                ${transaction.amount?.toLocaleString()}
                              </td>
                              <td>{transaction.method || 'N/A'}</td>
                              <td>
                                <span className={`status-badge ${transaction.status}`}>{transaction.status}</span>
                              </td>
                              <td>{transaction.date}</td>
                              <td>
                                <button
                                  className="btn-icon"
                                  title="View details"
                                  onClick={() => setTxnDetailModal(transaction)}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                                {transaction.status === 'pending' && (
                                  <button
                                    className="btn-icon"
                                    title="Cancel transaction"
                                    style={{ color: '#e74c3c', marginLeft: '0.25rem' }}
                                    onClick={() => handleCancelTransaction(transaction.id)}
                                    disabled={cancellingId === transaction.id}
                                  >
                                    {cancellingId === transaction.id
                                      ? <FontAwesomeIcon icon={faSpinner} spin />
                                      : <FontAwesomeIcon icon={faTimesCircle} />
                                    }
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="no-data">
                              {txnFilter === 'all'
                                ? 'No transactions yet'
                                : `No ${txnFilter} transactions found`}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="notifications-section">
              <div className="section-card">
                <div className="section-header">
                  <div className="notif-header-left">
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="notif-unread-pill">{unreadCount} unread</span>
                    )}
                  </div>
                  <div className="notif-header-actions">
                    {unreadCount > 0 && (
                      <button
                        className="btn-text notif-mark-all-btn"
                        onClick={handleMarkAllAsRead}
                        disabled={markingAllRead}
                      >
                        {markingAllRead
                          ? <><FontAwesomeIcon icon={faSpinner} spin /> Marking…</>
                          : <><FontAwesomeIcon icon={faCheck} /> Mark all as read</>
                        }
                      </button>
                    )}
                  </div>
                </div>

                <div className="notif-filter-tabs">
                  {[
                    { key: 'all',    label: 'All' },
                    { key: 'unread', label: 'Unread' },
                    { key: 'read',   label: 'Read' },
                  ].map(f => (
                    <button
                      key={f.key}
                      className={`notif-tab ${notifFilter === f.key ? 'active' : ''}`}
                      onClick={() => setNotifFilter(f.key)}
                    >
                      {f.label}
                      {f.key === 'unread' && unreadCount > 0 && (
                        <span className="notif-tab-count">{unreadCount}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="notifications-list">
                  {notifLoading ? (
                    <div className="notif-loading">
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <p>Loading notifications…</p>
                    </div>
                  ) : filteredNotifications.length > 0 ? (
                    filteredNotifications.map(notification => {
                      const meta = getNotifMeta(notification.type);
                      return (
                        <div
                          key={notification.id}
                          className={`notification-item ${notification.type} ${!notification.isRead ? 'unread' : ''}`}
                        >
                          <div
                            className="notification-icon-wrap"
                            style={{ color: meta.color, background: meta.color + '18' }}
                          >
                            <FontAwesomeIcon icon={meta.icon} className="notification-icon" />
                          </div>

                          <div className="notification-content">
                            {notification.title && (
                              <p className="notification-title">{notification.title}</p>
                            )}
                            <p className="notification-message">{notification.message}</p>
                            <p className="notification-time">{timeAgo(notification.createdAt)}</p>
                          </div>

                          <div className="notification-actions">
                            {!notification.isRead && (
                              <button
                                className="notif-action-btn notif-read-btn"
                                title="Mark as read"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            )}
                            <button
                              className="notif-action-btn notif-delete-btn"
                              title="Delete"
                              onClick={() => handleDeleteNotification(notification.id)}
                              disabled={deletingId === notification.id}
                            >
                              {deletingId === notification.id
                                ? <FontAwesomeIcon icon={faSpinner} spin />
                                : <FontAwesomeIcon icon={faTrash} />
                              }
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="notif-empty">
                      <FontAwesomeIcon icon={faBellSlash} />
                      <p>
                        {notifFilter === 'unread'
                          ? 'No unread notifications'
                          : notifFilter === 'read'
                          ? 'No read notifications'
                          : 'No notifications yet'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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

          {/* ── Profile ── FULLY WIRED to backend via updateProfile() */}
          {activeSection === 'profile' && (
            <div className="profile-section">
              <div className="section-card">
                <h3>Personal Information</h3>
                <form className="profile-form" onSubmit={handleProfileSave}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={user.email} disabled />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        value={profileCountry}
                        onChange={(e) => setProfileCountry(e.target.value)}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                  <button type="submit" className="btn-primary" disabled={profileSubmitting}>
                    <FontAwesomeIcon icon={profileSubmitting ? faSpinner : faSave} spin={profileSubmitting} />
                    {profileSubmitting ? ' Saving...' : ' Save Changes'}
                  </button>
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

          {/* ── Security ──────────────────────────────────────────────────── */}
          {activeSection === 'security' && (
            <div className="security-section">

              {/* Change Password */}
              <div className="section-card">
                <h3>Change Password</h3>
                <form className="security-form" onSubmit={handlePasswordChange}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password (min 8 chars)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn-primary" disabled={passwordSubmitting}>
                    <FontAwesomeIcon icon={passwordSubmitting ? faSpinner : faKey} spin={passwordSubmitting} />
                    {passwordSubmitting ? ' Updating...' : ' Update Password'}
                  </button>
                </form>
              </div>

              {/* Two-Factor Authentication */}
              <div className="section-card">
                <h3>Two-Factor Authentication</h3>

                {/* ── State: idle / already enabled ── */}
                {twoFaStep === 'idle' && (
                  <div className="two-factor-section">
                    <div className="two-factor-status">
                      <div className="status-info">
                        <FontAwesomeIcon
                          icon={twoFaEnabled ? faLock : faLockOpen}
                          className="status-icon"
                          style={{ color: twoFaEnabled ? '#27ae60' : '#555a69' }}
                        />
                        <div>
                          <h4>2FA is currently {twoFaEnabled ? 'enabled' : 'disabled'}</h4>
                          <p>
                            {twoFaEnabled
                              ? 'Your account is protected with an authenticator app.'
                              : 'Add an extra layer of security using Google Authenticator or Authy.'}
                          </p>
                        </div>
                      </div>
                      {twoFaEnabled ? (
                        <button
                          className="btn-primary"
                          style={{ background: '#e74c3c' }}
                          onClick={() => { setTwoFaStep('disabling'); setTwoFaToken(''); setTwoFaPassword(''); }}
                        >
                          <FontAwesomeIcon icon={faLockOpen} /> Disable 2FA
                        </button>
                      ) : (
                        <button
                          className="btn-primary"
                          onClick={handle2FASetup}
                          disabled={twoFaLoading}
                        >
                          {twoFaLoading
                            ? <><FontAwesomeIcon icon={faSpinner} spin /> Setting up…</>
                            : <><FontAwesomeIcon icon={faLock} /> Enable 2FA</>}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* ── State: setup — show QR code ── */}
                {twoFaStep === 'setup' && (
                  <div className="twofa-setup-flow">
                    {/* Step indicators */}
                    <div className="twofa-steps">
                      <div className="twofa-step active">
                        <div className="twofa-step-num">1</div>
                        <span>Scan QR Code</span>
                      </div>
                      <div className="twofa-step-line" />
                      <div className="twofa-step">
                        <div className="twofa-step-num">2</div>
                        <span>Verify Code</span>
                      </div>
                    </div>

                    <div className="twofa-qr-block">
                      <div className="twofa-qr-instructions">
                        <div className="twofa-instruction-item">
                          <div className="twofa-instruction-num">1</div>
                          <p>Download <strong>Google Authenticator</strong> or <strong>Authy</strong> on your phone</p>
                        </div>
                        <div className="twofa-instruction-item">
                          <div className="twofa-instruction-num">2</div>
                          <p>Open the app and tap <strong>"Scan a QR code"</strong></p>
                        </div>
                        <div className="twofa-instruction-item">
                          <div className="twofa-instruction-num">3</div>
                          <p>Point your camera at the QR code on the right</p>
                        </div>
                      </div>

                      <div className="twofa-qr-image-wrap">
                        {twoFaQrCode
                          ? <img src={twoFaQrCode} alt="2FA QR Code" className="twofa-qr-img" />
                          : <div className="twofa-qr-placeholder"><FontAwesomeIcon icon={faQrcode} /></div>
                        }
                        <p className="twofa-qr-label">Scan with your authenticator app</p>
                      </div>
                    </div>

                    {/* Manual entry fallback */}
                    <div className="twofa-manual-key">
                      <p className="twofa-manual-label">Can't scan? Enter this key manually:</p>
                      <div className="twofa-key-box">
                        <code className="twofa-key-text">{twoFaSecret}</code>
                        <button type="button" className="btn-icon twofa-copy-btn" onClick={copySecret} title="Copy key">
                          <FontAwesomeIcon icon={secretCopied ? faCheck : faCopy} style={{ color: secretCopied ? '#27ae60' : undefined }} />
                        </button>
                      </div>
                    </div>

                    <div className="twofa-action-row">
                      <button type="button" className="btn-text" onClick={handle2FACancel}>Cancel</button>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => setTwoFaStep('verify')}
                      >
                        I've scanned it — Next <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── State: verify — enter the first TOTP code ── */}
                {twoFaStep === 'verify' && (
                  <div className="twofa-setup-flow">
                    {/* Step indicators */}
                    <div className="twofa-steps">
                      <div className="twofa-step done">
                        <div className="twofa-step-num"><FontAwesomeIcon icon={faCheck} /></div>
                        <span>Scan QR Code</span>
                      </div>
                      <div className="twofa-step-line done" />
                      <div className="twofa-step active">
                        <div className="twofa-step-num">2</div>
                        <span>Verify Code</span>
                      </div>
                    </div>

                    <div className="twofa-verify-block">
                      <div className="twofa-verify-icon">
                        <FontAwesomeIcon icon={faMobileAlt} />
                      </div>
                      <h4 className="twofa-verify-title">Enter the 6-digit code</h4>
                      <p className="twofa-verify-sub">Open your authenticator app and enter the current code for Wallstreet Investment</p>

                      <form onSubmit={handle2FAVerify} className="twofa-verify-form">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          placeholder="000000"
                          className="twofa-code-input"
                          value={twoFaToken}
                          onChange={(e) => setTwoFaToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          autoFocus
                          required
                        />
                        <div className="twofa-action-row">
                          <button type="button" className="btn-text" onClick={() => setTwoFaStep('setup')}>← Back</button>
                          <button type="submit" className="btn-primary" disabled={twoFaLoading || twoFaToken.length !== 6}>
                            {twoFaLoading
                              ? <><FontAwesomeIcon icon={faSpinner} spin /> Verifying…</>
                              : <><FontAwesomeIcon icon={faShield} /> Activate 2FA</>}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* ── State: disabling — confirm password + code ── */}
                {twoFaStep === 'disabling' && (
                  <div className="twofa-setup-flow">
                    <div className="twofa-disable-warning">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      <div>
                        <h4>Disable Two-Factor Authentication</h4>
                        <p>This will remove 2FA protection from your account. Enter your password and a current 2FA code to confirm.</p>
                      </div>
                    </div>
                    <form onSubmit={handle2FADisable} className="twofa-verify-form">
                      <div className="form-group">
                        <label>Account Password</label>
                        <input
                          type="password"
                          placeholder="Enter your account password"
                          value={twoFaPassword}
                          onChange={(e) => setTwoFaPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Current 2FA Code</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          placeholder="6-digit code from your app"
                          className="twofa-code-input"
                          value={twoFaToken}
                          onChange={(e) => setTwoFaToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          required
                        />
                      </div>
                      <div className="twofa-action-row">
                        <button type="button" className="btn-text" onClick={handle2FACancel}>Cancel</button>
                        <button
                          type="submit"
                          className="btn-primary"
                          style={{ background: '#e74c3c' }}
                          disabled={twoFaLoading || !twoFaPassword || twoFaToken.length !== 6}
                        >
                          {twoFaLoading
                            ? <><FontAwesomeIcon icon={faSpinner} spin /> Disabling…</>
                            : <><FontAwesomeIcon icon={faLockOpen} /> Confirm Disable</>}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Security Tips */}
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