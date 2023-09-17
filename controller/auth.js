const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {pool} = require('../db.js');

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const ID_project = req.body.ID_project;
  const role = req.body.role;

  try {
    const hashedPw = await bcrypt.hash(password, 6);
    
    const result = await pool.query('INSERT INTO users (email, password, firstName, lastName, ID_project, role) VALUES (?, ?, ?, ?, ?)', [email, hashedPw, firstName, lastName, ID_project, role]);
    return result.insertId;
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
module.exports = signup;

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id.toString(),
      },
      process.env.JWT_SECRET, // Assurez-vous de configurer cette clé JWT correctement
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, userId: user.id.toString() });
  } catch (error) {
    console.error(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
