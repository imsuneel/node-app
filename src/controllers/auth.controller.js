const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/jwt");
const refreshRepository = require('../repositories/refresh.repository');
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.json({token:result.accessToken});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  console.log("Cookies:", req.cookies);

  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const stored = await refreshRepository.findToken(token);
    if (!stored) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newAccessToken = generateAccessToken({ id: decoded.id });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};