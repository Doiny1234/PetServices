const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createService = async (userId, data) => {
  return await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      location: data.location,
      providerId: userId
    }
  });
};

const getServices = async (query) => {
  return await prisma.service.findMany({
    where: {
      category: query.category
        ? {
            contains: query.category,
            mode: 'insensitive'
          }
        : undefined,

      provider: query.location
        ? {
            location: {
              contains: query.location,
              mode: 'insensitive'
            }
          }
        : undefined
    },

    include: {
      provider: true
    }
  });
};

const getServiceById = async (id) => {
  return await prisma.service.findUnique({
    where: { id },
    include: {
      provider: true
    }
  });
};

const getProviderServices = async (providerId) => {
  return await prisma.service.findMany({
    where: { providerId }
  });
};

const updateService = async (id, userId, data) => {
  return await prisma.service.updateMany({
    where: {
      id,
      providerId: userId
    },
    data
  });
};

const deleteService = async (id, userId) => {
  return await prisma.service.deleteMany({
    where: {
      id,
      providerId: userId
    }
  });
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getProviderServices,
  updateService,
  deleteService
};