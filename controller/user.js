const { pool } = require('../db');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const createUser = async (user) => {
  try {
    const { firstName, lastName, email, password, ID_project, role } = user;
    const result = await pool.query('INSERT INTO users (firstName, lastName, email, password, ID_project, role) VALUES (?, ?, ?, ?, ?, ?);', [firstName, lastName, email, password, ID_project, role]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const rows = await pool.query('SELECT * FROM users WHERE email=?;', [email]);
   
    if (rows.length === 0) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const user = rows[0];
console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.ID_user.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, userId: user.ID_user.toString() });
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = { createUser, login };
