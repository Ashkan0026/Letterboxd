import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersApi } from '../services/api';
import "../styles/UserDetail.css"

function UserDetail() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await usersApi.getUserByUsername(username);
        setUser(response.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-detail-container">
      <h1>{user._username}</h1>
      <p><strong>Member since:</strong> {new Date(user._createdAt).toLocaleDateString()}</p>
      <p><strong>Role:</strong> {user._isAdmin ? 'Admin' : 'User'}</p>
    </div>
  );
}

export default UserDetail;
