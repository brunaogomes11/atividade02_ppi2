const Game = require('../models/Game');
const mongoose = require('mongoose');

// Criar um novo game
const criarGame = async (req, res, next) => {
  try {
    const { titulo, genero, plataforma, lancamento } = req.body;

    const novoGame = await Game.create({
      titulo,
      genero,
      plataforma,
      lancamento
    });

    res.status(201).json({
      sucesso: true,
      mensagem: 'Game criado com sucesso!',
      dados: novoGame
    });
  } catch (error) {
    next(error);
  }
};

// Listar todos os games
const listarGames = async (req, res, next) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });

    res.status(200).json({
      sucesso: true,
      quantidade: games.length,
      dados: games
    });
  } catch (error) {
    next(error);
  }
};

// Buscar game por ID
const buscarGamePorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido'
      });
    }

    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Game não encontrado'
      });
    }

    res.status(200).json({
      sucesso: true,
      dados: game
    });
  } catch (error) {
    next(error);
  }
};

// Atualizar game
const atualizarGame = async (req, res, next) => {
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
        sucesso: false,
        mensagem: 'Game não encontrado'
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Game atualizado com sucesso!',
      dados: gameAtualizado
    });
  } catch (error) {
    next(error);
  }
};

// Deletar game
const deletarGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'ID inválido'
      });
    }

    const gameDeletado = await Game.findByIdAndDelete(id);

    if (!gameDeletado) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Game não encontrado'
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Game deletado com sucesso!',
      dados: gameDeletado
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
