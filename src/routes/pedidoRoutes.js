const express = require('express');
const pedidoRoutes = express.Router();
const { pedidoController } = require('../controllers/pedidoController');

pedidoRoutes.post('/pedidos', pedidoController.criarPedido)
pedidoRoutes.post('/pedidos/item', pedidoController.criarItem);

module.exports = { pedidoRoutes }