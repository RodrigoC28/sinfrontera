const sequelize = require("sequelize");
const conexao = require("../config/database");

let Destinos = conexao.define(
    "viagem_paragem",
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
        id_paragem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'paragem',
                key: 'id_paragem',
            },
        },
        hora: {
            type: sequelize.TIME,
            allowNull: false,
        },
    },
    {
        tableName: "viagem_paragem",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

module.exports = Destinos;