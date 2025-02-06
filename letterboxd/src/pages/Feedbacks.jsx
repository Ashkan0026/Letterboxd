import React, { useContext, useState, useEffect } from 'react';
import { feedbackApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Feedbacks.css';


function Feedbacks() {
  const { role } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const response = await feedbackApi.getAllFeedbacks();
      console.log(response);
      setFeedbacks(response.data.feedbacks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await feedbackApi.deleteFeedback(feedbackId);
        fetchFeedbacks();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      fetchFeedbacks();
    }
  }, [role]);

  if (role !== 'admin') return <div>Unauthorized access</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Manage Feedbacks</h1>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Movie</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback._id}>
              <td>{feedback._user_name}</td>
              <td>{feedback._movie_title}</td>
              <td>{feedback._desc}</td>
              <td>{feedback._score}</td>
              <td>
                <button 
                  onClick={() => handleDelete(feedback._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feedbacks;