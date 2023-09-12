const database = require('../../config/database.js') 


const getVendas = (request, response) => {
  database.pool.query('SELECT * FROM mercearia.mercado_venda_itens_lucro ORDER BY id desc', (error, results) => {
    if (error) {
      response.status(500).send(`Ocorreu um ` + error) 
    }
    if (!error)
    response.status(200).json(results.rows) 
 
  })
}

const getVendasById = (request, response) => {
  const id = parseInt(request.params.id)

  database.pool.query('SELECT * FROM mercearia.vendas WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send(`Ocorreu um erro ao buscar Registros`)
      throw error
    }
    if (!error){
      response.status(200).json(results.rows)  }
  }).then(x => x)
}

 
 

const createVendas = async (request, response) => {

 
  let seqVenda = 0
  const SqlSeqVenda= ` select nextval('mercearia.vendas_id_seq')   `  
  await database.pool.query(SqlSeqVenda).then(x => {seqVenda=x.rows[0].nextval})


  async function postVenda (){
    console.log(`Registrando a venda:  ${seqVenda}`)
    
    const { COD_CLIENTE, COD_ENDERECO,VALOR,DESCONTO,FORMA_PGTO,TIPO_VENDA } = request.body

    const sqlInsertVenda = `INSERT INTO mercearia.vendas
    (id, cod_cliente, cod_endereco, valor, desconto, forma_pgto, tipo_venda)
    VALUES($1,$2,$3,$4,$5,$6,$7)`
    const parmVenda = [seqVenda,COD_CLIENTE, COD_ENDERECO,VALOR,DESCONTO,FORMA_PGTO,TIPO_VENDA]                          


    database.pool.query(sqlInsertVenda,parmVenda,(error, results) => {
    if (error) {      
    throw error
    }
    if (!error){        
    response.status(201).send(`Venda ID: ${seqVenda} cadastrada com sucesso` ) 
    }   
    })  
  }
  postVenda ()

  function postVendaItens(codItem,qtde, valor,desconto,custo) {
    
    const parmVendaItens = [ seqVenda,codItem,qtde, valor,desconto,custo]
    
    const sqlInsertVendaItens = `INSERT INTO mercearia.vendas_itens
                                (id, cod_produto, qtde, valor, desconto, custo)
                                  VALUES($1,$2,$3,$4,$5,$6)`   
                                          
  
    database.pool.query(sqlInsertVendaItens,parmVendaItens,(error, results) => {
      if (error) {      
        throw error
      }
      if (!error){  
        console.log(`Itens ${codItem} Cadastrado para a venda ${seqVenda} com Sucesso` ) 
        updateItensQtde(codItem, qtde) 
      }   
    })
  }
  
 async function updateItensQtde(cod_produto,qtde) {    
    const sqlUpdateQtdeItens = `UPDATE mercearia.produtos SET qtde_estoque=qtde_estoque - $1
                               where codigo_barras = $2
    `            
    database.pool.query(sqlUpdateQtdeItens,[qtde,cod_produto],(error, results) => {
      if (error) {      
        throw error
      }
      if (!error){  
        console.log(`Item ${cod_produto} diminuiu ${qtde} do estoque` )        
      }   
    })
  }
 
  request.body.ITENS.map(  x => {
    const itens = Object.assign({}, x);  
    postVendaItens(itens.COD_PRODUTO,itens.QTDE, itens.VALOR, itens.DESCONTO, itens.CUSTO)   
  }) 
}

  

const updateVendas= (request, response) => {
  const id = parseInt(request.params.id)  
  const { CATEGORIA, CODIGO_BARRAS,DESCRICAO,FOTO,NOME,SITUACAO,VALOR,VALOR_CUSTO,QTDE_ESTOQUE } = request.body

  database.pool.query(
    'UPDATE mercearia.vendas SET CATEGORIA = $1, CODIGO_BARRAS = $2,DESCRICAO = $3,FOTO = $4,NOME = $5,SITUACAO = $6,VALOR = $7,VALOR_CUSTO = $8,QTDE_ESTOQUE = $9 WHERE id = $10',
    [CATEGORIA, CODIGO_BARRAS,DESCRICAO,FOTO,NOME,SITUACAO,VALOR,VALOR_CUSTO,QTDE_ESTOQUE,id],
    (error, results) => {
      if (error) {
        response.status(400).send(`Ocorreu um erro ao Atualizar o ID: ${id}`)
        throw error
      }
      if (!error){
        response.status(200).send(`Vendas modified with ID: ${id}`)
      } 
      
    }
  )
}

const deleteVendas = (request, response) => {
  const id = parseInt(request.params.id)

  database.pool.query('DELETE FROM mercearia.vendas WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (!error){
      response.status(200).send(`Vendas modified with ID: ${id}`)
    }     
  })
}

module.exports = {
  getVendas,
  getVendasById,
  createVendas,
  updateVendas,
  deleteVendas,
}