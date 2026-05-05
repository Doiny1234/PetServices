const express = require('express');
const cors = require('cors');
const petRoutes = require('./src/routes/petRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // Permite serverului să înțeleagă date JSON

// Rută de verificare (Health Check)
app.get('/', (req, res) => {
    res.json({ status: "OK", message: "API-ul PetServices este activ!" });
});

// Conectăm rutele
app.use('/api/pets', petRoutes);

module.exports = app;