import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMessage(res.data.message);
      localStorage.setItem('token', res.data.token);
      navigate('/verify-email');
    } catch (error) {
      setMessage('Login gagal');
    }
  };

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ textAlign: 'center' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:   </label>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="password">Password: </label>
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
        <p>{message}</p>
        <Link to="/register">Register</Link>
        </div>
    </div>
  );
};

export default Login;
