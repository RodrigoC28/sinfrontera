const sequelize = require("sequelize");
const conexao = require("../config/database");

let Viagem = conexao.define(
    "viagem",
    {
        id_utilizador: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        id_autocarros: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        data: {
            type: sequelize.STRING,
            allowNull: false
        },
        hora_partida: {
            type: sequelize.STRING,
            allowNull: false
        },
        hora_chegada: {
            type: sequelize.STRING,
            allowNull: false
        },
        preco: {
            type: sequelize.STRING,
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
        tableName: "viagem",
        timestamps: true
    }
);

module.exports = Viagem;