const sequelize = require("sequelize");
const conexao = require("../config/database");

let Paragem = conexao.define(
    "paragem",
    {
        id_paragem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: sequelize.STRING,
            allowNull: false
        },
        coordenadas: {
            type: sequelize.STRING,
            allowNull: false
        },
    },
    {
        tableName: "paragem",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

module.exports = Paragem;