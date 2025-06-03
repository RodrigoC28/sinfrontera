const sequelize = require("sequelize");
const conexao = require("../config/database");

let Autocarro = conexao.define(
    "autocarro",
    {
        id_autocarro: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        matricula: {
            type: sequelize.STRING,
            allowNull: false
        },
        capacidade: {
            type: sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: "autocarro",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

module.exports = Autocarro;