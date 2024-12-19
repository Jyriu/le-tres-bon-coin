const Announce = require("../models/announceModel");
const User = require("../models/userModel");

// Créer une annonce
const createAnnounce = async (req, res) => {
  try {
    console.log("Données reçues:", req.body);

    const announce = new Announce({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      author: req.userId,
    });

    console.log("Annonce avant sauvegarde:", announce);

    const savedAnnounce = await announce.save();
    console.log("Annonce sauvegardée:", savedAnnounce);

    res.status(201).json(savedAnnounce);
  } catch (error) {
    console.error("Erreur lors de la création:", error);
    res.status(400).json({ message: error.message });
  }
};

// Récupérer toutes les annonces
const getAllAnnounces = async (req, res) => {
  try {
    const announces = await Announce.find()
      .populate('author', 'username email')
      .exec();

    // Filtrer les annonces pour ne garder que celles avec un auteur valide
    const validAnnounces = announces.filter(announce => announce.author !== null);

    res.json(validAnnounces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une annonce par son ID
const getAnnounceById = async (req, res) => {
  try {
    const announce = await Announce.findById(req.params.id)
      .populate('author', 'username email')
      .exec();

    if (!announce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    // Vérifier si l'auteur existe toujours
    if (!announce.author) {
      return res.status(404).json({ message: "Cette annonce n'est plus disponible car son auteur a été supprimé" });
    }

    res.json(announce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une annonce
const updateAnnounce = async (req, res) => {
  try {
    const announce = await Announce.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      },
      { new: true }
    );

    if (!announce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }

    res.json(announce);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une annonce
const deleteAnnounce = async (req, res) => {
  try {
    const announce = await Announce.findByIdAndDelete(req.params.id);
    if (!announce) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnnounce,
  getAllAnnounces,
  getAnnounceById,
  updateAnnounce,
  deleteAnnounce,
};
