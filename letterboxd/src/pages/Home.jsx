import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { moviesApi } from '../services/api';
import '../styles/Home.css'; // Import the CSS file

function Home() {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img src={movie.image_path} alt={movie.title} className="movie-image" />
            <div className="movie-details">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-year">{movie.year}</p>
              <p className="movie-description">{movie.description}</p>
            </div>
            <div className="movie-user">
              <img src={movie.user.profilePicture} alt={movie.user.name} className="user-profile" />
              <span className="user-name">{movie.user.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
