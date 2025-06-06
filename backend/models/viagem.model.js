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

Viagem.belongsTo(Autocarro, { foreignKey: "id_autocarro", as: "autocarro" });
Autocarro.hasMany(Viagem, { foreignKey: "id_autocarro", as: "viagens" });

// Associação Viagem <-> Condutor
// Se Condutor for importado, podes definir a associação aqui também
// const Condutor = require("./condutor.model"); // Pode ser necessário require aqui se houver ciclo
// Viagem.belongsTo(Condutor, { foreignKey: "id_condutor", as: "condutor" });
// Condutor.hasMany(Viagem, { foreignKey: "id_condutor", as: "viagens" });


// Associação Viagem <-> Paragem (via Destinos)
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

// Associação Viagem <-> Utilizador (via Venda)
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


Venda.belongsTo(Viagem, { foreignKey: 'id_viagem', as: 'viagem' });
Venda.belongsTo(Utilizador, { foreignKey: 'id_utilizador', as: 'utilizador' });

Destinos.belongsTo(Viagem, { foreignKey: 'id_viagem', as: 'viagem' });
Destinos.belongsTo(Paragem, { foreignKey: 'id_paragem', as: 'paragem' });

module.exports = Viagem;