const sequelize = require("sequelize");
const conexao = require("../config/database");

let Venda = conexao.define(
    "viagem_utilizador",
    {
        id_viagem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        id_utilizador: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        mtd_pagamento: {
            type: sequelize.STRING,
            allowNull: false
        },
        n_pasaageiros: {
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
        tableName: "viagem_utilizador",
        timestamps: true
    }
);

module.exports = Venda;