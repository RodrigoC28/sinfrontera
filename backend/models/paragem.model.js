const sequelize = require("sequelize");
const conexao = require("../config/database");

let Paragem = conexao.define(
    "paragem",
    {
        id_paragem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        nome: {
            type: sequelize.STRING,
            allowNull: false
        },
        coordenadas: {
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
        tableName: "paragem",
        timestamps: true
    }
);

module.exports = Paragem;