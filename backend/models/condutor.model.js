const sequelize = require("sequelize");
const conexao = require("../config/database");
const Viagem = require("./viagem.model");

let Condutor = conexao.define(
    "condutor",
    {
        id_condutor: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_viagem: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Viagem,
                key: "id_viagem",
            },
        },
        nome: {
            type: sequelize.STRING,
            allowNull: false,
        },
        idade: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        genero: {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "condutor",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

Condutor.belongsTo(Viagem, {
    foreignKey: "id_viagem",
    as: "viagem",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

Viagem.hasMany(Condutor, { foreignKey: 'id_viagem', as: 'condutores' });

module.exports = Condutor;