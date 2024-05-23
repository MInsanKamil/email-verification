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
        setMessage('Error verifying email');
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div >
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
