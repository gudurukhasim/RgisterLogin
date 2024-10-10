const { connection } = require('../config/db');

// User model functions
const User = {
  // Check if user exists by email
  findByEmail: async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.query(sql, [email]);
    return rows[0]; // Return the first user found
  },

  // Create a new user
  create: async (username, email, password) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const result = await connection.query(sql, [username, email, password]);
    return result;
  },

  // Update user's password by email
  updatePassword: async (email, newPassword) => {
    const sql = 'UPDATE users SET password = ? WHERE email = ?';
    const result = await connection.query(sql, [newPassword, email]);
    return result;
  },

  // Find user by ID
  findById: async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await connection.query(sql, [id]);
    return rows[0];
  },
};

module.exports = User;
