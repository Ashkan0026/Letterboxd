import React, { useEffect, useState, useContext } from 'react';
import { moviesApi, usersApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      navigate('/');
    } else {
      fetchAllData();
    }
  }, [username, navigate]);

  const fetchAllData = async () => {
    try {
      const [profileRes, favoritesRes, friendsRes] = await Promise.all([
        usersApi.getUserByUsername(username),
        moviesApi.getFavoriteMovies(),
        usersApi.friends()
      ]);
      
      setProfile(profileRes.data);
      setFavoriteMovies(favoritesRes.data.favoriteMovies);
      setFriends(friendsRes.data.friends);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profile && (
        <div className="profile-info">
          <h2 className="username">{profile.user._username}</h2>
          <p className="register-date">
            Register date: {profile.user._createdAt}
          </p>
        </div>
      )}

      <h2>Favorite Movies</h2>
      <ul className="movie-list">
        {favoriteMovies.map(movie => (
          <li key={movie._id} className="movie-item">
            <span className="movie-title">{movie._title}</span>
            <span className="movie-desc">({movie._desc})</span>
          </li>
        ))}
      </ul>

      <h2>Friends</h2>
      <ul className="friend-list">
        {friends.map(friend => (
          <li key={friend._id} className="friend-item">
            {friend._username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
