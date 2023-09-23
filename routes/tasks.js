const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const addTask = require('../controller/projects'); 
const router = express.Router();

router.post(
  "/addTask",
  [
  ],
  async (req, res) => {
    try {
      const { ID_project, content, state} = req.body;
      
      const taskId = await addTask({
        ID_project,
        content,
        state,
      });

      res.status(201).json({ message: "Tâche ajoutée!", taskId: taskId.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'ajout de la tâche" });
    }
  }
);



module.exports = router;
