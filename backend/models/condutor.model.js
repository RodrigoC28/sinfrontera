const sequelize = require("sequelize");
const conexao = require("../config/database");

let Condutar = conexao.define(
    "condutor",
    {
        id_condutor: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
        },
        id_viagem: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        nome: {
            type: sequelize.STRING,
            allowNull: false
        },
        genero: {
            type: sequelize.STRING,
            allowNull: false
        },
        idade: {
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
        tableName: "condutor",
        timestamps: true
    }
);

module.exports = Condutor;