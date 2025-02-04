import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Home.css'; // Import the CSS file

const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    image_path: 'https://via.placeholder.com/300x400',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    user: {
      name: 'John Doe',
      profilePicture: 'https://via.placeholder.com/50',
    },
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    image_path: 'https://via.placeholder.com/300x400',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    user: {
      name: 'Jane Smith',
      profilePicture: 'https://via.placeholder.com/50',
    },
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    image_path: 'https://via.placeholder.com/300x400',
    description: 'When the menace known as the Joker emerges, Batman must confront chaos.',
    user: {
      name: 'Alice Brown',
      profilePicture: 'https://via.placeholder.com/50',
    },
  },
];

function Home() {
  const { token } = useContext(AuthContext);

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