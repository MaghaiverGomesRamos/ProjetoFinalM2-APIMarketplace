// roleMiddleware.js

const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // ASSUME que o Auth Middleware já rodou e preencheu req.user
    if (!req.user || !req.user.roles) {
      return res.status(500).json({ message: 'Erro de Autenticação/Configuração. Usuário não autenticado.' });
    }

    // Verifica se ALGUMA das roles do usuário está nas roles permitidas
    const userHasPermission = req.user.roles.some(role => 
      allowedRoles.includes(role)
    );

    if (userHasPermission) {
      next(); // Usuário autorizado.
    } else {
      // Acesso negado
      res.status(403).json({ message: 'Acesso negado. Você não tem a permissão necessária.' });
    }
  };
};

export default roleMiddleware; // Export default