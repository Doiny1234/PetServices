const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerPet = async (data) => {
  return await prisma.pet.create({
    data: {
      name: data.name,
      type: data.type,
      breed: data.breed,
      age: data.age,
      ownerId: data.ownerId
    }
  });
};

module.exports = { registerPet };