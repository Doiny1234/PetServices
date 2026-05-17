const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReview = async (data) => {
  return await prisma.review.create({
    data: {
      bookingId: data.bookingId,
      rating: data.rating,
      comment: data.comment
    }
  });
};
const getReviewsByService = async (serviceId) => {
  return await prisma.review.findMany({
    where: {
      booking: {
        serviceId: serviceId
      }
    },
    include: {
      booking: true
    }
  });
};
module.exports = { createReview, getReviewsByService };