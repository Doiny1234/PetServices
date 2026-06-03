// Importăm framework-ul Express pentru a crea serverul și rutele API-ului
const express = require('express');
//importam middleware-ul CORS (permite frontend-ului să acceseze resursele API-ului )
const cors = require('cors'); 
// Importăm rutele pentru gestionarea animalelor de companie și autentificării
const petRoutes = require('./src/routes/petRoutes');
const userRoutes = require('./src/routes/userRoutes'); 
const serviceRoutes = require('./src/routes/serviceRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
//cream aplicatia Express
const app = express();

// Middleware pentru a permite cereri din orice origine (CORS)
app.use(cors()); 
//express json middleware parseaza corpul cererii
app.use(express.json()); //transforma json in obiect js si il pune in req.body
app.use('/api/reviews', require('./src/routes/reviewRoutes'));

// Rută de verificare (Health Check)
app.get('/', (req, res) => {
    res.json({ status: "OK", message: "API-ul PetServices este activ!" });
});

// Conectăm rutele
app.use('/api/auth', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
