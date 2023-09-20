const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const addDocument = async (document) => {
  try {
    const { ID_project, content, link, ID_user } = document;
    const result = await pool.query('INSERT INTO projects (ID_project  , content, link, ID_user) VALUES (?, ?, ?, ?);', [ID_project , content, link, ID_user]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = addDocument;