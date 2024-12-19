import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Le Très Bon Coin</h1>
        <p>Achetez et vendez en toute simplicité</p>
        
        <div className="home-buttons">
          <button 
            className="home-button login-button"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </button>
          <button 
            className="home-button register-button"
            onClick={() => navigate('/register')}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 