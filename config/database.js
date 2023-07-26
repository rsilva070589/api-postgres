require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DB_NAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  })
  

  module.exports = {
    pool      
  }