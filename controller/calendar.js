const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const addDocument = async (document) => {
  try {
    const { date, event, ID_user } = document;
    const result = await pool.query('INSERT INTO Calendar (date, event, ID_user) VALUES (?, ?, ?);', [date, event, ID_user]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = addDocument;