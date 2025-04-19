import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Issuerecive.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
      });
      alert('Signup successful!');
      navigate('/login');
    } catch (error) {
      alert('Error signing up');
      console.error(error);
    }
  };

  return (
    <div className='icontainer'>
      <Header />
      <div className='icontent' >
        
        <form onSubmit={handleSubmit} className='iform'>
        <h1>Signup</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='iinput'
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='iinput'
          />
          <button type="submit" className='ibutton'>Signup</button>
        </form>
      </div>
    </div>
  );
};


export default Signup;