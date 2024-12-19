require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://samiyezza:8a08ad81@cluster0.uyxehij.mongodb.net/leboncoin", {})
  .then(() => {
    console.log("Connected to the mongoDB database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const userRoutes = require("./routes/userRoutes");
const announceRoutes = require("./routes/announceRoutes");

// Routes
app.use("/", userRoutes);
app.use("/announces", announceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});