import React from 'react';
import { useParams } from 'react-router-dom';
import "../styles/UserDetail.css"

// Mock user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', bio: 'Software Engineer with 5 years of experience.' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', bio: 'Frontend Developer specializing in React.' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', bio: 'Backend Developer with expertise in Node.js.' },
];

function UserDetail() {
  const { id } = useParams(); // Get the user ID from the URL
  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-detail-container">
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
}

export default UserDetail;