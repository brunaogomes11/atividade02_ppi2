const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título do game é obrigatório'],
    trim: true
  },
  genero: {
    type: String,
    required: [true, 'O gênero do game é obrigatório'],
    trim: true
  },
  plataforma: {
    type: String,
    required: [true, 'A plataforma do game é obrigatória'],
    trim: true
  },
  lancamento: {
    type: Number,
    required: [true, 'O ano de lançamento é obrigatório'],
    min: [1950, 'O ano deve ser maior que 1950'],
    max: [new Date().getFullYear() + 5, 'O ano não pode ser muito no futuro']
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
