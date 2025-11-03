const express = require('express');
const  router = express.Router();

// Referecia do arquivo de rotas

const {clienteRoutes} = require('./clienteRoutes');
const { produtoRoutes } = require('./produtoRoutes');

router.use('/', clienteRoutes);
router.use('/', produtoRoutes);

module.exports = { router };