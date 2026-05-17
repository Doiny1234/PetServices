const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET ALL USERS
const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// DELETE USER
const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId }
  });
};

// GET ALL BOOKINGS
const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      client: true,
      service: true,
      pet: true
    }
  });
};

// DELETE SERVICE
const deleteService = async (serviceId) => {
  return await prisma.service.delete({
    where: { id: serviceId }
  });
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllBookings,
  deleteService
};