import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faBars, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  // Get first name only
  const getFirstName = () => {
    if (!user || !user.name) return '';
    return user.name.split(' ')[0];
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
          {isAuthenticated && user ? (
            <>
              {/* Contact */}
              <li className="navbar-item">
                <Link to="/contact" className="navbar-link" onClick={closeMenu}>
                  Contact
                </Link>
              </li>

              {/* Dashboard */}
              <li className="navbar-item">
                <Link to="/dashboard/overview" className="navbar-link" onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>

              {/* User Profile - Avatar + First Name */}
              <li className="navbar-item">
                <Link to="/dashboard/profile" className="navbar-link" onClick={closeMenu}>
                  <div className="navbar-user-avatar">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  {getFirstName()}
                </Link>
              </li>

              {/* Logout */}
              <li className="navbar-item">
                <button className="navbar-link navbar-logout-btn" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Public Navigation */}
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
            </>
          )}
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar