const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAnnounce,
  getAllAnnounces,
  getAnnounceById,
  updateAnnounce,
  deleteAnnounce,
} = require("../controllers/announceController");

// Routes CRUD protégées par auth
router.post("/", auth, createAnnounce);
router.get("/", getAllAnnounces);
router.get("/:id", getAnnounceById);
router.put("/:id", auth, updateAnnounce);
router.delete("/:id", auth, deleteAnnounce);

module.exports = router;
