const prisma = require("../config/prisma");

exports.findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

exports.createUser = async ({ name, email, password }) => {
  return await prisma.user.create({
    data: { name, email, password },
  });
};

exports.getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};