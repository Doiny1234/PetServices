const adminService = require('../services/adminService');

// USERS
const getUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.json({ message: "User șters cu succes" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BOOKINGS
const getBookings = async (req, res) => {
  try {
    const bookings = await adminService.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SERVICES
const deleteService = async (req, res) => {
  try {
    await adminService.deleteService(req.params.id);
    res.json({ message: "Service șters cu succes" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getBookings,
  deleteService
};