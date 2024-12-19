import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/announces" className="navbar-brand">
          Le Très Bon Coin
        </Link>
        <Link to="/announces/create" className="navbar-link">
          Nouvelle Annonce
        </Link>
        <Link to="/users" className="navbar-link">
          Utilisateurs
        </Link>
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-button">
          Se déconnecter
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
