const userRepo = require("../repositories/user.repository");

exports.getProfile = async (req, res) => {
  const user = await userRepo.getUserById(req.user.id);
  res.json(user);
};