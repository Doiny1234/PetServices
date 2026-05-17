const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getReviewsByService = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByService(req.params.serviceId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReview, getReviewsByService };