const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const addEvent = require('../controller/calendar'); 
const router = express.Router();

router.post(
  "/addEvent",
  [
  ],
  async (req, res) => {
    try {
      const { date, event, ID_user } = req.body;
      
      const eventid = await addEvent({
        date,
        event,
        ID_user,
      });

      res.status(201).json({ message: "Evènement crée!", eventid: eventid.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création de l'évènement" });
    }
  }
);

module.exports = router;
