import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { moviesApi } from '../services/api';
import '../styles/Home.css'; // Import the CSS file
import MovieFilter from '../components/MovieFilter';

function Home() {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:9090"

  const fetchMovies = async (filters) => {
    try {
      const response = await moviesApi.getAllMovies(filters);
      setMovies(response.data.movies);
      console.log(response.data.movies[0])
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies({});
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <MovieFilter onFilter={fetchMovies}/>
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <Link to={`/movie/${movie._id}`} key={movie.id} className="movie-card">
            <img src={`${baseUrl}${movie._image_path}`} alt={movie.title} className="movie-image" />
            <div className="movie-details">
              <h2 className="movie-title">{movie._title}</h2>
              <h5 className="movie-genre">{movie._genre}</h5>
              <p className="movie-year">{movie._build_year}</p>
              <p className="movie-description">{movie._desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
