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
      details: error.message,
    });
  }
};

destinoController.createDestino = async (req, res) => {
    const { id_viagem, id_paragem, hora } = req.body;

    try {
        const viagem = await Viagem.findByPk(id_viagem);
        if (!viagem) {
            return res.status(404).json({ message: "Viagem não encontrada." });
        }
        const paragem = await Paragem.findByPk(id_paragem);
        if (!paragem) {
            return res.status(404).json({ message: "Paragem não encontrada." });
        }

        const existingAssociation = await ViagemParagem.findOne({
            where: { id_viagem: id_viagem, id_paragem: id_paragem }
        });

        if (existingAssociation) {
            return res.status(409).json({ message: "Esta paragem já está associada a esta viagem." });
        }

        await ViagemParagem.create({ id_viagem, id_paragem, hora });

        res.status(200).json({
            status: "success",
            message: "Destino adicionado com sucesso.",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Erro ao adicionar destino.",
            details: error.message,
        });
        console.error("Erro ao adicionar destino:", error);
    }
};


destinoController.deleteDestino = async (req, res) => {
    const { id_viagem, id_paragem } = req.params;
    try {
        const viagem = await Viagem.findByPk(id_viagem);
        if (!viagem) {
            return res.status(404).json({ message: "Viagem não encontrada." });
        }
        const paragem = await Paragem.findByPk(id_paragem);
        if (!paragem) {
            return res.status(404).json({ message: "Paragem não encontrada." });
        }

        await ViagemParagem.destroy({ where: { id_viagem, id_paragem } });

        res.status(204).json({
            status: "success",
            message: "Destino removido com sucesso.",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Erro ao remover destino.",
            details: error.message,
        });
    }
};

module.exports = destinoController;