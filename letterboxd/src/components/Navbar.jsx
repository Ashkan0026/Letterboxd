import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { token, username, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const adminExpression = role ? "(Admin)" : ""

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {!token ? (
            <li className="nav-item">
              <Link to="/signup" className="nav-links">Sign Up</Link>
            </li>
          ) : (
            <li className="nav-item user-menu">
              <span className="nav-links username">{username} {adminExpression}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
