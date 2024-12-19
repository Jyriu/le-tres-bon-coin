import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UserEdit.css';

interface UserFormData {
  username: string;
  email: string;
  password: string;
}

const UserEdit: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { username, email } = response.data;
      setFormData(prev => ({
        ...prev,
        username,
        email
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement de l\'utilisateur');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const dataToSend = {
        ...formData,
        // N'envoie le mot de passe que s'il a été modifié
        password: formData.password || undefined
      };
      
      await axios.put(`http://localhost:3001/users/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/users');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la modification de l\'utilisateur');
    }
  };

  return (
    <div className="user-edit-container">
      <div className="user-edit-card">
        <h2>Modifier l'Utilisateur</h2>
        
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Entrez le nom d'utilisateur"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Entrez l'email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Nouveau mot de passe
              <span className="password-hint"> (Laissez vide pour ne pas modifier)</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez le nouveau mot de passe"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/users')}>
              Annuler
            </button>
            <button type="submit" className="submit-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit; 