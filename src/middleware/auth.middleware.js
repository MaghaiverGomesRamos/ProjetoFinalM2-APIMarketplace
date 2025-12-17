// authMiddleware.js
import jwt from 'jsonwebtoken'; // Biblioteca JWT para criação e verificação de tokens

// Middleware de autenticação para rotas protegidas
// Garante que apenas requisições com token válido consigam acessar a rota
const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization; // Recupera o header Authorization

  // Valida se o header existe e segue o formato "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw { status: 401, message: "Token não fornecido." };
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do formato Bearer

  try {
    // Verifica e decodifica o token usando a chave secreta
    // Caso inválido ou expirado, cai no catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Anexa os dados do usuário decodificados na requisição
    next(); // Permite que a requisição continue para o próximo middleware ou controller
  } catch {
    throw { status: 401, message: "Token inválido ou expirado." }; // Resposta de erro em caso de token inválido
  }
};

export default authMiddleware; // Exporta o middleware para uso nas rotas protegidas
