import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faCartShopping, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        {/* Company Logo */}
        <div className="navbar-logo">
          <span className="company-name">Wallstreet</span>
        </div>

        {/* Hamburger Menu Button */}
        <button className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#home" className="navbar-link" onClick={toggleMenu}>Home</a>
          </li>
          <li className="navbar-item">
            <a href="#about" className="navbar-link" onClick={toggleMenu}>Invest</a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link" onClick={toggleMenu}>Contact</a>
          </li>
          <li className="navbar-item">
            <a href="#faq" className="navbar-link" onClick={toggleMenu}>FAQ</a>
          </li>
          <li className="navbar-item">
            <a href="#login" className="navbar-link" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUser} />Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar