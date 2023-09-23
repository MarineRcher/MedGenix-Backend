const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const createProject = require('../controller/projects'); 
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

router.get("/projectUser/:userID", async (req, res) => {
  try {
    const ID_user = req.params.ID_user;
    const projects = await getProjectByUserId(req, res,ID_user);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des projets de l'utilisateur" });
  }
});
module.exports = router;
