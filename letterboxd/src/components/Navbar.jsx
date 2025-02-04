import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
        <li><Link to="/">Home</Link></li>
        {!token && <li><Link to="/signup">Sign Up</Link></li>}
        {token && <li><button onClick={logout}>Logout</button></li>}
      </ul>
    </nav>
  );
}

export default Navbar;