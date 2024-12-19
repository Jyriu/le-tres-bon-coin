# Le Très Bon Coin - Application MERN Stack

## 📝 Description
Une application de petites annonces inspirée du Bon Coin, développée dans le cadre d'un projet IPSSI. Cette application permet aux utilisateurs de publier, consulter et gérer des annonces dans différentes catégories.

## 🎯 Objectifs du Projet
- Créer une application complète avec la stack MERN
- Implémenter un système d'authentification sécurisé
- Gérer les opérations CRUD pour les utilisateurs et les annonces
- Utiliser les states locaux pour la gestion d'état
- Assurer la sécurité avec JWT et bcrypt

## 🛠 Technologies Utilisées

### Backend
- **Node.js** & **Express.js** - Pour le serveur et l'API REST
- **MongoDB** avec **Mongoose** - Pour la base de données
- **JWT** - Pour l'authentification sécurisée
- **Bcrypt** - Pour le hachage des mots de passe

### Frontend
- **React** avec **TypeScript** - Pour l'interface utilisateur
- **React Router** - Pour la navigation
- **Axios** - Pour les requêtes HTTP
- **CSS Modules** - Pour le styling modulaire

## ✨ Fonctionnalités Implémentées

### 🔐 Authentification
- Inscription avec validation des champs
- Connexion sécurisée avec JWT
- Protection des routes privées
- Hachage des mots de passe avec bcrypt

### 👥 Gestion des Utilisateurs
- Création de compte utilisateur
- Modification des informations du profil
- Suppression de compte
- Liste des utilisateurs (interface admin)

### 📢 Gestion des Annonces
- Création d'annonces avec catégorisation
- Modification et suppression d'annonces
- Liste des annonces avec filtrage par catégorie
- Page détaillée pour chaque annonce
- Association automatique de l'auteur via JWT

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

### Installation

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

4. Configuration
Créez un fichier `.env` dans le dossier backend avec :
```env
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
PORT=3001
```

### Démarrage

1. Backend
```bash
cd backend
npm start
```

2. Frontend
```bash
cd frontend
npm start
```

L'application sera accessible à : `http://localhost:3000`

## 📁 Structure du Projet

```
le-tres-bon-coin/
├── backend/
│   ├── controllers/    # Logique métier
│   ├── middleware/     # Middlewares (auth, validation)
│   ├── models/         # Modèles Mongoose
│   ├── routes/         # Routes API
│   └── app.js         # Point d'entrée du serveur
└── frontend/
    ├── public/
    └── src/
        ├── components/ # Composants réutilisables
        ├── pages/      # Pages de l'application
        └── App.tsx    # Composant racine
```

## 🔒 Sécurité
- Authentification JWT pour les routes protégées
- Hachage des mots de passe avec bcrypt
- Validation des données côté client et serveur
- Protection CORS
- Gestion sécurisée des tokens

## ✅ Points Clés du Projet
- Architecture MERN complète et fonctionnelle
- Système d'authentification robuste
- Interface utilisateur intuitive et responsive
- Gestion des états avec states locaux React
- Code TypeScript pour plus de fiabilité
- Structure de projet claire et maintenable

## 👨‍💻 Auteur
Sami YEZZA ([@Jyriu](https://github.com/Jyriu)) 