# 🎮 API de Games

API REST para gerenciamento de uma coleção de games, desenvolvida com Node.js, Express e MongoDB.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Middlewares Implementados](#middlewares-implementados)
- [Rotas da API](#rotas-da-api)
- [Exemplos de Requisições](#exemplos-de-requisições)
- [Desafios Encontrados](#desafios-encontrados)
- [Autor](#autor)

---

## 🎯 Sobre o Projeto

Esta API foi desenvolvida como parte da **Atividade Avaliativa 02** da disciplina de Programação para Internet II (PPI2) do IFTM. O objetivo é fornecer um sistema completo de CRUD (Create, Read, Update, Delete) para gerenciar informações de jogos eletrônicos.

---

## ✨ Funcionalidades

A API permite:

- ✅ **Criar** um novo game
- ✅ **Listar** todos os games cadastrados
- ✅ **Buscar** um game específico pelo ID
- ✅ **Atualizar** informações de um game existente
- ✅ **Deletar** um game pelo ID

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB Atlas** - Banco de dados NoSQL em nuvem
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Middleware para permitir requisições cross-origin

---

## 📁 Estrutura do Projeto

```
atividade02_ppi2/
├── src/
│   ├── controllers/
│   │   └── gameController.js    # Lógica de negócio (CRUD)
│   ├── middlewares/
│   │   ├── errorHandler.js      # Middleware de tratamento de erros
│   │   └── logRequests.js       # Middleware de log de requisições
│   ├── models/
│   │   └── Game.js              # Schema do MongoDB
│   ├── routes/
│   │   └── gameRoutes.js        # Definição das rotas
│   ├── db.js                    # Configuração do banco de dados
│   └── server.js                # Inicialização do servidor
├── .env                         # Variáveis de ambiente (não versionado)
├── .env.example                 # Exemplo de variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências do projeto
└── README.md                    # Documentação
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no MongoDB Atlas
- Git

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd atividade02_ppi2
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
   
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/games_db?retryWrites=true&w=majority
   ```

4. **Configure o MongoDB Atlas:**
   
   - Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crie um cluster gratuito
   - Configure as credenciais de acesso
   - Obtenha a string de conexão
   - Adicione seu IP à whitelist

5. **Inicie o servidor:**
   
   **Modo desenvolvimento (com auto-reload):**
   ```bash
   npm run dev
   ```
   
   **Modo produção:**
   ```bash
   npm start
   ```

6. **Teste a API:**
   
   Acesse: `http://localhost:3000`

---

## 🔧 Middlewares Implementados

### 1. **Middlewares Globais**

- **`express.json()`** - Faz o parsing de requisições com JSON
- **`express.urlencoded()`** - Faz o parsing de dados de formulários
- **`cors()`** - Permite requisições de diferentes origens (cross-origin)

### 2. **Middleware de Log de Requisições** (`logRequests.js`)

**Função:** Registra no console cada requisição recebida pela API.

**Informações registradas:**
- Timestamp da requisição
- Método HTTP (GET, POST, PUT, DELETE)
- URL acessada
- Endereço IP do cliente

**Exemplo de log:**
```
[2025-11-24T10:30:45.123Z] POST /api/games - IP: ::1
```

### 3. **Middleware de Tratamento de Erros** (`errorHandler.js`)

**Função:** Centraliza o tratamento de erros da aplicação.

**Tipos de erros tratados:**

- ✅ **Erros de Validação** (ValidationError)
  - Ocorre quando dados obrigatórios não são fornecidos
  - Retorna status 400 com mensagens de validação

- ✅ **Erros de ID Inválido** (CastError)
  - Ocorre quando um ID do MongoDB está malformado
  - Retorna status 400

- ✅ **Erros de Duplicação** (código 11000)
  - Ocorre quando tenta-se inserir um valor duplicado em campo único
  - Retorna status 400

- ✅ **Erros Internos do Servidor**
  - Qualquer erro não previsto
  - Retorna status 500

---

## 🛣️ Rotas da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Health check da API |
| POST | `/api/games` | Criar um novo game |
| GET | `/api/games` | Listar todos os games |
| GET | `/api/games/:id` | Buscar game por ID |
| PUT | `/api/games/:id` | Atualizar game |
| DELETE | `/api/games/:id` | Deletar game |

---

## 📝 Exemplos de Requisições

### 1. Health Check

**Request:**
```http
GET http://localhost:3000/
```

**Response:**
```json
{
  "sucesso": true,
  "mensagem": "🎮 API de Games está rodando!",
  "versao": "1.0.0",
  "rotas": {
    "games": "/api/games"
  }
}
```

---

### 2. Criar um Novo Game

**Request:**
```http
POST http://localhost:3000/api/games
Content-Type: application/json

{
  "titulo": "The Legend of Zelda: Breath of the Wild",
  "genero": "Aventura",
  "plataforma": "Nintendo Switch",
  "lancamento": 2017
}
```

**Response (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Game criado com sucesso!",
  "dados": {
    "_id": "67433e8f5c8d2b001a2f3e5a",
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Aventura",
    "plataforma": "Nintendo Switch",
    "lancamento": 2017,
    "createdAt": "2025-11-24T10:30:00.000Z",
    "updatedAt": "2025-11-24T10:30:00.000Z"
  }
}
```

---

### 3. Listar Todos os Games

**Request:**
```http
GET http://localhost:3000/api/games
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "quantidade": 2,
  "dados": [
    {
      "_id": "67433e8f5c8d2b001a2f3e5a",
      "titulo": "The Legend of Zelda: Breath of the Wild",
      "genero": "Aventura",
      "plataforma": "Nintendo Switch",
      "lancamento": 2017,
      "createdAt": "2025-11-24T10:30:00.000Z",
      "updatedAt": "2025-11-24T10:30:00.000Z"
    },
    {
      "_id": "67433e8f5c8d2b001a2f3e5b",
      "titulo": "God of War",
      "genero": "Ação",
      "plataforma": "PlayStation 4",
      "lancamento": 2018,
      "createdAt": "2025-11-24T10:31:00.000Z",
      "updatedAt": "2025-11-24T10:31:00.000Z"
    }
  ]
}
```

---

### 4. Buscar Game por ID

**Request:**
```http
GET http://localhost:3000/api/games/67433e8f5c8d2b001a2f3e5a
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "_id": "67433e8f5c8d2b001a2f3e5a",
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Aventura",
    "plataforma": "Nintendo Switch",
    "lancamento": 2017,
    "createdAt": "2025-11-24T10:30:00.000Z",
    "updatedAt": "2025-11-24T10:30:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "sucesso": false,
  "mensagem": "Game não encontrado"
}
```

---

### 5. Atualizar Game

**Request:**
```http
PUT http://localhost:3000/api/games/67433e8f5c8d2b001a2f3e5a
Content-Type: application/json

{
  "titulo": "The Legend of Zelda: Breath of the Wild",
  "genero": "Aventura/RPG",
  "plataforma": "Nintendo Switch",
  "lancamento": 2017
}
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Game atualizado com sucesso!",
  "dados": {
    "_id": "67433e8f5c8d2b001a2f3e5a",
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Aventura/RPG",
    "plataforma": "Nintendo Switch",
    "lancamento": 2017,
    "createdAt": "2025-11-24T10:30:00.000Z",
    "updatedAt": "2025-11-24T10:35:00.000Z"
  }
}
```

---

### 6. Deletar Game

**Request:**
```http
DELETE http://localhost:3000/api/games/67433e8f5c8d2b001a2f3e5a
```

**Response (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Game deletado com sucesso!",
  "dados": {
    "_id": "67433e8f5c8d2b001a2f3e5a",
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "genero": "Aventura/RPG",
    "plataforma": "Nintendo Switch",
    "lancamento": 2017,
    "createdAt": "2025-11-24T10:30:00.000Z",
    "updatedAt": "2025-11-24T10:35:00.000Z"
  }
}
```

---

### 7. Exemplos de Erros

#### Erro de Validação (campo obrigatório faltando)

**Request:**
```http
POST http://localhost:3000/api/games
Content-Type: application/json

{
  "titulo": "God of War",
  "genero": "Ação"
}
```

**Response (400 Bad Request):**
```json
{
  "sucesso": false,
  "mensagem": "Erro de validação",
  "erros": [
    "A plataforma do game é obrigatória",
    "O ano de lançamento é obrigatório"
  ]
}
```

#### ID Inválido

**Request:**
```http
GET http://localhost:3000/api/games/123
```

**Response (400 Bad Request):**
```json
{
  "sucesso": false,
  "mensagem": "ID inválido"
}
```

---

## 🎓 Desafios Encontrados

### 1. **Configuração do MongoDB Atlas**

**Desafio:** Primeira vez configurando o MongoDB Atlas e entendendo strings de conexão.

**Solução:** 
- Estudei a documentação oficial do MongoDB
- Configurei corretamente a whitelist de IPs
- Utilizei variáveis de ambiente para proteger credenciais

### 2. **Validação de IDs do MongoDB**

**Desafio:** IDs inválidos causavam erros não tratados na aplicação.

**Solução:**
- Implementei validação usando `mongoose.Types.ObjectId.isValid()`
- Adicionei verificação nos controllers antes de consultas ao banco
- Criei tratamento específico no middleware de erros

### 3. **Estruturação do Projeto**

**Desafio:** Organizar o código de forma escalável e seguindo boas práticas.

**Solução:**
- Separei responsabilidades em camadas (Models, Controllers, Routes, Middlewares)
- Segui o padrão MVC adaptado para APIs REST
- Criei arquivos modulares e reutilizáveis

### 4. **Tratamento Centralizado de Erros**

**Desafio:** Erros apareciam de forma inconsistente e sem tratamento adequado.

**Solução:**
- Implementei middleware de erro centralizado
- Diferenciei tipos de erro (validação, cast, duplicação, servidor)
- Retornei respostas padronizadas e informativas

### 5. **Middleware de Log**

**Desafio:** Implementar um sistema de log eficiente para rastrear requisições.

**Solução:**
- Criei middleware customizado que registra timestamp, método, URL e IP
- Posicionei corretamente na cadeia de middlewares
- Formatei logs de forma clara e legível

---

## 👨‍💻 Autor

Desenvolvido por **[ADICIONE SEU NOME AQUI]** como parte da Atividade Avaliativa 02 - PPI2 - IFTM

**Matrícula:** [Sua matrícula]  
**Turma:** [Sua turma]  
**Data:** Novembro/2025

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

## 🔗 Links Úteis

- [Documentação Express.js](https://expressjs.com/)
- [Documentação Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Node.js](https://nodejs.org/)

---

**Última atualização:** 24/11/2025
