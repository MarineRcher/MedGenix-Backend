const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const {createProject} = require('../controller/projects');
const {getProjectByUserId} = require('../controller/projects');
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

      res.status(201).json({ message: "Projet crée!", projectid: projectid.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errreur lors de la création du projet" });
    }
  }
);
module.exports = router;

router.get(
    "/projectUser",
    async (req, res, next) => {
      try {
        const ID_user  = req.query;
        const project = await getProjectByUserId(ID_user );

        res.status(200).json({ message: "Project!", project: project?.toString() });
      }  catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur" });
      }

      next();
    }
);
module.exports = router;
