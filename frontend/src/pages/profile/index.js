import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import logoimg from '../../assets/logo.svg';
import './style.css';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ngoName = localStorage.getItem('ngoName');
  const ngoId = localStorage.getItem('ngoId');

  incidents.map(incident => console.log(incident));

  const handleLogOut = () => {
    localStorage.clear();

    history.push('/');
  };

  const handleDeleteIncident = async id => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Error, we couldn't delete your case, try again.");
    }
  };
  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ngoId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ngoId]);

  return (
    <div className="profile-container">
      <header>
        <img src={logoimg} alt="Be The Hero Logo" />
        <span>Welcome, {ngoName}</span>

        <Link className="button" to="/incidents/new">
          Register a new case
        </Link>
        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Registered Cases</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASE:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>
              {' '}
              {Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD'
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
