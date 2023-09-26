const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const addTask = require('../controller/tasks'); 
const {getTaskByStatus} = require('../controller/tasks');
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

router.get(
  "/getTask",
  async (res, statue, state) => {
    try {

      const task = await getTaskByStatus({state});

      statue.status(201).json({ message: "Tâche!", task: task?.toString() });
    }  catch (error) {
      console.error(error);
      statue.status(500).json({ error: "Erreur" });
    }
  }
)



module.exports = router;
