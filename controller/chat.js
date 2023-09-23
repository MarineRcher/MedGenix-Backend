const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const sendMessage = async (message) => {
  try {
    const { ID_project , content, time, ID_user } = message;
    const result = await pool.query('INSERT INTO chat (ID_project, content, time, end) VALUES (?, ?, ?, ?);', [ID_project, content, time, ID_user]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMessage;