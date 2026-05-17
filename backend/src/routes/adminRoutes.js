const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// doar admin are acces
router.use(authenticate);
router.use(authorize(['admin']));

// USERS
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

// BOOKINGS
router.get('/bookings', adminController.getBookings);

// SERVICES
router.delete('/services/:id', adminController.deleteService);

module.exports = router;