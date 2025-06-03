const sequelize = require("sequelize");
const conexao = require("../config/database");
const Autocarro = require("./autocarro.model");
const Paragem = require("./paragem.model");
const Utilizador = require("./utilizador.model");
const Destinos = require("./destinos.model");
const Venda = require("./venda.model"); 

let Viagem = conexao.define(
    "viagem",
    {
        id_viagem: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_autocarro: {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Autocarro,
                key: "id_autocarro",
            },
        },
        data: {
            type: sequelize.DATEONLY,
            allowNull: false,
        },
        hora_partida: {
            type: sequelize.TIME,
            allowNull: false,
        },
        hora_chegada: {
            type: sequelize.TIME,
            allowNull: false,
        },
        preco: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: "viagem",
        timestamps: true,
        createdAt: "dta_registo",
        updatedAt: "dta_atualizacao",
    }
);

// Associations
Viagem.belongsTo(Autocarro, {
  foreignKey: "id_autocarro",
  as: "autocarro",
});

Autocarro.hasMany(Viagem, {
  foreignKey: "id_autocarro",
  as: "viagens",
});

Viagem.belongsToMany(Paragem, {
  through: Destinos,
  foreignKey: "id_viagem",
  otherKey: "id_paragem", 
  as: "paragens",
});

Paragem.belongsToMany(Viagem, {
  through: Destinos,
  foreignKey: "id_paragem",
  otherKey: "id_viagem",
  as: "viagens",
});

Viagem.belongsToMany(Utilizador, {
  through: Venda,
  foreignKey: "id_viagem",
  otherKey: "id_utilizador",
  as: "utilizadoresReservados",
});

Utilizador.belongsToMany(Viagem, {
  through: Venda,
  foreignKey: "id_utilizador",
  otherKey: "id_viagem",
  as: "viagensReservadas",
});

module.exports = Viagem;