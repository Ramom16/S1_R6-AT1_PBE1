const pool = require('../config/db')

const clienteModel = {
    selecionarTodosClientes: async () => {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await pool.query(sql);
        return rows;
    },
    criarClientes: async (pNome, pCpf) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [pNome, pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    //criei esse comando que vai buscar um cpf existente para que não haja um cpf duplicado na hora de inserir
    buscarPorCPF: async (cpf_cliente) => {
        try {
            const [rows] = await pool.query('SELECT * FROM clientes WHERE cpf_cliente = ?', [cpf_cliente]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar CPF:', error);
            throw error;
        }
    }
}

module.exports = { clienteModel }