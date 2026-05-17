const { PrismaClient } = require('@prisma/client'); 
//comunicare cu baza de date folosind Prisma ORM
//primeste date de la cotroller,pentru a face operatii CRUD pe tabela Pet, asociate cu un utilizator (ownerId) in baza de date folosind prisma

const prisma = new PrismaClient();
// Funcție pentru a crea un nou animal de companie în baza de date, asociat cu un utilizator (ownerId)
const createPet = async (userId, data) => {
  return await prisma.pet.create({
    data: {
      name: data.name,
      type: data.type,
      breed: data.breed,
      age: data.age,
      ownerId: userId
    }
  });
};

//returnează toate animalele userului logat
const getPets = async (userId) => {
  return await prisma.pet.findMany({
    where: { ownerId: userId }
  });
};

// Vezi detaliile unui singur animal după ID, doar dacă aparține userului logat
const getPetById = async (petId, userId) => {
    return await prisma.pet.findFirst({
        where: { id: petId, ownerId: userId }
    });
};

// UPDATE - Modifică datele unui animal
const updatePet = async (petId, userId, data) => {
  return await prisma.pet.updateMany({
    where: { id: petId, ownerId: userId }, // Asigurăm că doar proprietarul poate actualiza animalul
    data: data
  });
};

// DELETE - Șterge un animal
const deletePet = async (petId, userId) => {
  return await prisma.pet.deleteMany({
    where: { id: petId, ownerId: userId }
  });
};

module.exports = {createPet, getPets,getPetById, updatePet, deletePet };