import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [pa, setPa] = useState('');

  const history = useHistory();

  const handleRegister = async e => {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      pa
    };

    try {
      const response = await api.post('ngos', data);

      alert(
        `Your ID access: ${response.data.id}, save it and use for future login`
      );

      history.push('/');
    } catch (err) {
      alert(`An error ocurred with your registration, try again.`);
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoimg} alt="Be The Hero Logo" />

          <h1>Sing Up</h1>

          <p>
            Register, enter in our plataform and help people find your NGO
            causes.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Already have an account
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp Contact"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="Prov."
              style={{ width: 90 }}
              value={pa}
              onChange={e => setPa(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
