const jwt = require('jsonwebtoken');

// Middleware pentru verificarea token-ului JWT
const authenticate = (req, res, next) => {
    
  // ia header-ul Authorization, care ar trebui să conțină token-ul în formatul "Bearer <token>"
  const authHeader = req.headers.authorization;

  // 2.Se verifica daca header-ul exista si incepe cu "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Acces neautorizat. Lipsesc credențialele (Token-ul).' 
    });
  }

  // Izolează token-ul propriu-zis
  const token = authHeader.split(' ')[1]; 

  try {
    //verifica daca token ul e valid si daca a fost semnat cu jwt secret din env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //atasez user la request
    next(); //daca e ok merge mai departe la controller
   
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token invalid sau expirat.' 
    });
  }
};

// Exportăm middleware-ul pentru a fi folosit în rutele care necesită autentificare
module.exports = { authenticate }; 