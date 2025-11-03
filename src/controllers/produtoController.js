const { produtoModel } = require('../models/produtosModels');

const produtoController = {
    /**
     * Retorn os produtos cadastrados no banco de dados
     * Rota: get/produtos
     * @asyn
     * 
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
     */
    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();
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
    /**
     * Retorna o produto referente ao id_produto pesquisado
     * Rota: get/produtos/:idProduto
     * @asyn
     * @function buscarProdutosPorId
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
     */

    buscarProdutosPorId: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Informe  um identificador (ID) válido' })
            }
            const resultado = await produtoModel.selecionarPorId(id);
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    /**
     * Cria um novo item no banco de dados
     * Rota: post/produtos/
     * @async
     * @function incluirProduto
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Object>} Retorna objeto contendo as informações sobre o resultado do insert
     */
    incluirProduto: async (req, res) => {
        try {
            const { descricao, valor } = req.body;
            if (!String(descricao) || descricao.length < 3 || valor <= 0) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }
            const resultado = await produtoModel.inserirProduto(descricao, valor);

            // usei esse comando pois o resultado tava sendo indefinido 
            if (!resultado) {
                throw new Error('Nenhum resultado retornado do banco de dados');
            }

            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                res.status(201).json({ message: 'Registro incluído com sucesso', result: resultado })
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },

    atualizarProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);
            let { descricao, valor } = req.body;

            descricao = descricao.trim();
            if (!idProduto || !descricao || !valor || typeof idProduto !== 'number' || !isNaN(descricao) || isNaN(valor) || descricao.length < 3) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const produtoAtual = await produtoModel.selecionarPorId(idProduto);
            if (produtoAtual.length === 0) {
                throw new Error('Registro não localizado');
            }

            const novaDescricao = descricao ?? produtoAtual[0].descricao;
            const novoValor = valor ?? produtoAtual[0].valor;

            const resultado = await produtoModel.alterarProduto( novaDescricao, novoValor, idProduto)


            if (!resultado || resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o produto');
            }

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado })

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    excluirProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);

            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um ID válido' });
            }

            const produtoSelecionado = await produtoModel.selecionarPorId(id);
            console.log(produtoSelecionado);

            if (produtoSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            } else {
                const resultado = await produtoModel.deleteProduto(id);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Produto excluido com sucesso', data: resultado })
                } else {
                    throw new Error('Não foi possivel excluir o produto');
                }
            }


        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }
}

module.exports = { produtoController };