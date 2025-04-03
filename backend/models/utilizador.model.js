const sequelize = require("sequelize");
const conexao = require("../config/database");

let Utilizador = conexao.define(
    "utilizador",
    {
        id_utilizador: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo_utilizador: {
            type: sequelize.STRING,
            allowNull: false
        },
        nome: {
            type: sequelize.STRING,
            allowNull: false
        },
        sobrenome: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        telemovel: {
            type: sequelize.STRING,
            allowNull: true
        },
        dta_registo: {
            type: sequelize.STRING,
            allowNull: true
        },
        dta_atualizacao: {
            type: sequelize.STRING,
            allowNull: true
        },
    },
    {
        tableName: "utilizador",
        timestamps: true
    }
);

module.exports = Utilizador;