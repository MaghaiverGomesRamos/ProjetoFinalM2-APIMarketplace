# 🛒 API Marketplace - Projeto Final Módulo 2

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

**Versão:** 1.0.0  
**Módulo:** 2  
**SQUAD:** 5  
**Curso:** Programadores do Amanhã  
**Arquitetura:** MVC + Service Layer  
**Deploy:** Render  

---

## 🚀 Sobre o Projeto

A **API Marketplace** é uma plataforma desenvolvida como projeto final do **Módulo 2**, pela **SQUAD 5**, no curso **Programadores do Amanhã**, para gerenciar serviços e usuários em um marketplace.  

Ela permite:

- Usuários se cadastrarem como **PROVIDER** (fornecedores de serviços) ou **USER** (clientes).  
- **Providers** gerenciarem seus serviços (CRUD + soft delete e restauração).  
- **Users** visualizarem serviços disponíveis e consultarem providers.  

O projeto segue boas práticas modernas: autenticação JWT, hashing de senhas com **Bcrypt**, validação com **Zod**, soft delete, paginação, roles e documentação interativa via **Swagger**.

---

## 🔑 Funcionalidades

- Cadastro e login de usuários com **JWT**  
- CRUD de serviços apenas para **providers**  
- Soft delete e restauração de serviços  
- Listagem de serviços por provider ou todos os serviços  
- Atualização e exclusão de usuários logados  
- Autorização baseada em **roles** (`PROVIDER` e `USER`)  
- Validação rigorosa com **Zod**  
- Documentação completa e interativa via **Swagger**

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Runtime da aplicação |
| Express | Framework web |
| Prisma ORM | Banco de dados + migrations |
| JWT | Autenticação de usuários |
| Bcrypt | Hash de senhas |
| Zod | Validação de dados |
| Swagger | Documentação interativa |

---

## 📁 Estrutura do Projeto

src/
├─ controller/ # Controllers da API
├─ middleware/ # Middlewares (auth, role, validation, error)
├─ router/ # Rotas (auth, users, services)
├─ schema/ # Schemas de validação Zod
├─ service/ # Service Layer (lógica de negócio)
└─ generated/prisma # Prisma Client

yaml
Copiar código

---

## 🔐 Autenticação & Roles

- **JWT Bearer Token** obrigatório nas rotas privadas  
- Roles suportadas:
  - `PROVIDER`: gerencia seus próprios serviços  
  - `USER`: apenas visualiza serviços  

---

## 📌 Endpoints

### Auth

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Cadastro de usuário |
| POST | `/auth/login` | Login de usuário |
| POST | `/auth/refresh` | Renovação de token |

### Serviços

| Método | Rota | Roles | Descrição |
|--------|------|-------|-----------|
| POST | `/servicos` | PROVIDER | Cria novo serviço |
| PUT | `/servicos/:id` | PROVIDER | Atualiza serviço |
| DELETE | `/servicos/:id` | PROVIDER | Soft delete de serviço |
| PATCH | `/servicos/:id/restore` | PROVIDER | Restaura serviço deletado |
| GET | `/servicos` | Todos | Lista todos os serviços |
| GET | `/servicos/provider/:providerId` | Todos | Lista serviços de um provider específico |

### Usuários

| Método | Rota | Roles | Descrição |
|--------|------|-------|-----------|
| GET | `/users/:email` | Todos | Busca usuário pelo email |
| PUT | `/users/:id` | Logado | Atualiza dados do usuário logado |
| DELETE | `/users/:id` | Logado | Deleta usuário logado |

---

## 📑 Exemplo de Requisição

### Cadastro de usuário

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Lucas",
  "email": "lucas@email.com",
  "password": "123456",
  "role": "PROVIDER"
}
Resposta
json
Copiar código
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "fb4493c0-da42-40e9-8be6-6c405478d169",
    "name": "Lucas",
    "email": "lucas@email.com",
    "role": "PROVIDER"
  }
}
📚 Documentação Interativa
Acesse via Swagger:

bash
Copiar código
http://localhost:3000/api-docs
Permite testar todas as rotas, incluindo autenticação JWT.

⚡ Rodando Localmente
Clone o repositório:

bash
Copiar código
git clone <repo-url>
Instale dependências:

bash
Copiar código
npm install
Configure variáveis de ambiente:

env
Copiar código
DATABASE_URL="sqlite://./dev.db" # ou seu DB
JWT_SECRET="sua_chave_secreta"
Rode as migrations do Prisma:

bash
Copiar código
npx prisma migrate dev
Inicie o servidor:

bash
Copiar código
npm run dev
🌐 Deploy
Compatível com Render ou qualquer serviço Node.js.
Configure variáveis de ambiente e rode migrations no ambiente de produção.

🤝 Contribuição
Pull requests são bem-vindos.

Mantenha o padrão MVC + Service Layer

Consistência em middlewares, validação e roles

Documente novas rotas no Swagger

🎯 Créditos
SQUAD 5 - Módulo 2
Curso: Programadores do Amanhã

Maghaiver Gomes Ramos

[Victoria Ingrid, Cauã, Jamilli, Jhonathas, Rodrigo, Ana Carvalho]

📞 Contato
Email: magaiverg2@gmail.com
GitHub: https://github.com/MaghaiverGomesRamos
LinkedIn: https://www.linkedin.com/in/maghaiver-dev/

