const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const bookingController = require('../controllers/bookingController');

// Toate rutele cer autentificare
router.use(authenticate);

// Rute Owner (Litere mici conform enum Prisma)
router.post('/', authorize(['owner']), bookingController.createBooking);
router.get('/my-bookings', authorize(['owner']), bookingController.getUserBookings);

// Rute Provider (Litere mici conform enum Prisma)
router.get('/provider', authorize(['provider']), bookingController.getProviderBookings);
router.put('/:id/status', authorize(['provider']), bookingController.updateBookingStatus);

module.exports = router;