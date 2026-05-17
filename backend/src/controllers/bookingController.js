const bookingService = require('../services/bookingService');

// Creează o nouă programare (owner)
const createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.user.id, req.body);
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Vezi toate programările utilizatorului logat (owner)
const getUserBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getUserBookings(req.user.id);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Vezi toate programările primite de un furnizor (provider)
const getProviderBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getProviderBookings(req.user.id);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Provider acceptă / refuză programare
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await bookingService.updateBookingStatus(
            req.params.id,
            req.user.id,
            req.body.status
        );
        res.json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    getProviderBookings,
    updateBookingStatus
};