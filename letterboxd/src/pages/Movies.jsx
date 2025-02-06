import React, { useEffect, useState, useContext } from 'react';
import { moviesApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Movies.css';

function Admin() {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({ title: '', desc: '', genre: '', published_year: '' });
  const [editingMovie, setEditingMovie] = useState(null);
  
  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
    }
    fetchMovies();
  }, [role, navigate]);

  const fetchMovies = async () => {
    try {
      const response = await moviesApi.getAllMovies();
      setMovies(response.data.movies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await moviesApi.deleteMovie(movieId);
        setMovies(movies.filter(movie => movie._id !== movieId));
      } catch (err) {
        alert('Failed to delete movie.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await moviesApi.editMovie(editingMovie._id, newMovie);
      } else {
        await moviesApi.addMovie(newMovie);
      }
      setNewMovie({ title: '', desc: '', genre: '', published_year: '' });
      setEditingMovie(null);
      fetchMovies();
    } catch (err) {
      alert('Failed to save movie.');
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setNewMovie(movie);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div class="admin-container">
      <h1>Admin Panel - Movie Management</h1>
      <form class="admin-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} required />
        <input type="text" placeholder="Description" value={newMovie.desc} onChange={(e) => setNewMovie({ ...newMovie, desc: e.target.value })} required />
        <input type="text" placeholder="Genre" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} required />
        <input type="number" placeholder="Published Year" value={newMovie.published_year} onChange={(e) => setNewMovie({ ...newMovie, published_year: e.target.value })} required />
        <button type="submit">{editingMovie ? 'Update' : 'Add'} Movie</button>
      </form>
      <ul class = "movie-list">
        {movies.map(movie => (
          <li key={movie._id}>
            {movie._title} ({movie._build_year})
            <button class="edit-btn" onClick={() => handleEdit(movie)}>Edit</button>
            <button class="delete-btn" onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;