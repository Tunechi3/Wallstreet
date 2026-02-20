import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Aboutpage.css'
import Navbar from '../components/Navbar';

// ── Animated counter hook ────────────────────────────────────────────────────
const useCounter = (target, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const isFloat = target.toString().includes('.');
    const numTarget = parseFloat(target.toString().replace(/[^0-9.]/g, ''));
    const increment = numTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);

  return count;
};

// ── Intersection observer hook ───────────────────────────────────────────────
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// ── Stat Counter Component ───────────────────────────────────────────────────
const StatCounter = ({ value, suffix, prefix, label, description, icon }) => {
  const [ref, inView] = useInView(0.3);
  const numVal = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
  const count = useCounter(numVal, 2200, inView);

  const display = () => {
    if (value === '220K+') return inView ? `${Math.floor(count)}K+` : '0K+';
    if (value === '$24.8M+') return inView ? `$${count.toFixed(1)}M+` : '$0M+';
    if (value === '18,542') return inView ? count.toLocaleString() : '0';
    if (value === '1.2M+') return inView ? `${count.toFixed(1)}M+` : '0M+';
    if (value === '99.8%') return inView ? `${count.toFixed(1)}%` : '0%';
    return inView ? count : 0;
  };

  return (
    <div className="ap-stat-item" ref={ref}>
      <div className="ap-stat-icon">{icon}</div>
      <div className="ap-stat-content">
        <div className={`ap-stat-number ${inView ? 'counted' : ''}`}>{display()}</div>
        <div className="ap-stat-label">{label}</div>
        <div className="ap-stat-desc">{description}</div>
      </div>
    </div>
  );
};

// ── Team members ─────────────────────────────────────────────────────────────
const TEAM = [
  {
    initials: 'JK',
    name: 'James Keller',
    role: 'Chief Executive Officer',
    bio: 'Former Goldman Sachs derivatives trader with 18 years in quantitative finance and algorithmic strategy development.',
    gradient: 'linear-gradient(135deg, #555a69 0%, #7f88a7 100%)',
  },
  {
    initials: 'SA',
    name: 'Sofia Andreou',
    role: 'Chief Investment Officer',
    bio: 'Ex-BlackRock portfolio manager specializing in multi-asset volatility strategies and risk-adjusted return optimization.',
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #F5C66D 100%)',
  },
  {
    initials: 'ML',
    name: 'Marcus Liang',
    role: 'Head of Quantitative Research',
    bio: 'PhD in Computational Finance from MIT. Built proprietary ML models that power our market prediction engine.',
    gradient: 'linear-gradient(135deg, #3d4f63 0%, #555a69 100%)',
  },
  {
    initials: 'RO',
    name: 'Rachel Okonkwo',
    role: 'Chief Technology Officer',
    bio: 'Former fintech architect at Stripe with expertise in high-frequency trading infrastructure and distributed systems.',
    gradient: 'linear-gradient(135deg, #7f88a7 0%, #D4AF37 100%)',
  },
];

// ── Timeline milestones ──────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2018', title: 'Company Founded', desc: 'Wallstreet Trade was established by a team of ex-institutional traders with a shared vision: make professional-grade investment strategies accessible to everyone.' },
  { year: '2019', title: 'First 1,000 Investors', desc: 'Reached our first milestone of 1,000 active investors within just 8 months. Processed over $2M in successful payouts.' },
  { year: '2021', title: 'Platform Expansion', desc: 'Launched our proprietary trading algorithm suite and expanded to cover 12 global markets. Total payouts crossed $5M.' },
  { year: '2022', title: 'Security Overhaul', desc: 'Achieved PCI DSS compliance and implemented military-grade 256-bit encryption across all systems and transactions.' },
  { year: '2023', title: '100K+ Community', desc: 'Surpassed 100,000 registered members. Launched our referral program and introduced tiered investment plans.' },
  { year: '2024', title: 'Global Recognition', desc: 'Recognized as one of the fastest-growing prop trading platforms. Total payouts exceeded $20M with 99.8% on-time delivery.' },
];

