import AuthService from '../service/auth.service.js';

const authService = new AuthService(); // Instancia o serviço de autenticação, que contém a lógica de registro, login e refresh token.

export class AuthController {

  // Endpoint para cadastro de novos usuários
  static async register(req, res) {
      // Chama o serviço de registro passando os dados do corpo da requisição
      const resultado = await authService.registerUser(req.body);

      // Retorna resposta com status 201 e dados do usuário recém-criado
      res.status(201).json({
         message: "Cadastro realizado com sucesso!",
         data: resultado,
      });
  }

  // Endpoint para login de usuários existentes
  static async login(req, res) {
    // Chama o serviço de login que valida credenciais e gera token JWT
    const resultado = await authService.loginUser(req.body);

    // Retorna resposta com status 200 e token gerado
    res.status(200).json({
      message: "Login realizado com sucesso!",
      data: resultado
    });
  }

  // Endpoint para renovação de token JWT
  static async refreshToken(req, res) {
    // Recupera o token do header Authorization
    const authHeader = req.headers.authorization;

    // Caso não exista header Authorization, lança erro de autenticação
    if (!authHeader) {
      throw { status: 401, message: "Nenhum token foi fornecido." };
    }

    const token = authHeader.split(" ")[1]; // Extrai o token do formato "Bearer <token>"
    
    // Chama o serviço que valida o token e retorna um novo token renovado
    const resultado = await authService.refreshToken(token);

    // Retorna resposta com status 200 e novo token
    res.status(200).json({
      message: "Token renovado com sucesso!",
      data: resultado
    });
  }
}
