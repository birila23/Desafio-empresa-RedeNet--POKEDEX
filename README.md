# Desafio-empresa-RedeNet--POKEDEX

> Projeto desenvolvido por **Ana Beatriz Queiroz de Almeida** como parte do **desafio técnico para a vaga de estágio**.

Desenvolvimento de uma aplicação web que simula uma pokédex, que utiliza como base a PokéApi.

O backend é uma API REST desenvolvida em **Node.js/Express** com **TypeScript**, utilizando **Prisma ORM** e **PostgreSQL** como banco de dados.  
O frontend é uma interface simples em **HTML, CSS e JS** que consome a API.  

## 🚀 Tecnologias utilizadas
- **Backend**
  - Node.js + Express
  - TypeScript
  - Prisma ORM
  - PostgreSQL
  - JWT + Bcrypt
- **Infra**
  - Docker + Docker Compose
- **Frontend**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

## ⚙️ Configuração do ambiente

### Variáveis de ambiente (`.env` na pasta backend)

```env
PORT=3333
DATABASE_URL="postgresql://usuario:senha@db:5432/pokedex"
JWT_SECRET="sua_chave_secreta" 
```
## ▶️ Execução
### Com Docker Compose

 ```
 docker-compose up --build
```
API disponível em http://localhost:3333

Banco PostgreSQL disponível em localhost:5432

1 - Instalar dependências:
```
npm install
```

2 - Rodar migrações do Prisma:
```
npx prisma migrate dev
```

3 - Iniciar servidor:
```
npm run dev
```

### 📡 Endpoints principais
**Usuário:**

POST /cadastrarUsuario → Criação de usuário

POST /login → Autenticação + geração de token

**Pokédex:**

GET /pokedex/:userId → Lista Pokémons do usuário autenticado

POST /pokedex/:userId/add → Adiciona Pokémon na Pokédex

DELETE /pokedex/:userId/remove/:pokemonId → Remove Pokémon da Pokédex