// ── Values ───────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Radical Transparency',
    desc: 'Every trade, every return, every fee — fully visible. We believe investors deserve complete insight into how their capital works.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Capital Protection First',
    desc: 'Risk management isn\'t an afterthought — it\'s the foundation. Every strategy is built around preserving your principal.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Performance-Driven',
    desc: 'Our team only wins when you win. Compensation is directly tied to investor returns, aligning our incentives perfectly.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Community-Centered',
    desc: 'We\'re building more than a platform — we\'re building a community of informed investors who grow together.',
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Who is Wallstreet Trade?',
    a: 'Wallstreet Trade is a modern structured investment platform founded in 2018 by a team of institutional traders and quantitative analysts. We specialize in professionally managed trading plans that deliver structured daily returns. Our platform has served over 220,000 investors globally with more than $24.8M in distributed payouts.',
  },
  {
    q: 'How are returns generated?',
    a: 'Returns are generated through our proprietary multi-strategy trading system that operates across forex, commodities, crypto derivatives, and global equity indices. Our quant team executes disciplined, backtested strategies designed to capture consistent market opportunities while maintaining strict risk parameters. Daily profits are calculated, credited to member accounts, and can be tracked in real-time via the dashboard.',
  },
  {
    q: 'Is my investment secure?',
    a: 'Security is our highest priority. All funds are held in segregated accounts with tier-1 financial institutions. We employ 256-bit military-grade encryption, PCI DSS compliance, multi-layer authentication, and 24/7 infrastructure monitoring. Regular third-party security audits ensure our systems meet international financial standards.',
  },
  {
    q: 'What makes Wallstreet Trade different?',
    a: 'Unlike passive investment products, we provide fully managed, structured plans with defined return rates and durations. Our team actively manages capital across multiple markets, not a single asset class. Combined with bank-grade security, transparent reporting, fast withdrawals, and a 10% referral program, we offer a complete investment ecosystem — not just a product.',
  },
  {
    q: 'How do I get started?',
    a: 'Create a free account, complete verification, choose an investment plan that matches your goals (starting from $100), fund your account via cryptocurrency, and let our team go to work. Your dashboard shows real-time tracking of returns, transaction history, and portfolio performance from day one.',
  },
];

