import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import './AnnounceList.css';

interface Announce {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  author: {
    username: string;
    email: string;
  };
  createdAt: string;
}

const AnnounceList: React.FC = () => {
  const [announces, setAnnounces] = useState<Announce[]>([]);
  const [filteredAnnounces, setFilteredAnnounces] = useState<Announce[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string>('');
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

  useEffect(() => {
    fetchAnnounces();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredAnnounces(announces.filter(announce => announce.category === selectedCategory));
    } else {
      setFilteredAnnounces(announces);
    }
  }, [selectedCategory, announces]);

  const fetchAnnounces = async () => {
    try {
      const response = await axios.get('http://localhost:3001/announces');
      setAnnounces(response.data);
      setFilteredAnnounces(response.data);
    } catch (err: any) {
      setError('Erreur lors du chargement des annonces');
      console.error('Erreur:', err);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleCreateClick = () => {
    navigate('/announces/create');
  };

  const handleAnnounceClick = (id: string) => {
    navigate(`/announces/${id}`);
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Empêche la navigation vers les détails
    navigate(`/announces/edit/${id}`);
  };

  const handleDeleteClick = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Empêche la navigation vers les détails
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/announces/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Mettre à jour la liste après la suppression
        setAnnounces(announces.filter(announce => announce._id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression de l\'annonce');
        console.error('Erreur:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };

  return (
    <div className="announce-list-container">
      <div className="left-sidebar">
        <div className="header-actions">
          <button onClick={handleCreateClick} className="create-button">
            Créer une annonce
          </button>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-filter"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="main-content">
        {error && <div className="error">{error}</div>}

        <div className="announces-grid">
          {filteredAnnounces.map(announce => (
            <div
              key={announce._id}
              className="announce-card"
              onClick={() => handleAnnounceClick(announce._id)}
            >
              <div className="announce-left-column">
                <div className="announce-category">{announce.category}</div>
                <span className="announce-author-label">
                  de {announce.author?.username || "Utilisateur supprimé"}
                </span>
                <span className="announce-date">
                  Publié le {formatDate(announce.createdAt)}
                </span>
              </div>
              
              <div className="announce-content">
                <h3>{announce.title}</h3>
                <p className="announce-description">
                  {announce.description.length > 100
                    ? `${announce.description.substring(0, 100)}...`
                    : announce.description}
                </p>
              </div>

              <div className="announce-price-container">
                <span className="announce-price">{announce.price} €</span>
                <span className="announce-time-ago">
                  {formatTimeAgo(announce.createdAt)}
                </span>
                <div className="announce-actions">
                  <button
                    className="action-button view-button"
                    onClick={(e) => handleAnnounceClick(announce._id)}
                  >
                    Voir
                  </button>
                  <button
                    className="action-button edit-button"
                    onClick={(e) => handleEditClick(e, announce._id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={(e) => handleDeleteClick(e, announce._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnnounces.length === 0 && (
          <div className="no-announces">
            Aucune annonce trouvée {selectedCategory && `dans la catégorie ${selectedCategory}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnounceList; 