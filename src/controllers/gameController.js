const Game = require('../models/Game');
const mongoose = require('mongoose');

// Criar um novo game
async function criarGame(req, res, next) {
  try {
    const { titulo, genero, plataforma, lancamento } = req.body;

    const novoGame = await Game.create({
      titulo,
      genero,
      plataforma,
      lancamento
    });

    res.status(201).json({
      mensagem: 'Game criado com sucesso!',
      dados: novoGame
    });
  } catch (error) {
    next(error);
  }
};

// Listar todos os games
async function listarGames(req, res, next) {
  try {
    const games = await Game.find().sort({ createdAt: -1 });

    res.status(200).json({
      quantidade_total: games.length,
      dados: games
    });
  } catch (error) {
    next(error);
  }
};

// Buscar game por ID
async function buscarGamePorId(req, res, next) {
  try {
    const { id } = req.params;

    // Validar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        mensagem: 'Game não encontrado'
      });
    }

    res.status(200).json({
      dados: game
    });
  } catch (error) {
    next(error);
  }
};

// Atualizar game
async function atualizarGame(req, res, next) {
  try {
    const { id } = req.params;
    const { titulo, genero, plataforma, lancamento } = req.body;

    // Validar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const gameAtualizado = await Game.findByIdAndUpdate(
      id,
      { titulo, genero, plataforma, lancamento },
      { 
        new: true, // Retorna o documento atualizado
        runValidators: true // Executa as validações do schema
      }
    );

    if (!gameAtualizado) {
      return res.status(404).json({
        mensagem: 'Game não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Game atualizado com sucesso!',
      dados: gameAtualizado
    });
  } catch (error) {
    next(error);
  }
};

// Deletar game
async function deletarGame(req, res, next) {
  try {
    const { id } = req.params;

    // Validar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const gameDeletado = await Game.findByIdAndDelete(id);

    if (!gameDeletado) {
      return res.status(404).json({
        mensagem: 'Game não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Game deletado com sucesso!'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarGame,
  listarGames,
  buscarGamePorId,
  atualizarGame,
  deletarGame
};
