const sequelize = require("sequelize");
const conexao = require("../config/database");

let Venda = conexao.define(
    "viagem_utilizador",
    {
        id_viagem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'viagem',
                key: 'id_viagem',
            },
        },
        id_utilizador: {
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'utilizador',
                key: 'id_utilizador',
            },
        },
        mtd_pagamento: {
            type: sequelize.STRING,
            allowNull: false
        },
        desconto: {
            type: sequelize.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
        n_passageiros: {
            type: sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: "viagem_utilizador",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

module.exports = Venda;