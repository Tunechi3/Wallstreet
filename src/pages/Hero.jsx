import React from 'react'

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-icon"></span>
            <span className="badge-text">10,000+ Successful Transaction</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Invest Smarter. Grow Daily. Build Your Financial Future.
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Built for compatibility, transparency, and global financial participation.
          </p>

          {/* CTA Button */}
          <button className="hero-cta">Get Started</button>
        </div>
      </section>

      {/* Crypto Slider - Now Independent */}
      <CryptoSlider />
    </>
  )
}

const CryptoSlider = () => {
  const cryptos = [
    { name: 'VeChain', icon: '🔗' },
    { name: 'Ethereum Classic', icon: '💎' },
    { name: 'Binance USD', icon: '🔶' },
    { name: 'PancakeSwap', icon: '🥞' },
    { name: 'Terra Classic', icon: '🌙' },
    { name: 'Yearn.Finance', icon: '💲' },
    { name: 'THORChain', icon: '⚡' },
    { name: 'Bitcoin', icon: '₿' },
    { name: 'Cardano', icon: '🎯' },
    { name: 'Polkadot', icon: '🔴' },
    { name: 'Chainlink', icon: '🔗' },
    { name: 'Stellar', icon: '⭐' },
  ]

  return (
    <section className="crypto-slider">
      <div className="crypto-track">
        {/* First set of cryptos */}
        {cryptos.map((crypto, index) => (
          <div key={`crypto-1-${index}`} className="crypto-item">
            <span className="crypto-icon">{crypto.icon}</span>
            <span className="crypto-name">{crypto.name}</span>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {cryptos.map((crypto, index) => (
          <div key={`crypto-2-${index}`} className="crypto-item">
            <span className="crypto-icon">{crypto.icon}</span>
            <span className="crypto-name">{crypto.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero