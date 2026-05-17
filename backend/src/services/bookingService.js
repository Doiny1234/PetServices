const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creează o nouă programare în baza de date
const createBooking = async (clientId, data) => {
  const pet = await prisma.pet.findFirst({
    where: {
      id: data.petId,
      ownerId: clientId
    }
  });

  if (!pet) {
    throw new Error("Animalul selectat nu există sau nu îți aparține.");
  }

  const service = await prisma.service.findUnique({
    where: {
      id: data.serviceId
    }
  });

  if (!service) {
    throw new Error("Serviciul nu există.");
  }

  return await prisma.booking.create({
    data: {
      clientId,
      serviceId: data.serviceId,
      petId: data.petId,
      date: new Date(data.date),
      status: "pending",
      notes: data.notes || null
    },
    include: {
      pet: true,
      service: {
        include: {
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              location: true
            }
          }
        }
      }
    }
  });
};

// Obține toate programările primite de un provider la serviciile sale
const getProviderBookings = async (providerId) => {
    // 1. Luăm toate serviciile care aparțin acestui provider
    const providerServices = await prisma.service.findMany({
        where: { providerId: providerId },
        select: { id: true }
    });

    // Extragem array-ul de ID-uri
    const serviceIds = providerServices.map(s => s.id);

    // 2. Căutăm rezervările pentru acele servicii
    return await prisma.booking.findMany({
        where: {
            serviceId: {
                in: serviceIds
            }
        },
        include: {
            pet: true,
            service: true,
            client: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            }
        },
        orderBy: {
            date: 'asc'
        }
    });
};

// Actualizează statusul unei programări (doar providerul care oferă serviciul poate face asta)
const updateBookingStatus = async (bookingId, providerId, status) => {
  const allowedStatuses = ["confirmed", "cancelled"];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Status invalid. Folosește confirmed sau cancelled.");
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      service: {
        providerId
      }
    }
  });

  if (!booking) {
    throw new Error("Programarea nu a fost găsită sau nu vă aparține.");
  }

  return await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
    include: {
      pet: true,
      service: true,
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      }
    }
  });
};
// Obține toate programările unui client (owner)
const getUserBookings = async (clientId) => {
    return await prisma.booking.findMany({
        where: { clientId },
        include: {
            pet: true,
            service: true
        },
        orderBy: {
            date: 'asc'
        }
    });
};

module.exports = {
    createBooking,
    updateBookingStatus,
    getUserBookings,
    getProviderBookings
};