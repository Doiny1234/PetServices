const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//userData -> {name, email, password} din req.body 
const register = async (userData) => {
  // Criptăm parola înainte de salvare
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  // Creăm un nou utilizator în baza de date cu parola criptată și rolul implicit "owner"
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'owner'
    }
  });
};


const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Utilizator negăsit'); //daca nu gaseste userul dupa email, aruncam eroare

  //comparam parola introdusă cu cea stocată în baza de date folosind bcrypt.compare
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Parolă incorectă');

  // Generăm token-ul real cu ID-ul utilizatorului
const token = jwt.sign(
  { id: user.id, 
    role: user.role },
    
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);
  
  return { user, token };
};

module.exports = { register, login };