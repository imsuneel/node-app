const db = require("../config/db");

exports.findByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.createUser = async (user) => {
  const { name, email, password } = user;
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result.insertId;
};

exports.getUserById = async (id) => {
  const [rows] = await db.execute("SELECT id, name, email FROM users WHERE id = ?", [id]);
  return rows[0];
};