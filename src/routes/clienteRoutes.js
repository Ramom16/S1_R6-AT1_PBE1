const express = require('express');
const clienteRoutes = express.Router();

const { clienteController } = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.post('/clientes', clienteController.inserirClientes);
clienteRoutes.get('/clientes/:id_cliente', clienteController.buscarClientesPorId);
clienteRoutes.delete('/clientes/:id_cliente', clienteController.excluirCliente);
clienteRoutes.put('/clientes/:id_cliente', clienteController.atualizarCliente);

module.exports = { clienteRoutes }