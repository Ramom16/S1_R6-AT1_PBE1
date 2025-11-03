const pool = require('../config/db');

const produtoModel = {
    //selecionar todos os produtos
    /**
     * @async 
     * @function selecionarTodos
     * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro da tabela
     * 
     * @example
     * const produtos = await produto.Model.selecionarTodos();
     * console.log(produtos);
     * // Saída esperada
     * [
     *  {id_produtos: 1, descricao: 'Teclado', valor: 150.00},
     *  {id_produtos: 2, descricao: 'Mouse', valor: 399.99}
     * ]
     */
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    /**
     * Seleciona um produto de acordo com o id_produto especificado
     * @async
     * @param {number} pId Identificador que deve se pesquisado no banco de dados
     * @returns {Promise<Array<Object>>}
     * 
     * @example
     * const produto = await produtoModel.selecionarPorId(1);
     * console.log(produto);
     * //Saída esperada
     * [
     *  {id_produtos: 1, descricao: 'Teclado', valor: 150.00}
     * ]
     */
    selecionarPorId: async (pId) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto =?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * Inclui um item novo no banco de dados 
     * @async
     * @param {String} pDescricao 
     * @param {number} pValor 
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as informações do comando executado
     * 
     * @example
     * const produtos = await produtoModel.inserirProduto('Produto teste', 16.99);
     * // Saída
     * "result": {
     *  "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 3,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0 serve para saber se ele foi alterado
     * }
     */
    inserirProduto: async (pDescricao, pValor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?,?)';
        const values = [pDescricao, pValor];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
/**
     * Altera um item existente no banco de dados
     * @async
     * @param {String} pDescricao 
     * @param {number} pValor 
     * @param {number} pId
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as informações do comando executado
     * 
     * @example
     * const produtos = await produtoModel.alterarProduto(1, 'Produto teste', 16.99);
     * // Saída
     * "result": {
     *  "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1 tem que aparecer 1 após o comando
     * }
     */
    alterarProduto: async ( pDescricao, pValor, pId) => {
        const sql = 'UPDATE produtos SET descricao=?, valor=? WHERE id_produto =?;'
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    deleteProduto: async (pId) => {
        const sql = "DELETE FROM produtos WHERE id_produto =?;";
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

module.exports = { produtoModel }