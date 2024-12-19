import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AnnounceCreate.css';

const AnnounceCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Immobilier',
    'Véhicules',
    'Électronique',
    'Mode',
    'Maison',
    'Loisirs',
    'Autres'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/announces',
        {
          title,
          description,
          price: Number(price),
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/announces');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  const handleCancel = () => {
    navigate('/announces');
  };

  return (
    <div className="announce-create-container">
      <form className="announce-create-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Créer une annonce</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Titre de votre annonce"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Décrivez votre annonce en détail"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <div className="price-input">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            <i className="fas fa-check"></i>
            Publier l'annonce
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            <i className="fas fa-times"></i>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnounceCreate; 