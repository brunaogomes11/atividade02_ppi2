const express = require('express');
const router = express.Router();
const {
  criarGame,
  listarGames,
  buscarGamePorId,
  atualizarGame,
  deletarGame
} = require('../controllers/gameController');

// Rotas de Games
router.post('/', criarGame);           // Criar um novo game
router.get('/', listarGames);          // Listar todos os games
router.get('/:id', buscarGamePorId);   // Buscar game por ID
router.put('/:id', atualizarGame);     // Atualizar game
router.delete('/:id', deletarGame);    // Deletar game

module.exports = router;
