const User = require("../models/userModel");
const Announce = require("../models/announceModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Register (inscription publique)
const Register = async (req, res) => {
  try {
    console.log("body", req.body);
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res
        .status(400)
        .send("Merci de remplir les champs Username, Password & Email");
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créer un nouvel utilisateur avec le mot de passe hashé
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    await user.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe avec bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // Créer le token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Créer un utilisateur (par un admin)
const createUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Merci de remplir les champs Username, Password & Email" });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créer le nouvel utilisateur
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    await user.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès par l'admin",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par son ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Vérifier si l'utilisateur existe avant de supprimer
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer d'abord toutes les annonces de l'utilisateur
    const deleteResult = await Announce.deleteMany({ author: mongoose.Types.ObjectId(userId) });
    console.log(`${deleteResult.deletedCount} annonces supprimées`);
    
    // Puis supprimer l'utilisateur
    await user.remove();

    res.status(200).json({ 
      message: 'Utilisateur et ses annonces supprimés avec succès',
      deletedAnnounces: deleteResult.deletedCount
    });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
  }
};

module.exports = {
  Register,
  Login,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
