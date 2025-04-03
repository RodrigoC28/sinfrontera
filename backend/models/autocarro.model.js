const sequelize = require("sequelize");
const conexao = require("../config/database");

let Autocarro = conexao.define(
    "autocarro",
    {
        id_autocarro: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        matricula: {
            type: sequelize.STRING,
            allowNull: false
        },
        capacidade: {
            type: sequelize.INTEGER,
            allowNull: false
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
        tableName: "autocarro",
        timestamps: true
    }
);

module.exports = Autocarro;