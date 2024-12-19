# Le Très Bon Coin - Application MERN Stack

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

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
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) & ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) - Pour le serveur et l'API REST
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) avec ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) - Pour la base de données
- ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white) - Pour l'authentification sécurisée
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-003A70?style=flat-square&logo=lock&logoColor=white) - Pour le hachage des mots de passe

### Frontend
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) avec ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) - Pour l'interface utilisateur
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) - Pour la navigation
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) - Pour les requêtes HTTP
- ![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=flat-square&logo=css3&logoColor=white) - Pour le styling modulaire

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