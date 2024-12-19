const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import des middlewares
const { jsonParser, corsHandler, requestLogger, errorHandler } = require('./middleware/global');

// Import des routes
const userRoutes = require('./routes/userRoutes');
const announceRoutes = require('./routes/announceRoutes');

const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Application des middlewares globaux
app.use(jsonParser);
app.use(corsHandler);
app.use(requestLogger);

// Routes
app.use('/users', userRoutes);
app.use('/announces', announceRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});