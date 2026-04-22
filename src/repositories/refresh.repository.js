const db = require("../config/db");

exports.saveToken = async (userId, token) => {
  await db.execute(
    "INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)",
    [userId, token]
  );
};

exports.findToken = async (token) => {
  const [rows] = await db.execute(
    "SELECT * FROM refresh_tokens WHERE token = ?",
    [token]
  );
  return rows[0];
};