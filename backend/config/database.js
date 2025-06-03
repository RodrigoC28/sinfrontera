const sequelize = require('sequelize');

const conexao = new sequelize("sinfrontera", "root", "", {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = conexao;