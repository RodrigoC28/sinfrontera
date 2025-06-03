const sequelize = require("sequelize");
const conexao = require("../config/database");

let Utilizador = conexao.define(
    "utilizador",
    {
        id_utilizador: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo_utilizador: {
            type: sequelize.STRING,
            allowNull: false,
            defaultValue: 'cliente'
        },
        nome: {
            type: sequelize.STRING,
            allowNull: false
        },
        sobrenome: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        telemovel: {
            type: sequelize.STRING,
            allowNull: true
        },
    },
    {
        tableName: "utilizador",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

module.exports = Utilizador;