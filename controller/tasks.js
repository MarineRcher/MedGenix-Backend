const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const addTask = async (project) => {
  try {
    const { ID_project, content, state } = project;
    const result = await pool.query('INSERT INTO projects (ID_project, content, state) VALUES (?, ?, ?);', [ID_project, content, state]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = addTask;