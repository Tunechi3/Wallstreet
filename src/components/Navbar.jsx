import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        {/* Company Logo */}
        <div className="navbar-logo">
          <Link to="/" className="company-name" onClick={closeMenu}>
            Wallstreet
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/invest" className="navbar-link" onClick={closeMenu}>
              Invest
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/faq" className="navbar-link" onClick={closeMenu}>
              FAQ
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link" onClick={closeMenu}>
              <FontAwesomeIcon icon={faUser} />Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar