const database = require('../../config/database.js') 


const getUsers = (request, response) => {
  database.pool.query('SELECT * FROM mercearia.categorias ORDER BY ID', (error, results) => {
    if (error) {
      response.status(500).send(`Ocorreu um ` + error) 
    }
    if (!error)
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  database.pool.query('SELECT * FROM mercearia.categorias WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send(`Ocorreu um erro ao buscar Registros`)
      throw error
    }
    if (!error){
      response.status(200).json(results.rows)
    }
    
  })
}

const createUser = (request, response) => {
  const { CATEGORIA } = request.body

  database.pool.query('INSERT INTO mercearia.categorias (descricao)  VALUES ($1) RETURNING *', 
                [CATEGORIA],
                 (error, results) => {
    if (error) {             
      console.log('produto nao cadastrado'+ CATEGORIA)
    }
    if (!error){
      response.status(201).send(`Produto cadastrado: ${results.rows[0]}`)
    }
    
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)  
  const { CATEGORIA, CODIGO_BARRAS,DESCRICAO,FOTO,NOME,SITUACAO,VALOR,VALOR_CUSTO,QTDE_ESTOQUE } = request.body

  database.pool.query(
    'UPDATE mercearia.categorias SET CATEGORIA = $1, CODIGO_BARRAS = $2,DESCRICAO = $3,FOTO = $4,NOME = $5,SITUACAO = $6,VALOR = $7,VALOR_CUSTO = $8,QTDE_ESTOQUE = $9 WHERE id = $10',
    [CATEGORIA, CODIGO_BARRAS,DESCRICAO,FOTO,NOME,SITUACAO,VALOR,VALOR_CUSTO,QTDE_ESTOQUE,id],
    (error, results) => {
      if (error) {
        response.status(400).send(`Ocorreu um erro ao Atualizar o ID: ${id}`)
        throw error
      }
      if (!error){
        response.status(200).send(`User modified with ID: ${id}`)
      } 
      
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  database.pool.query('DELETE FROM mercearia.produtos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (!error){
      response.status(200).send(`User modified with ID: ${id}`)
    }     
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}