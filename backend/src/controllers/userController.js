const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    // Înregistrează un nou utilizator folosind datele din req.body (name, email, password)
    const user = await userService.register(req.body);
    res.status(201).json(user); //201 Created
  } catch (err) {
    res.status(400).json({ error: err.message }); //400 Bad Request pentru erori de validare sau date incorecte
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extragem email și parolă din corpul cererii
    const result = await userService.login(email, password); // Așteptăm un obiect cu user și token
    res.json(result); //200 OK implicit, returnăm user și token
  } catch (err) {
    res.status(401).json({ error: err.message }); //401 Unauthorized pentru email/parolă incorecte
  }
};

module.exports = { register, login };