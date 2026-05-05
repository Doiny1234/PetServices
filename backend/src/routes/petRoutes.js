const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const petController = require('../controllers/petController');

// Ruta pentru adaugare animal - protejata de autentificare
router.post('/', authenticate, petController.createPet);

module.exports = router;