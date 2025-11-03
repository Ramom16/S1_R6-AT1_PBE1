const { clienteModel } = require('../models/clienteModels');

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodosClientes();
            console.log(resultado)
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    inserirClientes: async (req, res) => {
        try {
            const { nome_cliente, cpf_cliente } = req.body;
            if (!nome_cliente || typeof nome_cliente !== "string" || nome_cliente.trim().length < 3 || cpf_cliente.length != 11 || typeof cpf_cliente !== 'string') {
                return res.status(404).json({ message: 'Dados inválidos' });
            }

            // Verificação para validar o cpf duplicado com erro de status 409, mesmo tendo UNIQUE no banco de dados
            const clienteExistente = await clienteModel.buscarPorCPF(cpf_cliente);
            if (clienteExistente.length > 0) {
                return res.status(409).json({ message: 'CPF já está cadastrado' });
            }

            // Criação do cliente
            const resultado = await clienteModel.criarClientes(nome_cliente, cpf_cliente);

            if (!resultado) {
                throw new Error('Nenhum resultado retornado do banco de dados');
            }

            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                res.status(201).json({ message: 'Registro incluído com sucesso', result: resultado });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
}

module.exports = { clienteController }