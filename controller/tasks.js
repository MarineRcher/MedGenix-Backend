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

const getTaskByStatus = async ({ state, ID_project }) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE state = ? and ID_project= ? ;', [state, ID_project]);

    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }


}


module.exports = {addTask, getTaskByStatus};