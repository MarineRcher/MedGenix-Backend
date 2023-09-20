const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const sendMessage = require('../controller/projects'); 
const router = express.Router();

router.post(
  "/sendMessage",
  [
  ],
  async (req, res) => {
    try {
      const { ID_project, content, time, ID_user } = req.body;
      
      const chatId = await sendMessage({
        ID_project,
        content,
        time,
        ID_user,
      });

      res.status(201).json({ message: "Message envoyé!", chatId: chatId.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
  }
);

module.exports = router;
