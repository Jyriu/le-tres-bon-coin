const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  Register,
  Login,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Routes publiques
router.post("/register", Register);
router.post("/login", Login);

// Routes protégées de gestion des utilisateurs
router.post("/users/create", auth, createUser);
router.get("/users", auth, getAllUsers);
router.get("/users/:id", auth, getUserById);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

module.exports = router;