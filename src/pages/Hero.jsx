import React from 'react'

const Hero = () => {
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
    <section className="hero">
      <div className="hero-container">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-icon"></span>
          <span className="badge-text">10,000+ Successful Transaction</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          Empowering the Future of Finance with ISO 20022
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          for global financial systems, fostering interoperability,
        </p>

        {/* CTA Button */}
        <button className="hero-cta">Get Started</button>
      </div>

      {/* Crypto Slider */}
      <div className="crypto-slider">
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
      </div>
    </section>
  )
}

export default Hero