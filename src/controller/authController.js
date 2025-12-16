import AuthService from '../services/AuthService.js';

const authService = new AuthService();

export class AuthController {

  static async register(req, res) {
    try {
      const resultado = await authService.registerUser(req.body);
      res.status(201).json({
        message: 'Cadastro realizado com sucesso!',
        data: resultado
      });
    } catch (erro) {
      if (erro.message.includes("obrigatórios") || erro.message.includes("Email já cadastrado")) {
        return res.status(400).json({ error: erro.message });
      }
      res.status(500).json({ error: "Ocorreu um erro inesperado. Por favor, tente novamente." });
    }
  }

  static async login(req, res) {
    try {
      const resultado = await authService.loginUser(req.body);
      res.json({
        message: 'Login realizado com sucesso!',
        data: resultado
      });
    } catch (erro) {
      if (erro.message.includes("não encontrado") || erro.message.includes("Senha inválida")) {
        return res.status(401).json({ error: "Email ou senha incorretos." });
      }
      res.status(500).json({ error: "Ocorreu um erro inesperado. Por favor, tente novamente." });
    }
  }

  static async refreshToken(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ error: "Nenhum token foi fornecido." });
      }

      const token = authHeader.split(' ')[1];
      const resultado = await authService.refreshToken(token);
      res.json({
        message: 'Token renovado com sucesso!',
        data: resultado
      });

    } catch (erro) {
      res.status(401).json({ error: "Token inválido ou expirado." });
    }
  }
}
