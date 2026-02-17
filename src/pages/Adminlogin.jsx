import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faEnvelope, faLock, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(form.email, form.password);

      if (!result.success) {
        setError(result.message || 'Invalid credentials');
        return;
      }

      // ✅ Only allow admin / super_admin through
      const role = result.user?.role;
      if (role !== 'admin' && role !== 'super_admin') {
        setError('Access denied. Admin privileges required.');
        return;
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <FontAwesomeIcon icon={faUserShield} style={styles.shieldIcon} />
          </div>
          <h1 style={styles.title}>Admin Portal</h1>
          <p style={styles.subtitle}>Restricted access — authorised personnel only</p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Email */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email address</label>
            <div style={styles.inputWrap}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.inputIcon} />
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={styles.input}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                style={{ ...styles.input, paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={styles.eyeBtn}
                tabIndex={-1}
              >
                <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading
              ? <><FontAwesomeIcon icon={faSpinner} spin /> &nbsp;Signing in…</>
              : 'Sign In to Admin Panel'
            }
          </button>

        </form>

        <p style={styles.footer}>
          Not an admin?&nbsp;
          <span
            style={styles.backLink}
            onClick={() => navigate('/login')}
          >
            Return to user login
          </span>
        </p>
      </div>
    </div>
  );
};

/* ── Inline styles (mirrors AdminDashboard dark theme) ──────────────────── */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0d0f14',
    fontFamily: "'DM Sans', sans-serif",
    padding: '1rem',
  },
  card: {
    background: '#161a22',
    border: '1px solid #2a2f3d',
    borderRadius: '18px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  iconWrap: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'rgba(212,175,55,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  shieldIcon: {
    fontSize: '1.8rem',
    color: '#D4AF37',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#e8eaf0',
    margin: '0 0 0.375rem',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: 0,
  },
  errorBox: {
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#ef4444',
    borderRadius: '10px',
    padding: '0.875rem 1rem',
    fontSize: '0.875rem',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.8rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 500,
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    color: '#6b7280',
    fontSize: '0.875rem',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    background: '#1e2330',
    border: '1px solid #2a2f3d',
    borderRadius: '10px',
    padding: '0.875rem 1rem 0.875rem 2.75rem',
    color: '#e8eaf0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    padding: 0,
    fontSize: '0.9rem',
  },
  submitBtn: {
    marginTop: '0.5rem',
    padding: '0.9rem',
    background: '#D4AF37',
    color: '#0d0f14',
    border: 'none',
    borderRadius: '10px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'opacity 0.2s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  backLink: {
    color: '#D4AF37',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default AdminLogin;