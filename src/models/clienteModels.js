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
    },
    alterarCliente: async (pNome_Cliente, pCpf_Cliente, pId_Cliente) => {
        const sql = 'UPDATE clientes SET nome_cliente = ?, cpf_cliente = ? WHERE id_cliente = ?;';
        const values = [pNome_Cliente, pCpf_Cliente, pId_Cliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selecionarClientePorId: async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente =?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    deleteCliente: async (pId) => {
        const sql = "DELETE FROM clientes WHERE id_cliente =?;";
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = { clienteModel }