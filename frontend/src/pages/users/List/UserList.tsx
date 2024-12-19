import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des utilisateurs');
    }
  };

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleEditUser = (id: string) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(users.filter(user => user._id !== id));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Gestion des Utilisateurs</h2>
      </div>

      {error && <div className="error">
        <i className="fas fa-exclamation-circle"></i>
        {error}
      </div>}

      <div className="user-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <h3>
                <i className="fas fa-user"></i>
                {user.username}
              </h3>
              <p className="user-email">
                <i className="fas fa-envelope"></i>
                {user.email}
              </p>
              <p className="user-date">
                <i className="fas fa-calendar-alt"></i>
                Inscrit le {formatDate(user.createdAt)}
              </p>
            </div>
            <div className="user-actions">
              <button
                className="edit-button"
                onClick={() => handleEditUser(user._id)}
              >
                <i className="fas fa-edit"></i>
                Modifier
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(user._id)}
              >
                <i className="fas fa-trash-alt"></i>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !error && (
        <div className="no-users">
          <i className="fas fa-users-slash"></i>
          Aucun utilisateur trouvé
        </div>
      )}

      <button className="create-user-button" onClick={handleCreateUser}>
        <i className="fas fa-plus"></i>
        Nouvel Utilisateur
      </button>
    </div>
  );
};

export default UserList; 