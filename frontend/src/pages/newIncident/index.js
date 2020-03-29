import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ngoId = localStorage.getItem('ngoId');
  const history = useHistory();

  const handleNewIncident = async event => {
    event.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert(`Error, we couldn't submit your case, please try again.`);
    }
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoimg} alt="Be The Hero Logo" />

          <h1>Register a new case</h1>

          <p>
            Describe the case with as maximum details as you could to find a
            hero to solve it.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back to home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Value in CAD"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
