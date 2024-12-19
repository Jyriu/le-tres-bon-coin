import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import './AnnounceDetail.css';

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

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Immobilier':
      return 'fa-home';
    case 'Véhicules':
      return 'fa-car';
    case 'Électronique':
      return 'fa-laptop';
    case 'Mode':
      return 'fa-tshirt';
    case 'Maison':
      return 'fa-couch';
    case 'Loisirs':
      return 'fa-gamepad';
    default:
      return 'fa-tag';
  }
};

const AnnounceDetail: React.FC = () => {
  const [announce, setAnnounce] = useState<Announce | null>(null);
  const [error, setError] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnounce();
  }, [id]);

  const fetchAnnounce = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/announces/${id}`);
      setAnnounce(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement de l\'annonce');
    }
  };

  const handleEdit = () => {
    navigate(`/announces/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/announces/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/announces');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const handleBack = () => {
    navigate('/announces');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy 'à' HH:mm", { locale: fr });
  };

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        {error}
      </div>
    );
  }

  if (!announce) {
    return (
      <div className="loading-container">
        <i className="fas fa-circle-notch"></i>
        Chargement...
      </div>
    );
  }

  return (
    <div className="announce-detail-container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i>
        Retour aux annonces
      </button>

      <div className="announce-detail-content">
        <div className="announce-header">
          <div className="announce-title-section">
            <span className="announce-category">
              <i className={`fas ${getCategoryIcon(announce.category)}`}></i>
              {announce.category}
            </span>
            <h1>{announce.title}</h1>
            <div className="announce-meta">
              <span className="announce-date">
                <i className="fas fa-calendar-alt"></i>
                Publié le {formatDate(announce.createdAt)}
              </span>
              <span className="announce-author">
                <i className="fas fa-user"></i>
                par {announce.author.username}
              </span>
            </div>
          </div>
          <div className="announce-price-section">
            <div className="price-tag">{announce.price}</div>
            <div className="action-buttons">
              <button className="edit-button" onClick={handleEdit}>
                <i className="fas fa-edit"></i>
                Modifier
              </button>
              <button className="delete-button" onClick={handleDelete}>
                <i className="fas fa-trash"></i>
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div className="announce-body">
          <div className="description-section">
            <h2>
              <i className="fas fa-align-left"></i>
              Description
            </h2>
            <p>{announce.description}</p>
          </div>

          <div className="contact-section">
            <h2>
              <i className="fas fa-address-card"></i>
              Contact
            </h2>
            <div className="contact-info">
              <p>
                <i className="fas fa-user"></i>
                {announce.author.username}
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                {announce.author.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnounceDetail; 