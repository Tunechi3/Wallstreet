import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faUsers, faMoneyBillWave, faExchangeAlt,
  faBell, faSignOutAlt, faBars, faTimes, faCheck, faBan,
  faEye, faSearch, faChartLine, faWallet, faArrowUp,
  faArrowDown, faClock, faCheckCircle, faTimesCircle,
  faFilter, faSync, faUserShield, faCoins
} from '@fortawesome/free-solid-svg-icons';
import '../AdminDashboard.css'
import API_URL from '../config';



const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Data states
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Filter/search states
  const [searchTerm, setSearchTerm] = useState('');
  const [txFilter, setTxFilter] = useState('all');

  // Modal state
  const [modal, setModal] = useState(null); // { type, data }

  const getToken = () => localStorage.getItem('token');

  const adminFetch = useCallback(async (endpoint, options = {}) => {
    const token = getToken();
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }, []);

  // ── Load all admin data ────────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    try {
      setLoading(true);

      const [usersRes, txRes, statsRes] = await Promise.all([
        adminFetch('/admin/users'),
        adminFetch('/admin/transactions'),
        adminFetch('/admin/stats'),
      ]);

      const allUsers = usersRes.data || [];
      const allTx    = txRes.data    || [];

      setUsers(allUsers);
      setAllTransactions(allTx);
      setPendingDeposits(allTx.filter(t => t.type === 'deposit'    && t.status === 'pending'));
      setPendingWithdrawals(allTx.filter(t => t.type === 'withdrawal' && t.status === 'pending'));

      // Use server stats if available, fall back to computed
      if (statsRes?.data) {
        setStats({
          totalUsers:      statsRes.data.totalUsers,
          totalBalance:    statsRes.data.totalBalance,
          totalDeposited:  statsRes.data.totalDeposited,
          totalWithdrawn:  statsRes.data.totalWithdrawn,
          pendingDep:      statsRes.data.pendingDeposits,
          pendingWit:      statsRes.data.pendingWithdrawals,
        });
      } else {
        const pendingDep = allTx.filter(t => t.type === 'deposit'    && t.status === 'pending').length;
        const pendingWit = allTx.filter(t => t.type === 'withdrawal' && t.status === 'pending').length;
        setStats({
          totalUsers:     allUsers.length,
          totalBalance:   allUsers.reduce((s, u) => s + (u.totalBalance || 0), 0),
          totalDeposited: allTx.filter(t => t.type === 'deposit'    && t.status === 'completed').reduce((s, t) => s + t.amount, 0),
          totalWithdrawn: allTx.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((s, t) => s + t.amount, 0),
          pendingDep,
          pendingWit,
        });
      }
    } catch (err) {
      console.error('Admin load error:', err);
    } finally {
      setLoading(false);
    }
  }, [adminFetch]);

  useEffect(() => {
    // Redirect non-admins immediately
    if (user && user.role !== 'admin' && user.role !== 'super_admin') {
      navigate('/dashboard/overview');
      return;
    }
    loadAll();
  }, [user, navigate, loadAll]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const approveDeposit = async (txId) => {
    setActionLoading(txId);
    try {
      await adminFetch(`/transactions/${txId}/approve-deposit`, { method: 'PATCH' });
      await loadAll();
      setModal(null);
      alert('✅ Deposit approved and balance credited.');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const processWithdrawal = async (txId, status) => {
    setActionLoading(txId);
    try {
      await adminFetch(`/transactions/${txId}/process-withdrawal`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      await loadAll();
      setModal(null);
      alert(`✅ Withdrawal ${status}.`);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  };


  // Balance adjustment state
  const [adjustForm, setAdjustForm] = useState({ amount: '', type: 'credit', note: '' });

  const adjustBalance = async (userId) => {
    if (!adjustForm.amount || parseFloat(adjustForm.amount) <= 0) {
      alert('Please enter a valid amount'); return;
    }
    setActionLoading(userId);
    try {
      await adminFetch(`/admin/users/${userId}/balance`, {
        method: 'PATCH',
        body: JSON.stringify({ amount: parseFloat(adjustForm.amount), type: adjustForm.type, note: adjustForm.note })
      });
      await loadAll();
      setModal(null);
      setAdjustForm({ amount: '', type: 'credit', note: '' });
      alert(`✅ Balance ${adjustForm.type === 'credit' ? 'credited' : 'debited'} successfully.`);
    } catch (err) { alert('Error: ' + err.message); }
    finally { setActionLoading(null); }
  };

  const updateUserStatus = async (userId, status) => {
    setActionLoading(userId);
    try {
      await adminFetch(`/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      await loadAll();
      setModal(null);
      alert(`✅ User account ${status}.`);
    } catch (err) { alert('Error: ' + err.message); }
    finally { setActionLoading(null); }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const fmt = (n) => `$${(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const filteredTx = allTransactions.filter(t => {
    const matchFilter = txFilter === 'all' || t.type === txFilter || t.status === txFilter;
    const matchSearch = !searchTerm ||
      t.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t._id?.toString().includes(searchTerm);
    return matchFilter && matchSearch;
  });

  const filteredUsers = users.filter(u =>
    !searchTerm ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading Admin Panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-sidebar-header">
          {sidebarOpen && (
            <div className="admin-brand">
              <FontAwesomeIcon icon={faUserShield} className="brand-icon" />
              <span>Admin Panel</span>
            </div>
          )}
          <button className="admin-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
        </div>

        <nav className="admin-nav">
          {[
            { id: 'overview',     icon: faTachometerAlt,  label: 'Overview'     },
            { id: 'deposits',     icon: faArrowDown,       label: 'Deposits',    badge: stats?.pendingDep },
            { id: 'withdrawals',  icon: faArrowUp,         label: 'Withdrawals', badge: stats?.pendingWit },
            { id: 'transactions', icon: faExchangeAlt,     label: 'Transactions' },
            { id: 'users',        icon: faUsers,           label: 'Users'        },
          ].map(item => (
            <button
              key={item.id}
              className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <FontAwesomeIcon icon={item.icon} />
              {sidebarOpen && <span>{item.label}</span>}
              {item.badge > 0 && (
                <span className="admin-badge">{item.badge}</span>
              )}
            </button>
          ))}

          <button className="admin-nav-item logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className={`admin-main ${sidebarOpen ? '' : 'expanded'}`}>

        {/* Topbar */}
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="admin-page-title">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
          </div>
          <div className="admin-topbar-right">
            <button className="admin-refresh-btn" onClick={loadAll} title="Refresh data">
              <FontAwesomeIcon icon={faSync} />
            </button>
            <div className="admin-user-chip">
              <div className="admin-avatar">{user?.name?.charAt(0)}</div>
              {sidebarOpen && (
                <div>
                  <p className="admin-user-name">{user?.name}</p>
                  <p className="admin-user-role">{user?.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="admin-content">

          {/* ══ OVERVIEW ══════════════════════════════════════════════════ */}
          {activeSection === 'overview' && (
            <div className="admin-overview">
              <div className="admin-stat-grid">
                {[
                  { label: 'Total Users',        value: stats?.totalUsers,      icon: faUsers,         color: 'blue'   },
                  { label: 'Platform Balance',   value: fmt(stats?.totalBalance), icon: faWallet,       color: 'green'  },
                  { label: 'Total Deposited',    value: fmt(stats?.totalDeposited), icon: faArrowDown,  color: 'teal'   },
                  { label: 'Total Withdrawn',    value: fmt(stats?.totalWithdrawn), icon: faArrowUp,    color: 'orange' },
                  { label: 'Pending Deposits',   value: stats?.pendingDep,      icon: faClock,         color: 'yellow' },
                  { label: 'Pending Withdrawals',value: stats?.pendingWit,      icon: faClock,         color: 'red'    },
                ].map((card, i) => (
                  <div key={i} className={`admin-stat-card color-${card.color}`}>
                    <div className="stat-icon">
                      <FontAwesomeIcon icon={card.icon} />
                    </div>
                    <div className="stat-content">
                      <p className="stat-label">{card.label}</p>
                      <h3 className="stat-value">{card.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pending Actions Quick View */}
              <div className="admin-quick-panels">
                <div className="admin-panel">
                  <div className="admin-panel-header">
                    <h3>Pending Deposits</h3>
                    <button className="view-all-btn" onClick={() => setActiveSection('deposits')}>
                      View All
                    </button>
                  </div>
                  {pendingDeposits.length === 0 ? (
                    <p className="admin-empty">No pending deposits</p>
                  ) : (
                    pendingDeposits.slice(0, 5).map(tx => (
                      <div key={tx._id} className="admin-quick-row">
                        <div className="quick-row-info">
                          <p className="quick-row-name">{tx.userId?.name || 'User'}</p>
                          <p className="quick-row-sub">{tx.method} · {fmtDate(tx.createdAt)}</p>
                        </div>
                        <div className="quick-row-right">
                          <span className="quick-amount deposit">{fmt(tx.amount)}</span>
                          <button
                            className="admin-action-btn approve"
                            onClick={() => approveDeposit(tx._id)}
                            disabled={actionLoading === tx._id}
                          >
                            {actionLoading === tx._id ? '...' : <FontAwesomeIcon icon={faCheck} />}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="admin-panel">
                  <div className="admin-panel-header">
                    <h3>Pending Withdrawals</h3>
                    <button className="view-all-btn" onClick={() => setActiveSection('withdrawals')}>
                      View All
                    </button>
                  </div>
                  {pendingWithdrawals.length === 0 ? (
                    <p className="admin-empty">No pending withdrawals</p>
                  ) : (
                    pendingWithdrawals.slice(0, 5).map(tx => (
                      <div key={tx._id} className="admin-quick-row">
                        <div className="quick-row-info">
                          <p className="quick-row-name">{tx.userId?.name || 'User'}</p>
                          <p className="quick-row-sub">{tx.method} · {fmtDate(tx.createdAt)}</p>
                        </div>
                        <div className="quick-row-right">
                          <span className="quick-amount withdrawal">{fmt(tx.amount)}</span>
                          <button
                            className="admin-action-btn approve"
                            onClick={() => setModal({ type: 'withdrawal', data: tx })}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ DEPOSITS ══════════════════════════════════════════════════ */}
          {activeSection === 'deposits' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div className="admin-filters">
                  <button className={`admin-filter-btn ${txFilter === 'all' ? 'active' : ''}`} onClick={() => setTxFilter('all')}>All</button>
                  <button className={`admin-filter-btn ${txFilter === 'pending' ? 'active' : ''}`} onClick={() => setTxFilter('pending')}>Pending</button>
                  <button className={`admin-filter-btn ${txFilter === 'completed' ? 'active' : ''}`} onClick={() => setTxFilter('completed')}>Completed</button>
                </div>
                <div className="admin-search-box">
                  <FontAwesomeIcon icon={faSearch} />
                  <input placeholder="Search user..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactions
                      .filter(t => t.type === 'deposit')
                      .filter(t => txFilter === 'all' || t.status === txFilter)
                      .filter(t => !searchTerm || t.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || t.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(tx => (
                        <tr key={tx._id}>
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">{tx.userId?.name?.charAt(0) || '?'}</div>
                              <div>
                                <p className="table-name">{tx.userId?.name || 'Unknown'}</p>
                                <p className="table-email">{tx.userId?.email || ''}</p>
                              </div>
                            </div>
                          </td>
                          <td className="table-amount deposit">{fmt(tx.amount)}</td>
                          <td>{tx.method}</td>
                          <td><span className={`admin-status ${tx.status}`}>{tx.status}</span></td>
                          <td>{fmtDate(tx.createdAt)}</td>
                          <td>
                            {tx.status === 'pending' ? (
                              <button
                                className="admin-action-btn approve"
                                onClick={() => setModal({ type: 'deposit', data: tx })}
                              >
                                <FontAwesomeIcon icon={faEye} /> Review
                              </button>
                            ) : (
                              <span className="table-done">
                                <FontAwesomeIcon icon={faCheckCircle} /> Done
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ WITHDRAWALS ═══════════════════════════════════════════════ */}
          {activeSection === 'withdrawals' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div className="admin-filters">
                  <button className={`admin-filter-btn ${txFilter === 'all' ? 'active' : ''}`} onClick={() => setTxFilter('all')}>All</button>
                  <button className={`admin-filter-btn ${txFilter === 'pending' ? 'active' : ''}`} onClick={() => setTxFilter('pending')}>Pending</button>
                  <button className={`admin-filter-btn ${txFilter === 'completed' ? 'active' : ''}`} onClick={() => setTxFilter('completed')}>Completed</button>
                  <button className={`admin-filter-btn ${txFilter === 'failed' ? 'active' : ''}`} onClick={() => setTxFilter('failed')}>Failed</button>
                </div>
                <div className="admin-search-box">
                  <FontAwesomeIcon icon={faSearch} />
                  <input placeholder="Search user..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Wallet Address</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTransactions
                      .filter(t => t.type === 'withdrawal')
                      .filter(t => txFilter === 'all' || t.status === txFilter)
                      .filter(t => !searchTerm || t.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || t.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(tx => (
                        <tr key={tx._id}>
                          <td>
                            <div className="table-user">
                              <div className="table-avatar">{tx.userId?.name?.charAt(0) || '?'}</div>
                              <div>
                                <p className="table-name">{tx.userId?.name || 'Unknown'}</p>
                                <p className="table-email">{tx.userId?.email || ''}</p>
                              </div>
                            </div>
                          </td>
                          <td className="table-amount withdrawal">{fmt(tx.amount)}</td>
                          <td>{tx.method}</td>
                          <td className="table-wallet">{tx.walletAddress || '—'}</td>
                          <td><span className={`admin-status ${tx.status}`}>{tx.status}</span></td>
                          <td>{fmtDate(tx.createdAt)}</td>
                          <td>
                            {tx.status === 'pending' ? (
                              <button
                                className="admin-action-btn approve"
                                onClick={() => setModal({ type: 'withdrawal', data: tx })}
                              >
                                <FontAwesomeIcon icon={faEye} /> Review
                              </button>
                            ) : (
                              <span className={`table-done ${tx.status}`}>
                                <FontAwesomeIcon icon={tx.status === 'completed' ? faCheckCircle : faTimesCircle} /> {tx.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ ALL TRANSACTIONS ══════════════════════════════════════════ */}
          {activeSection === 'transactions' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <div className="admin-filters">
                  {['all','deposit','withdrawal','investment','earning','refund'].map(f => (
                    <button key={f} className={`admin-filter-btn ${txFilter === f ? 'active' : ''}`} onClick={() => setTxFilter(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="admin-search-box">
                  <FontAwesomeIcon icon={faSearch} />
                  <input placeholder="Search user or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTx.map(tx => (
                      <tr key={tx._id}>
                        <td>
                          <div className="table-user">
                            <div className="table-avatar">{tx.userId?.name?.charAt(0) || '?'}</div>
                            <div>
                              <p className="table-name">{tx.userId?.name || 'Unknown'}</p>
                              <p className="table-email">{tx.userId?.email || ''}</p>
                            </div>
                          </div>
                        </td>
                        <td><span className={`admin-tx-type ${tx.type}`}>{tx.type}</span></td>
                        <td className={`table-amount ${tx.type}`}>{fmt(tx.amount)}</td>
                        <td>{tx.method}</td>
                        <td><span className={`admin-status ${tx.status}`}>{tx.status}</span></td>
                        <td>{fmtDate(tx.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ USERS ═════════════════════════════════════════════════════ */}
          {activeSection === 'users' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <p className="admin-count">{filteredUsers.length} users</p>
                <div className="admin-search-box">
                  <FontAwesomeIcon icon={faSearch} />
                  <input placeholder="Search by name or email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Total Balance</th>
                      <th>Available</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u._id}>
                        <td>
                          <div className="table-user">
                            <div className="table-avatar">{u.name?.charAt(0)}</div>
                            <div>
                              <p className="table-name">{u.name}</p>
                              <p className="table-email">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td><span className={`admin-role-badge ${u.role}`}>{u.role}</span></td>
                        <td className="table-amount">{fmt(u.totalBalance)}</td>
                        <td className="table-amount">{fmt(u.availableBalance)}</td>
                        <td><span className={`admin-status ${u.accountStatus}`}>{u.accountStatus}</span></td>
                        <td>{fmtDate(u.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ══ MODALS ════════════════════════════════════════════════════════ */}
      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setModal(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Deposit Review Modal */}
            {modal.type === 'deposit' && (
              <>
                <h2 className="modal-title">Review Deposit</h2>
                <div className="modal-detail-grid">
                  <div className="modal-detail"><span>User</span><strong>{modal.data.userId?.name}</strong></div>
                  <div className="modal-detail"><span>Email</span><strong>{modal.data.userId?.email}</strong></div>
                  <div className="modal-detail"><span>Amount</span><strong className="modal-amount deposit">{fmt(modal.data.amount)}</strong></div>
                  <div className="modal-detail"><span>Method</span><strong>{modal.data.method}</strong></div>
                  <div className="modal-detail"><span>Wallet</span><strong>{modal.data.walletAddress || '—'}</strong></div>
                  <div className="modal-detail"><span>Submitted</span><strong>{fmtDate(modal.data.createdAt)}</strong></div>
                  <div className="modal-detail"><span>Status</span><strong><span className={`admin-status ${modal.data.status}`}>{modal.data.status}</span></strong></div>
                  <div className="modal-detail"><span>Description</span><strong>{modal.data.description || '—'}</strong></div>
                </div>
                <div className="modal-actions">
                  <button
                    className="modal-btn approve"
                    onClick={() => approveDeposit(modal.data._id)}
                    disabled={actionLoading === modal.data._id}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    {actionLoading === modal.data._id ? ' Processing...' : ' Approve Deposit'}
                  </button>
                  <button className="modal-btn cancel" onClick={() => setModal(null)}>
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Withdrawal Review Modal */}
            {modal.type === 'withdrawal' && (
              <>
                <h2 className="modal-title">Review Withdrawal</h2>
                <div className="modal-detail-grid">
                  <div className="modal-detail"><span>User</span><strong>{modal.data.userId?.name}</strong></div>
                  <div className="modal-detail"><span>Email</span><strong>{modal.data.userId?.email}</strong></div>
                  <div className="modal-detail"><span>Amount</span><strong className="modal-amount withdrawal">{fmt(modal.data.amount)}</strong></div>
                  <div className="modal-detail"><span>Fee</span><strong>{fmt(Math.max(modal.data.amount * 0.02, 5))}</strong></div>
                  <div className="modal-detail"><span>Total Deduction</span><strong>{fmt(modal.data.amount + Math.max(modal.data.amount * 0.02, 5))}</strong></div>
                  <div className="modal-detail"><span>Method</span><strong>{modal.data.method}</strong></div>
                  <div className="modal-detail"><span>Wallet Address</span><strong className="modal-wallet">{modal.data.walletAddress || '—'}</strong></div>
                  <div className="modal-detail"><span>Submitted</span><strong>{fmtDate(modal.data.createdAt)}</strong></div>
                </div>
                <div className="modal-actions">
                  <button
                    className="modal-btn approve"
                    onClick={() => processWithdrawal(modal.data._id, 'completed')}
                    disabled={actionLoading === modal.data._id}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    {actionLoading === modal.data._id ? ' Processing...' : ' Approve & Send'}
                  </button>
                  <button
                    className="modal-btn reject"
                    onClick={() => processWithdrawal(modal.data._id, 'failed')}
                    disabled={actionLoading === modal.data._id}
                  >
                    <FontAwesomeIcon icon={faBan} /> Reject
                  </button>
                  <button className="modal-btn cancel" onClick={() => setModal(null)}>
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Balance Adjustment Modal */}
            {modal?.type === 'adjust' && (
              <>
                <h2 className="modal-title">Adjust Balance</h2>
                <div className="modal-detail-grid">
                  <div className="modal-detail"><span>User</span><strong>{modal.data.name}</strong></div>
                  <div className="modal-detail"><span>Email</span><strong>{modal.data.email}</strong></div>
                  <div className="modal-detail"><span>Current Total</span><strong className="modal-amount deposit">{fmt(modal.data.totalBalance)}</strong></div>
                  <div className="modal-detail"><span>Available</span><strong className="modal-amount deposit">{fmt(modal.data.availableBalance)}</strong></div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'1.5rem'}}>
                  <div className="form-group" style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                    <label style={{fontSize:'0.8rem',color:'var(--admin-muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>Type</label>
                    <select
                      value={adjustForm.type}
                      onChange={e => setAdjustForm(f => ({...f, type: e.target.value}))}
                      style={{background:'var(--admin-surface2)',border:'1px solid var(--admin-border)',color:'var(--admin-text)',padding:'0.75rem',borderRadius:'8px',fontFamily:'DM Sans,sans-serif',fontSize:'0.9rem'}}
                    >
                      <option value="credit">Credit (Add funds)</option>
                      <option value="debit">Debit (Remove funds)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                    <label style={{fontSize:'0.8rem',color:'var(--admin-muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>Amount ($)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="0.01"
                      value={adjustForm.amount}
                      onChange={e => setAdjustForm(f => ({...f, amount: e.target.value}))}
                      style={{background:'var(--admin-surface2)',border:'1px solid var(--admin-border)',color:'var(--admin-text)',padding:'0.75rem',borderRadius:'8px',fontFamily:'DM Sans,sans-serif',fontSize:'0.9rem'}}
                    />
                  </div>
                  <div className="form-group" style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                    <label style={{fontSize:'0.8rem',color:'var(--admin-muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>Note (optional)</label>
                    <input
                      type="text"
                      placeholder="Reason for adjustment..."
                      value={adjustForm.note}
                      onChange={e => setAdjustForm(f => ({...f, note: e.target.value}))}
                      style={{background:'var(--admin-surface2)',border:'1px solid var(--admin-border)',color:'var(--admin-text)',padding:'0.75rem',borderRadius:'8px',fontFamily:'DM Sans,sans-serif',fontSize:'0.9rem'}}
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    className={`modal-btn ${adjustForm.type === 'credit' ? 'approve' : 'reject'}`}
                    onClick={() => adjustBalance(modal.data._id)}
                    disabled={actionLoading === modal.data._id}
                  >
                    {actionLoading === modal.data._id ? 'Processing...' : adjustForm.type === 'credit' ? '+ Credit Balance' : '- Debit Balance'}
                  </button>
                  <button className="modal-btn cancel" onClick={() => setModal(null)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;