const petService = require('../services/petService');

const createPet = async (req, res) => {
  try {
    const ownerId = req.user.id; // ID-ul extras din JWT de catre middleware 
    const { name, type, breed, age } = req.body;

    // Validare de baza conform Lab 3 [cite: 241]
    if (!name || !type) {
      return res.status(400).json({ error: 'Numele si tipul animalului sunt obligatorii.' });
    }

    const pet = await petService.registerPet({ ownerId, name, type, breed, age });
    return res.status(201).json(pet); // Succes: Created [
  } catch (error) {
    return res.status(500).json({ error: 'Eroare interna server.' });
  }
};

module.exports = { createPet };