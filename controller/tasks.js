const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const addTask = async (task) => {
  try {
    const { ID_project, content, state } = task;
    const result = await pool.query('INSERT INTO tasks (ID_project, content, state) VALUES (?, ?, ?);', [ID_project, content, state]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const getTaskByStatus = async (statue) => {
  try {
  const result = await pool.query('SELECT * FROM projects WHERE status = ?;', [statue]);
  return result.insertTask;
} catch (error) {
  throw error;
}

}

module.exports = {addTask, getTaskByStatus};