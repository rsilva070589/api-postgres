require('dotenv').config()
const os = require('os');

const networkInfo = os.networkInterfaces();

 const meuIp = networkInfo.wlp3s0[0].address 


const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.DB_NAME,
    host: meuIp,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  })
  

  module.exports = {
    pool      
  }