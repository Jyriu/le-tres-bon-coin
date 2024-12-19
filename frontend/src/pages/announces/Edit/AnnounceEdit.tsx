import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AnnounceEdit.css';

interface AnnounceForm {
  title: string;
  description: string;
  price: number;
  category: string;
}

const AnnounceEdit: React.FC = () => {
  const [formData, setFormData] = useState<AnnounceForm>({
    title: '',
    description: '',
    price: 0,
    category: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    'Immobilier',
    'Véhicules',
    'Électronique',
    'Mode',
    'Maison',
    'Loisirs',
    'Autres'
  ];

  useEffect(() => {
    const fetchAnnounce = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/announces/${id}`);
        const { title, description, price, category } = response.data;
        setFormData({ title, description, price, category });
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement de l\'annonce');
        setLoading(false);
        console.error('Erreur:', err);
      }
    };

    fetchAnnounce();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3001/announces/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/announces');
    } catch (err) {
      setError('Erreur lors de la modification de l\'annonce');
      console.error('Erreur:', err);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="announce-edit-container">
      <div className="announce-edit-card">
        <h2>Modifier l'annonce</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Prix (€)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/announces')} className="cancel-button">
              Annuler
            </button>
            <button type="submit" className="submit-button">
              Modifier l'annonce
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnounceEdit; 