const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const produtos = require('./src/model/Produtos')
const vendas = require('./src/model/Vendas')
const categoria = require('./src/model/Categoria')
const formapagamento = require('./src/model/FormasPagamento')
const financeiro = require('./src/model/Financeiro')
const port = 4141
var cors = require('cors');

app.use(bodyParser.json()).use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/financeiro', financeiro.get)
app.post('/periodofinanceiro/', financeiro.getById)
app.post('/financeiro', financeiro.create)
app.put('/financeiro/:id', financeiro.update)
app.delete('/financeiro/:id', financeiro.deleteId)

app.get('/produtos', produtos.getUsers)
app.get('/produtos/:id', produtos.getUserById)
app.post('/produtos', produtos.createUser)
app.put('/produtos/:id', produtos.updateUser)
app.delete('/produtos/:id', produtos.deleteUser)

app.get('/vendas', vendas.getVendas)
app.post('/periodovendas', vendas.getVendasById)
app.post('/vendas', vendas.createVendas)
app.put('/vendas/:id', vendas.updateVendas)
app.delete('/vendas/:id', vendas.deleteVendas)

app.get('/categoria', categoria.getUsers)
app.get('/categoria/:id', categoria.getUserById)
app.post('/categoria', categoria.createUser)
app.put('/categoria/:id', categoria.updateUser)
app.delete('/categoria/:id', categoria.deleteUser)

app.get('/formapagamento', formapagamento.getUsers)
app.get('/formapagamento/:id', formapagamento.getUserById)
app.post('/formapagamento', formapagamento.createUser)
app.put('/formapagamento/:id', formapagamento.updateUser)
app.delete('/formapagamento/:id', formapagamento.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
