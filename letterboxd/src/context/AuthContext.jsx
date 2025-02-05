import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
  
    const login = (token, role, username) => {
      setToken(token);
      setRole(role);
      setUsername(username);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);
    };
  
    const logout = () => {
      setToken(null);
      setRole(null);
      setUsername(null);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    };
  
    return (
      <AuthContext.Provider value={{ token, role, username, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};
