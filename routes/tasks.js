const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const addTask = require('../controller/projects'); 
const router = express.Router();

router.post(
  "/addProject",
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

      res.status(201).json({ message: "Project created!", taskId: taskId.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating project" });
    }
  }
);

module.exports = router;
