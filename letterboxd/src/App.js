import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;