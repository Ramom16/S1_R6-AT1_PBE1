const express = require('express');
const router = express.Router();

// Referecia do arquivo de rotas

const { clienteRoutes } = require('./clienteRoutes');
const { produtoRoutes } = require('./produtoRoutes');
const { pedidoRoutes } = require('./pedidoRoutes');

router.use('/', clienteRoutes);
router.use('/', produtoRoutes);
router.use('/', pedidoRoutes);

module.exports = { router };