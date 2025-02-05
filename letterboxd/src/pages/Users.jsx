import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { usersApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Users.css'; // Import the CSS file

const useCheckIfIsAdmin = () => {
  const {role} = useContext(AuthContext)
  console.log(role)
  return role === 'admin'
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = useCheckIfIsAdmin()
  const [followLoading, setFollowLoading] = useState({});
  const { username } = useContext(AuthContext);
  const [deleteLoading, setDeleteLoading] = useState({})


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

  const handleFollow = async (following_user_id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Please login to follow users");
      return;
    }
    try {
      setFollowLoading(prev => ({ ...prev, [following_user_id]: true }));
      const result = await usersApi.followUser(following_user_id);
      if (result.message) {
        setError(null);
        // Optional: Show success message
      }
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to follow user');
      console.error('Follow error:', err);
    } finally {
      setFollowLoading(prev => ({ ...prev, [following_user_id]: false }));
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
              <Link to={`/user/${user._id}`} className="user-link">
                <span className="user-name">{user._username}</span>
                <br></br>
                <span className="user-created">{new Date(user._createdAt).toLocaleDateString()}</span>
              </Link>
              <button
                className="button"
                disabled={followLoading[user._id]}
                onClick={() => handleFollow(user._id)}
              >
                {followLoading[user._username] ? 'Following...' : 'Follow'}
              </button>
              {isAdmin && (
                <button className="button"
                disabled={deleteLoading[user._id]}
                >Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
