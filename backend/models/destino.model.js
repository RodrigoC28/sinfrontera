const sequelize = require("sequelize");
const conexao = require("../config/database");

let Destino= conexao.define(
    "viagem_paragem",
    {
        id_viagem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        id_paragem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },

        hora: {
            type: sequelize.STRING,
            allowNull: false,
        },

        dta_registo: {
            type: sequelize.STRING,
            allowNull: true,
        },
        dta_atualizacao: {
            type: sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "viagem_paragem",
        timestamps: true,
    }
);

module.exports = Destino;