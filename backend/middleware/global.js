const express = require('express');
const cors = require('cors');

const globalMiddleware = {
    // Middleware pour parser le JSON
    jsonParser: express.json(),
    
    // Middleware pour CORS
    corsHandler: cors(),
    
    // Middleware pour logger les requêtes
    requestLogger: (req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    },

    // Middleware pour gérer les erreurs
    errorHandler: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
    }
};

module.exports = globalMiddleware; 