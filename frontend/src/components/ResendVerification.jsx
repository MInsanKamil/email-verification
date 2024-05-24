import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const ResendVerification = () => {
const [message, setMessage] = useState('');

  const handleResendVerification = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      const decoded = jwtDecode(token);
      const email = decoded.email;
      const res = await axios.post('http://localhost:5000/api/auth/resend-verification', { email });
      setMessage(res.data.message);
      alert("Harap cek email untuk link verifikasi");
    } catch (error) {
      setMessage('Gagal mengirim verifikasi email');
    }
  };

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ textAlign: 'center' }}>
      <h2>Verifikasi Email</h2>
      <button onClick={handleResendVerification}>Verifikasi Email</button>
      <p>{message}</p>
    </div>
  </div>
  );
};

export default ResendVerification;

