const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const produtos = require('./src/model/Produtos')
const vendas = require('./src/model/Vendas')
const port = 4040
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

app.get('/produtos', produtos.getUsers)
app.get('/produtos/:id', produtos.getUserById)
app.post('/produtos', produtos.createUser)
app.put('/produtos/:id', produtos.updateUser)
app.delete('/produtos/:id', produtos.deleteUser)

app.get('/vendas', vendas.getVendas)
app.get('/vendas/:id', vendas.getVendasById)
app.post('/vendas', vendas.createVendas)
app.put('/vendas/:id', vendas.updateVendas)
app.delete('/vendas/:id', vendas.deleteVendas)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
