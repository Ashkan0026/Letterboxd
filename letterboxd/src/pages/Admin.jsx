import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { moviesApi } from '../services/api';
import '../styles/Home.css'; // Import the CSS file

function Admin() {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:9090"

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await moviesApi.getAllMovies();
        setMovies(response.data.movies);
        console.log(response.data.movies[0]._image_path)
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
          <Link to={`/movie/${movie._id}`} key={movie.id} className="movie-card">
            <img src={`${baseUrl}${movie._image_path}`} alt={movie.title} className="movie-image" />
            <div className="movie-details">
              <h2 className="movie-title">{movie._title}</h2>
              <p className="movie-year">{movie._build_year}</p>
              <p className="movie-description">{movie._desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
    
export default Admin;