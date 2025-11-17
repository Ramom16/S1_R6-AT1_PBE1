const pool = require('../config/db');

const pedidoModel = {
    insertItem: async (pIdPedido, pIdProduto, pQuantidadeItem, pValorItem) => {
        try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            //insert 1 - tabela pedidos 
            const sqlPedido = 'INSERT INTO pedidos (id_cliente, valor_total, data_pedido) VALUES (?,?,?);'
            const valuesPedido = [pIdCliente, pQuantidadeItem * pValorItem, pDataPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);

            // insert 2 = tabela itens_pedido

            const sqlItem = 'INSERT INTO itens_pedidos (id_pedido_fk, id_produto_fk, quantidade, valor_item) VALUES (?,?,?,?);';
            const valuesItem = [rowsPedido.insertId, pIdProduto, pQuantidadeItem, pValorItem];
            const [rowsItem] = await connection.query(sqlItem, valuesItem);

            connection.commit();

            return { rowsPedido, rowsItem }
        } catch (error) {
            connection.rollback();
            throw error;
        }
    },
    insertItem: async (pIdPedido, pIdProduto, pQuantidadeItem, pValorItem) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const sqlItem = 'INSERT INTO itens_pedidos (id_pedido_fk, id_produto_fk, quantidade, valor_item) VALUES (?,?,?,?);';
            const valuesItem = [pIdPedido, pIdProduto, pQuantidadeItem, pValorItem]
            const [rowsItem] = await connection.query(sqlItem, valuesItem);

            const sqlPedido = 'UPDATE pedidos SET valor_total = valor_total +(?*?) WHERE id_pedido = ?';
            const valuesPedido = [pQuantidadeItem, pValorItem, pIdPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);

            connection.commit();
            return { rowsItem, rowsPedido };
        } catch (error) {
            connection.rollback();
            throw error;
        }
    }
};

module.exports = { pedidoModel };