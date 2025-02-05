import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { usersApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Users.css'; // Import the CSS file

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followLoading, setFollowLoading] = useState({});
  const { username } = useContext(AuthContext);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersApi.getAllUsers();
      setUsers(response.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (following_username) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please login to follow users");
      return;
    }
    try {
      setFollowLoading(prev => ({ ...prev, [following_username]: true }));
      const result = await usersApi.followUser(username, following_username);
      if (result.message) {
        setError(null);
        // Optional: Show success message
      }
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to follow user');
      console.error('Follow error:', err);
    } finally {
      setFollowLoading(prev => ({ ...prev, [following_username]: false }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="users-container">
      <h1>Users</h1>
      <ul className="users-list">
        {users.map(user => (
          <li key={user._username} className="user-item">
            <div className="user-info">
              <Link to={`/user/${user._username}`} className="user-link">
                <span className="user-name">{user._username}</span>
                <br></br>
                <span className="user-created">{new Date(user._createdAt).toLocaleDateString()}</span>
              </Link>
              <button
                className="follow-button"
                disabled={followLoading[user._id]}
                onClick={() => handleFollow(user._username)}
              >
                {followLoading[user._username] ? 'Following...' : 'Follow'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
