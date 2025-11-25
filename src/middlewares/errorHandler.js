// Middleware centralizado para tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro capturado:', err);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const mensagens = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Erro de validação',
      erros: mensagens
    });
  }

  // Erro de cast (ID inválido do MongoDB)
  if (err.name === 'CastError') {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'ID inválido fornecido'
    });
  }

  // Erro de duplicação (chave única)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      sucesso: false,
      mensagem: `Já existe um registro com este ${campo}`
    });
  }

  // Erro genérico do servidor
  res.status(err.status || 500).json({
    sucesso: false,
    mensagem: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
