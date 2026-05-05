const jwt = require('jsonwebtoken');

/**
 * Middleware pentru verificarea token-ului JWT
 */
const authenticate = (req, res, next) => {
  // 1. Extrage header-ul de autorizare
  const authHeader = req.headers.authorization;

  // 2. Verifică dacă header-ul există și are formatul "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Acces neautorizat. Lipsesc credențialele (Token-ul).' 
    });
  }

  // 3. Izolează token-ul propriu-zis
  const token = authHeader.split(' ')[1];

  try {
    // 4. Verifică semnătura token-ului folosind cheia secretă din .env
    // JWT_SECRET trebuie să fie același folosit la login/register
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Atașează datele decodate (ex: id, email, role) la obiectul req
    // Astfel, controllerele următoare vor ști cine face cererea prin req.user
    req.user = decoded;

    // 6. Mergi mai departe la controller
    next();
  } catch (error) {
    // Dacă token-ul a expirat sau a fost modificat
    return res.status(403).json({ 
      error: 'Token invalid sau expirat.' 
    });
  }
};

module.exports = { authenticate };