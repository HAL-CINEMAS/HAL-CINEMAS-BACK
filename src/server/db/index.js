let mysql = require('mysql')

let db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'vendingm_mdb'
})

module.exports = db
