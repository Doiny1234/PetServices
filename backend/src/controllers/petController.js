const petService = require('../services/petService'); // Importăm serviciul care conține logica de business pentru animalele de companie

//CREATE - Adaugă un nou animal de companie
const createPet = async (req, res) => {
  try {
    // Verificăm dacă utilizatorul este autentificat și avem ID-ul său în req.user.id (setat de middleware-ul de autentificare)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Utilizator neidentificat." });
    }

    //req.user.id este ID-ul utilizatorului logat, iar req.body conține datele noului animal (name, type, breed, age)
    const pet = await petService.createPet(req.user.id, req.body); //apelam funcția din petService pentru a crea un nou animal, asociat cu userul logat
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//READ ALL-Vezi toate animalele tale
const getPets = async (req, res) => {
  try {
    const pets = await petService.getPets(req.user.id);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Eroare la obținerea animalelor." });
  }
};

// 3. READ ONE - Vezi detaliile unui singur animal după ID
const getPetById = async (req, res) => {
  try {
  
    const pet = await petService.getPetById(req.params.id, req.user.id);
    if (!pet) return res.status(404).json({ error: "Animalul nu a fost găsit." });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. UPDATE - Modifică datele unui animal
const updatePet = async (req, res) => {
  try {
    // req.params.id vine din URL-ul rutei (:id)
    const result = await petService.updatePet(req.params.id, req.user.id, req.body);
    
    if (result.count === 0) {
      return res.status(404).json({ error: "Animalul nu a fost găsit sau nu ai permisiunea." });
    }
    
    res.json({ message: "Animal actualizat cu succes!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 5. DELETE - Șterge un animal
const deletePet = async (req, res) => {
  try {
    const result = await petService.deletePet(req.params.id, req.user.id);
    
    if (result.count === 0) {
      return res.status(404).json({ error: "Animalul nu a fost găsit sau nu ai permisiunea." });
    }
    
    res.json({ message: "Animal șters cu succes!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportăm TOATE funcțiile
module.exports = { 
  createPet, 
  getPets,
  getPetById, 
  updatePet, 
  deletePet 
};