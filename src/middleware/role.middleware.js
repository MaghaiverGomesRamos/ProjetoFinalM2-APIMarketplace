// Middleware para controle de acesso baseado em roles/permissões
// Recebe um array de roles permitidas e verifica se o usuário autenticado tem permissão
const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {

    // Garante que o usuário está autenticado e que seu objeto contém role
    if (!req.user || !req.user.role) {
      throw { status: 401, message: "Usuário não autenticado." };
    }

    // Verifica se o role do usuário está entre os permitidos para a rota
    if (!allowedRoles.includes(req.user.role)) {
      throw { status: 403, message: "Você não tem permissão para acessar este recurso." };
    }

    // Se passar nas validações, permite continuação da requisição
    next();
  };
};

export default roleMiddleware; // Exporta middleware para uso em rotas protegidas
