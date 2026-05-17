const express = require('express'); // Importăm framework-ul Express pentru a crea serverul și rutele API-ului
const router = express.Router(); // Cream un router separat pentru resursa Pets, care va fi conectat în app.js
const { authenticate } = require('../middleware/authMiddleware');
const petController = require('../controllers/petController');

// Toate rutele de mai jos cer autentificare
router.use(authenticate);

// Definim rutele pentru gestionarea animalelor de companie, toate protejate de middleware-ul de autentificare
router.post('/', petController.createPet); // POST /api/pets - adaugă un nou animal pentru userul logat
router.get('/', petController.getPets); // GET /api/pets - returnează toate animalele userului logat
router.get('/:id', petController.getPetById); // GET /api/pets/:id - returnează un animal specific după ID, doar dacă aparține userului logat
router.put('/:id', petController.updatePet);    // PUT /api/pets/:id - actualizează un animal specific după ID, doar dacă aparține userului logat
router.delete('/:id', petController.deletePet); // DELETE /api/pets/:id - șterge un animal specific după ID, doar dacă aparține userului logat

module.exports = router; 
