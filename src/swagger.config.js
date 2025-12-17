import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Marketplace',
    version: '1.0.0',
    description: 'Documentação da API do Marketplace',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Servidor local' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
    // ===== Auth =====
    RegisterInput: {
      type: 'object',
      required: ['name', 'email', 'password', 'role'],
      properties: {
        name: { type: 'string', example: 'Lucas' },
        email: { type: 'string', example: 'lucas@email.com' },
        password: { type: 'string', example: '123456' },
        role: { type: 'string', example: 'PROVIDER' },
      },
    },
    LoginInput: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', example: 'lucas@email.com' },
        password: { type: 'string', example: '123456' },
      },
    },
    AuthResponse: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'fb4493c0-da42-40e9-8be6-6c405478d169' },
            name: { type: 'string', example: 'Lucas' },
            email: { type: 'string', example: 'lucas@email.com' },
            role: { type: 'string', example: 'PROVIDER' },
          },
        },
      },
    },
    RefreshTokenResponse: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'novo_token_aqui' },
      },
    },

    // ===== Users =====
    UpdateUser: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Lucas Atualizado' },
        email: { type: 'string', example: 'lucas_novo@email.com' },
        password: { type: 'string', example: 'nova_senha' },
      },
    },

    // ===== Services =====
    CreateService: {
      type: 'object',
      required: ['title', 'price'],
      properties: {
        title: { type: 'string', example: 'Serviço de limpeza' },
        description: { type: 'string', example: 'Limpeza residencial' },
        price: { type: 'number', example: 100.0 },
        providerId: { type: 'string', example: 'fb4493c0-da42-40e9-8be6-6c405478d169' },
      },
    },
    UpdateService: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Serviço de limpeza atualizado' },
        description: { type: 'string', example: 'Descrição nova' },
        price: { type: 'number', example: 120.0 },
      },
    },
    Service: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        title: { type: 'string', example: 'Serviço de limpeza' },
        description: { type: 'string', example: 'Limpeza residencial' },
        price: { type: 'number', example: 100.0 },
        providerId: { type: 'string', example: 'fb4493c0-da42-40e9-8be6-6c405478d169' },
        createdAt: { type: 'string', format: 'date-time', example: '2025-12-17T12:00:00Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2025-12-17T12:00:00Z' },
        deletedAt: { type: 'string', format: 'date-time', nullable: true },
      },
    },
  },    
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/router/*.js', './src/controller/*.js'], // arquivos para varrer comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;