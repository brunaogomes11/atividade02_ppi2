require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logRequests = require('./middlewares/logRequests');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Middlewares globais
app.use(cors()); // Permitir requisições de diferentes origens
app.use(express.json()); // Parser de JSON
app.use(express.urlencoded({ extended: true })); // Parser de URL encoded
app.use(logRequests); // Middleware de log de requisições

// Rota de health check
app.get('/', function(req, res) {
  res.json({
    sucesso: true,
    mensagem: '🎮 API de Games está rodando!',
    versao: '1.0.0',
    rotas: {
      games: '/api/games'
    }
  });
});

// Rotas da API
app.use('/api/games', gameRoutes);

// Rota para endpoints não encontrados
app.use(function(req, res) {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada'
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, function() {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
