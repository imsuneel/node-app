const prisma = require("../config/prisma");

exports.saveToken = async (userId, token) => {
  return await prisma.refreshToken.create({
    data: {
      userId,
      token,
    },
  });
};

exports.findToken = async (token) => {
  return await prisma.refreshToken.findFirst({
    where: { token },
  });
};

exports.deleteToken = async (token) => {
  return await prisma.refreshToken.deleteMany({
    where: { token },
  });
};