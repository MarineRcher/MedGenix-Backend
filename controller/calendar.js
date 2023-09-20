const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const addEvent = async (eventadd) => {
  try {
    const { date, event, ID_user } = eventadd;
    const result = await pool.query('INSERT INTO Calendar (date, event, ID_user) VALUES (?, ?, ?);', [date, event, ID_user]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = addEvent;