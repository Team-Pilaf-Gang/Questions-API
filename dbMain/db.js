const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DB
});

db.connect(err => err ? console.log('ERROR DURING CONNECTION', err) : console.log('connected to QandAdB'))

module.exports = { db };