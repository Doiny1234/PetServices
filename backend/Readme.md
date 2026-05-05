# Specificație API - PetServices
# 10-15 endpoint-uri cu exemple request/response
### 📋 Specificație API - PetServices

| Nr. | Metodă |     Endpoint  |          Descriere                 | Auth (JWT) |
| :-- | :--- | :--- | :--- | :--- |
| 1 | **POST** | `/api/auth/register` | Înregistrare utilizator nou    | Nu |
| 2 | **POST** | `/api/auth/login` | Autentificare și generare token   | Nu |
| 3 | **GET** | `/api/pets` | Listarea animalelor proprii              | Da |
| 4 | **POST** | `/api/pets` | Înregistrarea unui animal nou           | Da |
| 5 | **GET** | `/api/services` | Vizualizarea serviciilor disponibile | Nu |
| 6 | **POST** | `/api/services` | Crearea unui serviciu (Provideri)   | Da |
| 7 | **GET** | `/api/services/:id` | Detaliile unui serviciu specific | Nu |
| 8 | **POST** | `/api/bookings` | Crearea unei rezervări              | Da |
| 9 | **GET** | `/api/bookings/my-requests` | Rezervările mele (Owner) | Da |
| 10 | **PATCH** | `/api/bookings/:id` | Confirmare/Anulare rezervare  | Da |
| 11 | **POST** | `/api/reviews` | Adăugarea unui review               | Da |
| 12 | **GET** | `/api/users/profile` | Vizualizarea profilului curent | Da |

# 1.Inregistrare animal (POST/api/pets)
Request Body:    
JSON                                  
{
  "name": "Rex",
  "type": "dog",
  "breed": "Beagle",
  "age": 4
}

Response (201 Created):
JSON
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "ownerId": "user-uuid-123",
  "name": "Rex",
  "type": "dog",
  "createdAt": "2023-11-15T10:00:00Z"
}

# 2.Creare Rezervare (POST /api/bookings)
Request Body:
JSON
{
  "serviceId": "service-uuid-456",
  "petId": "pet-uuid-789",
  "date": "2023-12-01T14:30:00Z",
  "notes": "Rex este puțin timid cu străinii."
}

Response (201 Created):
JSON
{
  "id": "booking-uuid-999",
  "status": "pending",
  "totalPrice": "50.00"
}

# 3.Înregistrare Utilizator Nou (POST /api/auth/register)

Request Body:
JSON
{
  "name": "Andrei Popescu",
  "email": "andrei@example.com",
  "password": "ParolaSigura123",
  "role": "owner"
}
Response (201 Created):

JSON
{
  "id": "u1-uuid-123",
  "message": "Utilizator creat cu succes!"
}

# 4.Autentificare (Login) (POST /api/auth/login)

Request Body:

JSON
{
  "email": "andrei@example.com",
  "password": "ParolaSigura123"
}

Response (200 OK):

JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "u1-uuid-123", "role": "owner" }
}

# 5.Creare Serviciu (pentru Provideri)

Endpoint: POST /api/services (Necesită Auth Token + Rol Provider)

Request Body:

JSON
{
  "title": "Plimbare câini - 1h",
  "description": "Plimbare activă în parcul central",
  "price": 50.00,
  "category": "Walking"
}
Response (201 Created):

JSON
{
  "id": "s1-uuid-789",
  "providerId": "u2-provider-uuid",
  "title": "Plimbare câini - 1h"
}

# 6.Creare Rezervare
Endpoint: POST /api/bookings (Necesită Auth Token)

Request Body:

JSON
{
  "serviceId": "s1-uuid-789",
  "petId": "p1-uuid-456",
  "date": "2023-12-01T10:00:00Z",
  "notes": "Vă rugăm să folosiți hamul propriu."
}
Response (201 Created):

JSON
{
  "id": "b1-uuid-000",
  "status": "pending",
  "message": "Rezervarea a fost creată și așteaptă confirmare."
}

# 7.Confirmare Rezervare (de către Provider)
Endpoint: PATCH /api/bookings/:id (Ex: /api/bookings/b1-uuid-000)

Request Body:

JSON
{
  "status": "confirmed"
}
Response (200 OK):

JSON
{
  "id": "b1-uuid-000",
  "status": "confirmed",
  "updatedAt": "2023-11-21T09:00:00Z"
}

# 8.Vizualizare Profil Curent
Endpoint: GET /api/users/profile (Necesită Auth Token)

Response (200 OK):

JSON
{
  "id": "u1-uuid-123",
  "name": "Andrei Popescu",
  "email": "andrei@example.com",
  "role": "owner",
  "createdAt": "2023-11-10T..."
}