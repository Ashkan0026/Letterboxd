import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { token, username, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const adminExpression = role === 'admin' ? "(Admin)" : ""

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Letterboxd
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-links" onClick={toggleMenu}>
              Users
            </Link>
          </li>
          <li className="nav-item">
            {role === 'admin' && (
              <Link to="/admin/feedbacks" className="nav-links">
                Manage Feedbacks
              </Link>
            )}
          </li>
          {!token ? (
            <li className="nav-item">
              <Link to="/signup" className="nav-links" onClick={toggleMenu}>
                Sign Up
              </Link>
            </li>
          ) : (
            <li className="nav-item user-menu">
              <span className="nav-links username">
                {username} {adminExpression}
              </span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
