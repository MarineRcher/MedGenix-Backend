const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const createProject = require('../controller/projects'); 
const router = express.Router();

router.post(
  "/addProject",
  [
  ],
  async (req, res) => {
    try {
      const { name, content, start, end, ID_user, status } = req.body;
      
      const projectid = await createProject({
        name,
        content,
        start,
        end,
        ID_user,
        status,
      });

      res.status(201).json({ message: "Project created!", projectid: projectid.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating project" });
    }
  }
);

module.exports = router;
