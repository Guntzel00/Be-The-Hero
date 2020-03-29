import React, { useState } from 'react';
import './style.css';
import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert(`Login failed, try again`);
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoimg} alt="Logo" />
        <form onSubmit={handleLogin}>
          <h1>Do your login </h1>

          <input
            placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Enter
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Create your account
          </Link>
        </form>
      </section>

      <img src={heroesimg} alt="Heroes" />
    </div>
  );
}
