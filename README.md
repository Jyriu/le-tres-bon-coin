# Le Très Bon Coin - Application MERN Stack

Une application de petites annonces inspirée du Bon Coin, développée avec la stack MERN (MongoDB, Express, React, Node.js).

## Technologies Utilisées

### Backend
- Node.js
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Bcrypt pour le hachage des mots de passe

### Frontend
- React
- TypeScript
- Axios pour les requêtes HTTP
- React Router pour la navigation
- States locaux pour la gestion d'état
- CSS modules pour le styling

## Fonctionnalités

### Authentification
- Inscription avec validation des champs
- Connexion sécurisée avec JWT
- Protection des routes privées

### Gestion des Utilisateurs
- Création de compte
- Modification du profil
- Suppression de compte
- Liste des utilisateurs (admin)

### Gestion des Annonces
- Création d'annonces avec catégories
- Modification d'annonces
- Suppression d'annonces
- Liste des annonces avec filtrage par catégorie
- Page de détail des annonces
- Association automatique de l'auteur via JWT

## Installation

1. Clonez le repository
```bash
git clone https://github.com/Jyriu/le-tres-bon-coin.git
cd le-tres-bon-coin
```

2. Installez les dépendances du backend
```bash
cd backend
npm install
```

3. Installez les dépendances du frontend
```bash
cd frontend
npm install
```

4. Configurez les variables d'environnement
- Créez un fichier `.env` dans le dossier backend avec :
```
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
PORT=3001
```

## Lancement

1. Démarrez le serveur backend
```bash
cd backend
npm start
```

2. Démarrez le client frontend
```bash
cd frontend
npm start
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## Structure du Projet

```
le-tres-bon-coin/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        └── App.tsx
```

## Sécurité

- Mots de passe hashés avec bcrypt
- Authentification par JWT
- Validation des données côté serveur et client
- Protection des routes sensibles
- Gestion sécurisée des tokens

## Auteur

Sami YEZZA ([@Jyriu](https://github.com/Jyriu)) 