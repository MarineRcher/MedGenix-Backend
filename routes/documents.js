const express = require("express");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const addDocument = require('../controller/documents'); 
const router = express.Router();

router.post(
  "/addDocument",
  [
  ],
  async (req, res) => {
    try {
      const { ID_project, content, link, ID_user } = req.body;
      
      const documentId = await addDocument({
        ID_project  ,
        content,
        link,
        ID_user,
      });

      res.status(201).json({ message: "Document ajouté!", documentId: documentId.toString() });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'ajout du document" });
    }
  }
);

module.exports = router;
