import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Letterboxd
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-links">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-links">
              Signup
            </Link>
          </li>
          {/* Add more navigation items here if needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;