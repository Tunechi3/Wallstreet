import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────── */
/* SCOPED STYLES — works in any React app, zero Tailwind dependency            */
/* ─────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@600&display=swap');

  :root {
    --wst-gold:      #D4AF37;
    --wst-gold-lt:   #F0CD6A;
    --wst-gold-dim:  rgba(212,175,55,0.13);
    --wst-dark:      #111620;
    --wst-mid:       #1c2233;
    --wst-border:    rgba(255,255,255,0.08);
    --wst-text:      rgba(255,255,255,0.88);
    --wst-muted:     rgba(255,255,255,0.44);
    --wst-faint:     rgba(255,255,255,0.22);
    --wst-radius:    10px;
  }

  /* Base */
  .wst-footer {
    background: linear-gradient(180deg, #1c2233 0%, #111620 100%);
    font-family: 'DM Sans', sans-serif;
    color: var(--wst-text);
    position: relative;
    overflow: hidden;
  }
  .wst-footer *, .wst-footer *::before, .wst-footer *::after { box-sizing: border-box; }

  /* Grain texture */
  .wst-footer::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    background-size: 200px;
    pointer-events: none;
    opacity: 0.35;
    z-index: 0;
  }
  .wst-footer > * { position: relative; z-index: 1; }

  /* ── Newsletter ─────────────────────────────────────────── */
  .wst-nl {
    border-bottom: 1px solid var(--wst-border);
  }
  .wst-wrap {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .wst-nl-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1.75rem 0;
    flex-wrap: wrap;
  }
  .wst-nl-copy h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 .2rem;
    letter-spacing: .2px;
  }
  .wst-nl-copy p {
    font-size: .82rem;
    color: var(--wst-muted);
    margin: 0;
    font-weight: 300;
  }
  .wst-nl-form { display: flex; gap: .55rem; flex-wrap: wrap; }
  .wst-nl-input {
    padding: .65rem 1rem;
    border-radius: var(--wst-radius);
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.055);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: .83rem;
    width: 250px;
    outline: none;
    transition: border-color .2s, background .2s;
  }
  .wst-nl-input::placeholder { color: var(--wst-muted); }
  .wst-nl-input:focus { border-color: rgba(212,175,55,.5); background: rgba(255,255,255,0.08); }
  .wst-nl-btn {
    padding: .65rem 1.35rem;
    border-radius: var(--wst-radius);
    border: none;
    background: linear-gradient(135deg, var(--wst-gold) 0%, var(--wst-gold-lt) 100%);
    color: #1a1000;
    font-family: 'DM Sans', sans-serif;
    font-size: .83rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity .2s, transform .2s;
  }
  .wst-nl-btn:hover { opacity: .88; transform: translateY(-1px); }
  .wst-nl-success {
    display: flex; align-items: center; gap: .55rem;
    font-size: .83rem; color: var(--wst-gold); font-weight: 500;
  }
  .wst-nl-err { font-size: .73rem; color: #f87171; margin-top: .3rem; }

  /* ── Main 4-column grid ────────────────────────────────── */
  .wst-body {
    display: grid;
    grid-template-columns: 2.2fr 1fr 1fr 1fr;
    gap: 3rem;
    padding: 3rem 2rem 2.5rem;
    max-width: 1160px;
    margin: 0 auto;
  }

  /* Brand column */
  .wst-logo-row {
    display: flex; align-items: center; gap: .6rem;
    margin-bottom: .9rem; cursor: pointer; width: fit-content;
  }
  .wst-logo-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: var(--wst-gold-dim);
    border: 1px solid rgba(212,175,55,.22);
    display: flex; align-items: center; justify-content: center;
    color: var(--wst-gold);
    transition: background .2s;
  }
  .wst-logo-row:hover .wst-logo-icon { background: rgba(212,175,55,.2); }
  .wst-logo-text {
    font-size: 1.1rem; font-weight: 600; color: #fff; letter-spacing: -.2px;
  }
  .wst-logo-text em { color: var(--wst-gold); font-style: normal; }

  .wst-tagline {
    font-size: .81rem; font-weight: 300; color: var(--wst-muted);
    line-height: 1.7; margin: 0 0 1.3rem; max-width: 290px;
  }

  /* Contact list */
  .wst-contact { list-style: none; padding: 0; margin: 0 0 1.4rem; }
  .wst-contact li {
    display: flex; align-items: flex-start; gap: .5rem;
    font-size: .8rem; color: var(--wst-muted); font-weight: 300;
    line-height: 1.55; margin-bottom: .6rem;
  }
  .wst-contact li:last-child { margin-bottom: 0; }
  .wst-contact li svg { color: var(--wst-gold); flex-shrink: 0; margin-top: 2px; }
  .wst-contact a { color: inherit; text-decoration: none; transition: color .2s; }
  .wst-contact a:hover { color: var(--wst-gold); }

  /* Social icons */
  .wst-social { display: flex; gap: .45rem; flex-wrap: wrap; }
  .wst-soc {
    width: 32px; height: 32px;
    border-radius: 7px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    display: flex; align-items: center; justify-content: center;
    color: var(--wst-muted);
    text-decoration: none;
    transition: all .2s;
  }
  .wst-soc:hover {
    background: var(--wst-gold-dim);
    border-color: rgba(212,175,55,.28);
    color: var(--wst-gold);
    transform: translateY(-2px);
  }

  /* Link columns */
  .wst-col-title {
    font-size: .67rem; font-weight: 600;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--wst-gold); margin: 0 0 1rem;
  }
  .wst-links { list-style: none; padding: 0; margin: 0; }
  .wst-links li { margin-bottom: .48rem; }
  .wst-links li:last-child { margin-bottom: 0; }
  .wst-link-btn {
    background: none; border: none; padding: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: .81rem; font-weight: 300;
    color: var(--wst-muted);
    cursor: pointer;
    display: flex; align-items: center; gap: .3rem;
    transition: color .2s, gap .18s;
    text-align: left; line-height: 1.4;
  }
  .wst-link-btn:hover { color: #fff; gap: .5rem; }
  .wst-arr { opacity: 0; color: var(--wst-gold); flex-shrink: 0; transition: opacity .18s; }
  .wst-link-btn:hover .wst-arr { opacity: 1; }

  /* ── Divider ─────────────────────────────────────────────── */
  .wst-hr {
    border: none;
    border-top: 1px solid var(--wst-border);
    margin: 0;
  }

  /* ── Trust bar ───────────────────────────────────────────── */
  .wst-trust {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
    padding: .9rem 2rem;
    max-width: 1160px;
    margin: 0 auto;
  }
  .wst-badges { display: flex; gap: .45rem; flex-wrap: wrap; }
  .wst-badge {
    display: flex; align-items: center; gap: .38rem;
    padding: .3rem .8rem;
    border-radius: 50px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    font-size: .7rem; font-weight: 500;
    color: var(--wst-faint);
  }
  .wst-badge svg { color: var(--wst-gold); }
  .wst-status {
    display: flex; align-items: center; gap: .45rem;
    font-size: .73rem; color: var(--wst-faint); font-weight: 300;
  }
  .wst-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #4ade80;
    animation: wst-pulse 2.2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes wst-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .5; transform: scale(.75); }
  }

  /* ── Disclaimer ──────────────────────────────────────────── */
  .wst-disc {
    font-size: .72rem; font-weight: 300;
    color: var(--wst-faint);
    line-height: 1.75; text-align: center;
    padding: .85rem 2rem;
    max-width: 1160px;
    margin: 0 auto;
  }
  .wst-disc strong { color: rgba(255,255,255,.32); font-weight: 500; }
  .wst-disc-btn {
    background: none; border: none; cursor: pointer;
    color: inherit; font-size: inherit; font-family: inherit;
    text-decoration: underline; text-underline-offset: 2px;
    padding: 0; transition: color .2s;
  }
  .wst-disc-btn:hover { color: rgba(255,255,255,.5); }

  /* ── Bottom bar ──────────────────────────────────────────── */
  .wst-bottom { background: rgba(0,0,0,.22); border-top: 1px solid var(--wst-border); }
  .wst-bottom-inner {
    max-width: 1160px; margin: 0 auto;
    padding: .9rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: .65rem;
  }
  .wst-copy { font-size: .73rem; color: var(--wst-faint); font-weight: 300; }
  .wst-bot-links { display: flex; align-items: center; gap: .75rem; }
  .wst-bot-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: .73rem; font-weight: 300;
    color: var(--wst-faint);
    padding: 0; transition: color .2s;
  }
  .wst-bot-btn:hover { color: rgba(255,255,255,.6); }
  .wst-sep { color: rgba(255,255,255,.14); font-size: .7rem; }

  /* ── Responsive ──────────────────────────────────────────── */
  @media (max-width: 920px) {
    .wst-body { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .wst-brand { grid-column: 1 / -1; }
    .wst-tagline { max-width: 100%; }
  }
  @media (max-width: 580px) {
    .wst-wrap, .wst-body, .wst-trust, .wst-disc, .wst-bottom-inner {
      padding-left: 1.25rem; padding-right: 1.25rem;
    }
    .wst-body { grid-template-columns: 1fr; gap: 1.75rem; }
    .wst-brand { grid-column: auto; }
    .wst-nl-inner { flex-direction: column; align-items: flex-start; padding: 1.5rem 0; }
    .wst-nl-form { flex-direction: column; width: 100%; }
    .wst-nl-input { width: 100%; }
    .wst-nl-btn { width: 100%; }
    .wst-trust { flex-direction: column; align-items: flex-start; padding-left: 1.25rem; padding-right: 1.25rem; }
    .wst-bottom-inner { flex-direction: column; align-items: flex-start; }
  }
`;

/* ─── Icon set ───────────────────────────────────────────────────────────── */
const I = {
  Chart:  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Pin:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Mail:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Phone:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Clock:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Shield: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  Arrow:  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Check:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  FB:     <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  IG:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  TG:     <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247-2.04 9.608c-.15.67-.543.836-1.098.52l-3.038-2.238-1.465 1.41c-.162.162-.297.297-.608.297l.216-3.09 5.618-5.074c.244-.216-.054-.337-.378-.12L6.37 14.33l-2.99-.936c-.65-.203-.663-.65.135-.963l11.67-4.5c.54-.194 1.014.13.377.316z"/></svg>,
  WA:     <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  LI:     <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
};

/* ─── Static data ────────────────────────────────────────────────────────── */
const PLATFORM = [
  ["Dashboard",           "/dashboard/overview"],
  ["Investment Plans",    "/dashboard/investments"],
  ["Deposit Funds",       "/dashboard/deposit"],
  ["Withdraw",            "/dashboard/withdraw"],
  ["Transaction History", "/dashboard/transactions"],
  ["Referral Program",    "/dashboard/referral"],
];
const COMPANY = [
  ["About Us",     "/about"],
  ["How It Works", "/how-it-works"],
  ["Security",     "/security"],
  ["Blog",         "/blog"],
  ["Careers",      "/career"],
  ["Contact Us",   "/contact"],
];
const LEGAL = [
  ["Terms of Service", "/terms"],
  ["Privacy Policy",   "/privacy"],
  ["Cookie Policy",    "/cookies"],
  ["Risk Disclosure",  "/risk-disclosure"],
  ["AML Policy",       "/aml"],
  ["Refund Policy",    "/refund"],
];
const SOCIALS = [
  [I.X,  "X / Twitter", "https://x.com/wallstreettrade"],
  [I.FB, "Facebook",    "https://facebook.com/wallstreettrade"],
  [I.IG, "Instagram",   "https://instagram.com/wallstreettrade"],
  [I.TG, "Telegram",    "https://t.me/wallstreettrade"],
  [I.WA, "WhatsApp",    "https://wa.me/12122699779"],
  [I.LI, "LinkedIn",    "https://linkedin.com/company/wallstreettrade"],
];
const BADGES = ["SSL Secured", "PCI Compliant", "GDPR Ready", "Audited"];

/* ─── Sub-components ─────────────────────────────────────────────────────── */
const LinkCol = ({ title, items, navigate }) => (
  <div>
    <p className="wst-col-title">{title}</p>
    <ul className="wst-links">
      {items.map(([label, path]) => (
        <li key={label}>
          <button className="wst-link-btn" onClick={() => navigate(path)}>
            <span className="wst-arr">{I.Arrow}</span>
            {label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

/* ─── Footer ─────────────────────────────────────────────────────────────── */
const Footer = () => {
  const navigate = useNavigate();
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [err,        setErr]        = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    setErr(""); setSubscribed(true); setEmail("");
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer className="wst-footer">

        {/* ── Newsletter ─────────────────────────────────────── */}
        <div className="wst-nl">
          <div className="wst-wrap">
            <div className="wst-nl-inner">
              <div className="wst-nl-copy">
                <h3>Stay ahead of the markets</h3>
                <p>Weekly insights, plan updates &amp; investment tips — in your inbox.</p>
              </div>

              {subscribed ? (
                <div className="wst-nl-success">
                  {I.Check} You're in — welcome to the inner circle!
                </div>
              ) : (
                <form className="wst-nl-form" onSubmit={subscribe}>
                  <div>
                    <input
                      className="wst-nl-input"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErr(""); }}
                    />
                    {err && <p className="wst-nl-err">{err}</p>}
                  </div>
                  <button className="wst-nl-btn" type="submit">Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Main grid ──────────────────────────────────────── */}
        <div className="wst-body">

          {/* Brand column */}
          <div className="wst-brand">
            <div className="wst-logo-row" onClick={() => navigate("/")}>
              <div className="wst-logo-icon">{I.Chart}</div>
              <span className="wst-logo-text">Wallstreets <em>Trade</em></span>
            </div>

            <p className="wst-tagline">
              A professionally managed investment platform delivering structured returns
              since 2018. Trusted by 60,000+ investors across 60+ countries worldwide.
            </p>

            <ul className="wst-contact">
              <li>
                {I.Pin}
                <span>11 Wall Street, New York, NY 10005<br />Financial District, Lower Manhattan</span>
              </li>
              <li>
                {I.Mail}
                <a href="mailto:support@wallstreettrade.com">support@wallstreettrade.com</a>
              </li>
              {/* <li>
                {I.Phone}
                <a href="tel:+12122699779">+1 (212) 269-9779</a>
              </li> */}
              <li>
                {I.Clock}
                <span>24 / 7 Support · Always available</span>
              </li>
            </ul>

            {/* <div className="wst-social">
              {SOCIALS.map(([icon, label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   aria-label={label} className="wst-soc">
                  {icon}
                </a>
              ))}
            </div> */}
          </div>

          <LinkCol title="Platform" items={PLATFORM} navigate={navigate} />
          <LinkCol title="Company"  items={COMPANY}  navigate={navigate} />
          <LinkCol title="Legal"    items={LEGAL}    navigate={navigate} />

        </div>

        {/* ── Trust bar ──────────────────────────────────────── */}
        <hr className="wst-hr" />
        <div className="wst-trust">
          <div className="wst-badges">
            {BADGES.map(b => (
              <span className="wst-badge" key={b}>{I.Shield} {b}</span>
            ))}
          </div>
          <div className="wst-status">
            <span className="wst-dot" />
            All systems operational
          </div>
        </div>

        {/* ── Disclaimer ─────────────────────────────────────── */}
        <hr className="wst-hr" />
        {/* <p className="wst-disc">
          <strong>Risk Disclaimer: </strong>
          Investing involves risk, including possible loss of principal. Past performance is not
          indicative of future results. Wallstreet Trade does not guarantee returns. Please read
          our{" "}
          <button className="wst-disc-btn" onClick={() => navigate("/risk-disclosure")}>
            Risk Disclosure
          </button>
          {" "}before investing.
        </p> */}

        {/* ── Bottom bar ─────────────────────────────────────── */}
        <div className="wst-bottom">
          <div className="wst-bottom-inner">
            <span className="wst-copy">
              © {year} Wallstreets Trade, Inc. · 11 Wall Street, New York, NY 10005
            </span>
            <div className="wst-bot-links">
              <button className="wst-bot-btn" onClick={() => navigate("/privacy")}>Privacy</button>
              <span className="wst-sep">·</span>
              <button className="wst-bot-btn" onClick={() => navigate("/terms")}>Terms</button>
              <span className="wst-sep">·</span>
              <button className="wst-bot-btn" onClick={() => navigate("/cookies")}>Cookies</button>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;