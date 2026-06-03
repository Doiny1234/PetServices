// Punctul de intrare al serverului Express, unde se configurează și pornește serverul
require('dotenv').config();
// Importăm aplicația Express configurată în app.js
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serverul PetServices rulează pe: http://localhost:${PORT}`);
})