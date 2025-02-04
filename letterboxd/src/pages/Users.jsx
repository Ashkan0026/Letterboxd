import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Users.css'; // Import the CSS file

// Mock user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
];

function Users() {
  return (
    <div className="users-container">
      <h1>Users</h1>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <Link to={`/user/${user.id}`} className="user-link">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;