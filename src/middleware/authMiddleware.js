// authMiddleware.js
import jwt from 'jsonwebtoken'; // Import do jwt

// A chave secreta deve ser armazenada em variáveis de ambiente!
const JWT_SECRET = 'sua_chave_super_secreta'; 

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (ex) {
    res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware; // Export default