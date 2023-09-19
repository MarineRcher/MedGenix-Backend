const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const createProject = async (project) => {
  try {
    const { name, content, start, end, ID_user, status } = project;
    const result = await pool.query('INSERT INTO projects (name, content, start, end, ID_user, status) VALUES (?, ?, ?, ?, ?, ?);', [name, content, start, end, ID_user, status]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = createProject;