const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const review = await prisma.review.create({
      data: {
        bookingId,
        rating: parseInt(rating),
        comment
      }
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        booking: {
          include: {
            client: {
              select: { name: true }
            },
            service: {
              select: { title: true }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await prisma.review.delete({
      where: { id: req.params.id }
    });
    res.json({ message: "Review sters" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  deleteReview
};