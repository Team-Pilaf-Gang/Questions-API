const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  password: 'postword',
  host: 'localhost',
  port: 5432,
  database: 'qandadb'
});

db.connect(err => err ? console.log('ERROR DURING CONNECTION', err) : console.log('connected to QandAdB'))

module.exports = { db };