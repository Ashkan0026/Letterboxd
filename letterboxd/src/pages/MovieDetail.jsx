import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { moviesApi } from '../services/api';
import { feedbackApi } from '../services/api';
import '../styles/MovieDetail.css';

// create a new component called MovieDetail
// this component will display the details of a movie
// it will fetch the movie details from the API using the moviesApi service
// it will also fetch the feedback for the movie using the feedbackApi service
// the movie id will be passed as a URL parameter
// user can register feedback for the movie

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0); // State for the rating
  const [ratingError, setRatingError] = useState(null); // State for rating errors


  const fetchFeedbacks = async () => { // Define fetchFeedbacks OUTSIDE useEffect
    try {
      const response = await feedbackApi.getMovieFeedbacks(movieId);
      setFeedbacks(response.data.feedbacks);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await moviesApi.getMovieById(movieId);
        setMovie(response.data.movie);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    fetchFeedbacks(); // Call it here initially
  }, [movieId]); // No need to include fetchFeedbacks here

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    // Validation:
    if (rating < 0 || rating > 5) {
      setRatingError("Rating must be between 0 and 5.");
      return; // Stop submission
    }

    try {
      console.log(user);
      //if (!user) {
      //  setError("You must be logged in to submit feedback.");
      //  return;
      //}

      await feedbackApi.addFeedback({ 
        movie_id: movieId, 
        description: feedback,
        rate: rating // Include rating in the API call
      });

      setFeedback('');
      setRating(0); // Reset rating after submission
      fetchFeedbacks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse as integer
    setRating(value);
    setRatingError(null); // Clear any previous errors
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Movie not found</div>;


  return (
    <div className="movie-detail-container">
      <h1>{movie._title}</h1>
      <div className="movie-info"> {/* Wrap movie info in a container */}
        <p><strong>Genre:</strong> {movie._genre}</p>
        <p><strong>Release Date:</strong> {new Date(movie._build_year).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {movie._desc}</p>
      </div>

      <div className="feedback-section"> {/* Wrap feedback section */}
        <h2>Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback"
            required
          />

          <div className="rating-section"> {/* Add rating section */}
            <label htmlFor="rating">Rating (0-5):</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={handleRatingChange}
              min="0"
              max="5"
              required
            />
            {ratingError && <p className="error-message">{ratingError}</p>} {/* Display error */}
          </div>

          <button type="submit">Submit</button>
        </form>
        <ul className="feedback-list"> {/* Add class to the list */}
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="feedback-item"> {/* Add class to each item */}
              <p className="feedback-author"><strong>By:</strong> {feedback._user_name}</p>
              <p className="feedback-text">{feedback._desc}</p>
              <p className="feedback-score"><strong>Score:</strong> {feedback._score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetail;
