import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Admin from './pages/Admin';
//import MovieDetail from './pages/MovieDetail';
import Users from './pages/Users'; // Import Users page
import UserDetail from './pages/UserDetail'; // Import UserDetail page
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/users" element={<Users />} /> {/* Route for Users page */}
          <Route path="/user/:id" element={<UserDetail />} /> {/* Route for UserDetail page */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;