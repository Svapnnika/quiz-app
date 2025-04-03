// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Create a CSS file for styling

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple validation (you can replace this with actual authentication logic)
    if (username === 'user' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login to Quiz App</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