// ── Main Component ────────────────────────────────────────────────────────────
const Aboutpage = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  const [statsRef, statsInView] = useInView(0.2);
  const [missionRef, missionInView] = useInView(0.2);
  const [valuesRef, valuesInView] = useInView(0.15);
  const [teamRef, teamInView] = useInView(0.15);
  const [timelineRef, timelineInView] = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i);

  return (
    <>
    <Navbar/>
    <div className="ap-root">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="ap-hero">
        <div className="ap-hero-bg">
          <div className="ap-hero-grid" />
          <div className="ap-hero-orb ap-orb-1" />
          <div className="ap-hero-orb ap-orb-2" />
          <div className="ap-hero-orb ap-orb-3" />
        </div>
        <div className={`ap-hero-content ${heroVisible ? 'ap-visible' : ''}`}>
          <div className="ap-hero-pill">
            <span className="ap-pill-dot" />
            <span>EST. 2018 · GLOBAL INVESTMENT PLATFORM</span>
          </div>
          <h1 className="ap-hero-title">
            We Are <em>Wallstreet</em><br />Trade
          </h1>
          <p className="ap-hero-subtitle">
            A team of ex-institutional traders, quantitative analysts, and fintech engineers
            united by a single mission — delivering professional-grade investment returns
            to every investor, everywhere.
          </p>
          <div className="ap-hero-actions">
            <button className="ap-btn-primary" onClick={() => navigate('/signup')}>
              Start Investing
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button className="ap-btn-outline" onClick={() => navigate('/login')}>
              View Dashboard
            </button>
          </div>
          <div className="ap-hero-strip">
            {[
              { val: '220K+', lab: 'Investors' },
              { val: '$24.8M+', lab: 'Paid Out' },
              { val: '99.8%', lab: 'On-Time' },
              { val: '6+', lab: 'Years Active' },
            ].map((s) => (
              <div className="ap-hero-strip-item" key={s.lab}>
                <span className="ap-strip-val">{s.val}</span>
                <span className="ap-strip-lab">{s.lab}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────────────────────── */}
      <section className="ap-mission">
        <div className="ap-container">
          <div className={`ap-mission-inner ${missionInView ? 'ap-animate-in' : ''}`} ref={missionRef}>
            <div className="ap-mission-media">
              <div className="ap-mission-video-wrap">
                <video
                  className="ap-mission-video"
                  autoPlay loop muted playsInline
                >
                  <source src="/images/man-working-with-stock-charts-minimalist-office.webm" type="video/webm" />
                </video>
                <div className="ap-mission-video-overlay" />
                <div className="ap-mission-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  <span>Live Trading Desk</span>
                </div>
              </div>
            </div>
            <div className="ap-mission-copy">
              <span className="ap-section-label">OUR MISSION</span>
              <h2 className="ap-section-title">
                Professional trading<br />made accessible
              </h2>
              <p className="ap-mission-text">
                For decades, the best investment strategies were locked behind institutional
                walls — available only to hedge funds, banks, and ultra-high-net-worth individuals.
                We built Wallstreet Trade to change that.
              </p>
              <p className="ap-mission-text">
                Our platform gives every investor access to the same sophisticated,
                multi-market trading strategies used by the world's top financial institutions —
                structured into clear plans with defined returns, transparent reporting,
                and bank-grade security.
              </p>
              <div className="ap-mission-highlights">
                {[
                  'Professionally managed by ex-institutional traders',
                  'Multi-strategy approach across 12 global markets',
                  'Transparent real-time performance reporting',
                  'PCI DSS compliant · 256-bit encrypted infrastructure',
                ].map((h, i) => (
                  <div className="ap-highlight-item" key={i}>
                    <div className="ap-highlight-check">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <section className="ap-stats">
        <div className="ap-stats-bg" />
        <div className="ap-container">
          <div className="ap-stats-header">
            <span className="ap-section-label ap-label-light">PLATFORM METRICS</span>
            <h2 className="ap-section-title ap-title-light">Numbers that speak for themselves</h2>
          </div>
          <div className="ap-stats-grid" ref={statsRef}>
            <StatCounter
              value="220K+"
              label="Registered Investors"
              description="From 60+ countries worldwide"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            />
            <div className="ap-stat-divider" />
            <StatCounter
              value="$24.8M+"
              label="Total Distributed"
              description="Paid to investors since 2018"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
            />
            <div className="ap-stat-divider" />
            <StatCounter
              value="99.8%"
              label="On-Time Payouts"
              description="Consistent delivery since launch"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>}
            />
            <div className="ap-stat-divider" />
            <StatCounter
              value="1.2M+"
              label="Total Transactions"
              description="Processed without a single breach"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────────────── */}
      <section className="ap-values">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-section-label">WHAT WE STAND FOR</span>
            <h2 className="ap-section-title">Our core values</h2>
            <p className="ap-section-subtitle">
              These aren't aspirational statements — they're the operating principles
              behind every decision we make.
            </p>
          </div>
          <div className="ap-values-grid" ref={valuesRef}>
            {VALUES.map((v, i) => (
              <div
                className={`ap-value-card ${valuesInView ? 'ap-card-animate' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
                key={i}
              >
                <div className="ap-value-icon">{v.icon}</div>
                <h3 className="ap-value-title">{v.title}</h3>
                <p className="ap-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <section className="ap-timeline-section">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-section-label">OUR JOURNEY</span>
            <h2 className="ap-section-title">Six years of growth</h2>
            <p className="ap-section-subtitle">
              From a small trading desk to a global platform trusted by hundreds of thousands.
            </p>
          </div>
          <div className="ap-timeline" ref={timelineRef}>
            <div className="ap-timeline-line" />
            {TIMELINE.map((item, i) => (
              <div
                className={`ap-timeline-item ${i % 2 === 0 ? 'ap-tl-left' : 'ap-tl-right'} ${timelineInView ? 'ap-tl-animate' : ''} ${activeTimeline === i ? 'ap-tl-active' : ''}`}
                style={{ animationDelay: `${i * 0.15}s` }}
                key={i}
                onClick={() => setActiveTimeline(i)}
              >
                <div className="ap-tl-connector">
                  <div className="ap-tl-dot">
                    <div className="ap-tl-dot-inner" />
                  </div>
                </div>
                <div className="ap-tl-card">
                  <span className="ap-tl-year">{item.year}</span>
                  <h4 className="ap-tl-title">{item.title}</h4>
                  <p className="ap-tl-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────────────── */}
      <section className="ap-team">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-section-label">THE PEOPLE</span>
            <h2 className="ap-section-title">Leadership team</h2>
            <p className="ap-section-subtitle">
              Decades of combined experience from the world's top financial institutions,
              now working to democratize professional trading.
            </p>
          </div>
          <div className="ap-team-grid" ref={teamRef}>
            {TEAM.map((member, i) => (
              <div
                className={`ap-team-card ${teamInView ? 'ap-card-animate' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
                key={i}
              >
                <div className="ap-team-avatar" style={{ background: member.gradient }}>
                  <span>{member.initials}</span>
                </div>
                <div className="ap-team-info">
                  <h4 className="ap-team-name">{member.name}</h4>
                  <p className="ap-team-role">{member.role}</p>
                  <p className="ap-team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="ap-how">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-section-label">THE PROCESS</span>
            <h2 className="ap-section-title">Simple. Structured. Profitable.</h2>
            <p className="ap-section-subtitle">
              Three steps stand between you and professionally managed investment returns.
            </p>
          </div>
          <div className="ap-how-steps">
            {[
              {
                num: '01',
                title: 'Choose Your Plan',
                desc: 'Select from our range of structured investment plans — from 24-hour daily cycles to 3-week elite programs. Each plan has clear return rates, durations, and minimum amounts.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
              },
              {
                num: '02',
                title: 'Fund & Activate',
                desc: 'Deposit via Bitcoin, Ethereum, USDT, Solana, or other supported cryptocurrencies. Your plan activates instantly upon confirmation and our team begins managing your capital.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
              },
              {
                num: '03',
                title: 'Earn & Withdraw',
                desc: 'Watch returns accumulate in real-time on your dashboard. When your cycle completes, withdraw earnings to your crypto wallet within 24–48 hours — no hidden fees.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
              },
            ].map((step, i) => (
              <div className="ap-how-step" key={i}>
                <div className="ap-how-step-num">{step.num}</div>
                <div className="ap-how-icon-wrap">{step.icon}</div>
                <h3 className="ap-how-title">{step.title}</h3>
                <p className="ap-how-desc">{step.desc}</p>
                {i < 2 && <div className="ap-how-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security ───────────────────────────────────────────────────────── */}
      <section className="ap-security">
        <div className="ap-security-bg" />
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-section-label ap-label-light">SECURITY & COMPLIANCE</span>
            <h2 className="ap-section-title ap-title-light">Your capital is protected</h2>
            <p className="ap-section-subtitle ap-subtitle-light">
              We don't cut corners on security. Ever.
            </p>
          </div>
          <div className="ap-security-grid">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
                title: '256-bit Encryption',
                desc: 'Military-grade AES-256 encryption on all data in transit and at rest. The same standard used by global defense agencies.',
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
                title: 'Segregated Funds',
                desc: 'All investor capital is held in segregated accounts at tier-1 financial institutions — completely separate from operational funds.',
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: '24/7 Monitoring',
                desc: 'Round-the-clock infrastructure monitoring with automated threat detection and instant incident response protocols.',
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
                title: 'Regular Audits',
                desc: 'Quarterly third-party security and compliance audits. We publish results because we have nothing to hide.',
              },
            ].map((card, i) => (
              <div className="ap-security-card" key={i}>
                <div className="ap-security-icon">{card.icon}</div>
                <h3 className="ap-security-title">{card.title}</h3>
                <p className="ap-security-desc">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="ap-security-badges">
            {['SSL Secured', 'PCI Compliant', 'GDPR Ready', 'Regular Audits'].map((b) => (
              <div className="ap-sec-badge" key={b}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="ap-testimonials">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-section-label">INVESTOR STORIES</span>
            <h2 className="ap-section-title">What our community says</h2>
          </div>
          <div className="ap-testimonials-grid">
            {[
              {
                text: 'I\'ve been with Wallstreet Trade for two years. The consistency of returns is what keeps me here — week after week, it delivers exactly what it promises. The transparency is unmatched.',
                name: 'Mommy Dayo',
                detail: 'Investor since 2023 · Standard Plan',
                initials: 'MD',
                highlight: true,
              },
              {
                text: 'As a former skeptic of online investment platforms, what won me over was their security documentation and third-party audit reports. Once I saw that, I was in. Haven\'t looked back.',
                name: 'Daddy Dayo',
                detail: 'Pro Plan Member · 18 months',
                initials: 'DD',
              },
              {
                text: 'The expert team really knows what they\'re doing. My portfolio has grown steadily and the detailed activity logs on the dashboard let me see exactly what\'s happening with my money.',
                name: 'Adekunle Gold',
                detail: 'Standard Plan Member · 2 years',
                initials: 'AG',
              },
            ].map((t, i) => (
              <div className={`ap-testimonial-card ${t.highlight ? 'ap-testimonial-featured' : ''}`} key={i}>
                <div className="ap-testimonial-quote">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>
                <p className="ap-testimonial-text">{t.text}</p>
                <div className="ap-testimonial-author">
                  <div className="ap-author-avatar"><span>{t.initials}</span></div>
                  <div>
                    <p className="ap-author-name">{t.name}</p>
                    <p className="ap-author-detail">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="ap-faq">
        <div className="ap-container ap-container-narrow">
          <div className="ap-section-header">
            <span className="ap-section-label">COMMON QUESTIONS</span>
            <h2 className="ap-section-title">Everything you need to know</h2>
            <p className="ap-section-subtitle">
              Still have questions? Our support team is available around the clock.
            </p>
          </div>
          <div className="ap-faq-list">
            {FAQS.map((faq, i) => (
              <div className={`ap-faq-item ${activeFaq === i ? 'ap-faq-open' : ''}`} key={i}>
                <button className="ap-faq-question" onClick={() => toggleFaq(i)}>
                  <span>{faq.q}</span>
                  <div className="ap-faq-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </button>
                <div className="ap-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="ap-cta">
        <div className="ap-cta-bg">
          <div className="ap-cta-orb ap-cta-orb-1" />
          <div className="ap-cta-orb ap-cta-orb-2" />
        </div>
        <div className="ap-container">
          <div className="ap-cta-content">
            <h2 className="ap-cta-title">
              Ready to grow your<br />wealth with us?
            </h2>
            <p className="ap-cta-subtitle">
              Join over 220,000 investors already earning structured daily returns.
              Open your account in minutes — no experience required.
            </p>
            <div className="ap-cta-actions">
              <button className="ap-btn-cta-primary" onClick={() => navigate('/signup')}>
                Create Free Account
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
              <button className="ap-btn-cta-outline" onClick={() => navigate('/login')}>
                Sign In to Dashboard
              </button>
            </div>
            <p className="ap-cta-note">No account fees · Plans from $100 · Withdraw anytime</p>
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default Aboutpage;