import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        setMessage(res.data.message);
      } catch (error) {
        setMessage('Verfikasi email gagal');
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{ textAlign: 'center'}}>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  </div>
  );
};

export default Verify;
