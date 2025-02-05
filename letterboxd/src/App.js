import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Admin from './pages/Admin';
import Users from './pages/Users'; // Import Users page
import UserDetail from './pages/UserDetail'; // Import UserDetail page
import Navbar from './components/Navbar';

const ProtectedRoute = () => {
  const { role } = useContext(AuthContext);

  if (role === "admin") {
    return <Navigate to="/admin" />;
  } else {
    return <Home />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Component to handle redirection based on role

export default App