const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

router.get('/service/:serviceId', reviewController.getReviewsByService);
router.post('/', authenticate, reviewController.createReview);

module.exports = router;