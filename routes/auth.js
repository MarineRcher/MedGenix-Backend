

const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const createUser = require('../models/user'); 
const router = express.Router();
const {login } = require("../models/user")

router.post(
  "/signup",
  [
    // Les validations du corps restent les mêmes...
  ],
  async (req, res) => {
    try {
      const { firstName, lastName, email, password, ID_project, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const userId = await createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        ID_project,
        role,
      });

      res.status(201).json({ message: "User created!", userId: userId.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  }
);

module.exports = router;


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(email);
    const logUser = await login({
      email,
      password,
    });

    if (logUser.error) {
      return res.status(401).json({ error: logUser.error });
    }

    // Vous pouvez ajouter le code pour générer et envoyer un jeton JWT ici pour l'authentification réussie.

    res.status(200).json({ message: "Logged in!", user: logUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
