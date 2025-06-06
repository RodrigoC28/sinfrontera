const Viagem = require("../models/viagem.model");
const Paragem = require("../models/paragem.model");
const ViagemParagem = require("../models/destinos.model");

const destinoController = {};

destinoController.getAllDestinos = async (req, res) => {
    try {
        const dados = await ViagemParagem.findAll();
        res.status(200).json({
            status: "success",
            message: "Lista de todas as paragens de viagens obtida com sucesso.",
            data: dados,
        });
    } catch (error) {
        console.error("Erro ao obter todos os destinos:", error);
        res.status(500).json({
            status: "error",
            message: "Ocorreu um erro ao obter as paragens das viagens.",
            data: null,
        });
    }
};

destinoController.createDestino = async (req, res) => {
    const { id_viagem, id_paragem, hora } = req.body;

    try {

        const dados = await ViagemParagem.create({ id_viagem, id_paragem, hora });

        res.status(200).json({
            status: "success",
            message: "Destino adicionado com sucesso.",
            data: dados,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Erro ao adicionar destino.",
            data: null,
        });
        console.error("Erro ao adicionar destino:", error);
    }
};

destinoController.deleteDestino = async (req, res) => {
    const { id_viagem, id_paragem } = req.params;
    try {

        const dados = await ViagemParagem.destroy({ where: { id_viagem, id_paragem } });

        res.status(204).json({
            status: "success",
            message: "Destino removido com sucesso.",
            data: dados,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Erro ao remover destino.",
            data: null,
        });
    }
};

module.exports = destinoController;