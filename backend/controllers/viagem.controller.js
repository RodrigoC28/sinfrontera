const Viagem = require("../models/viagem.model");
const Autocarro = require("../models/autocarro.model");
const Paragem = require("../models/paragem.model");
const Utilizador = require("../models/utilizador.model");
const Condutor = require("../models/condutor.model");
const ViagemParagem = require("../models/destinos.model");
const ViagemUtilizador = require("../models/venda.model");


const viagemController = {};

viagemController.createViagem = async (req, res) => {
  const { id_autocarro, data, hora_partida, hora_chegada, preco } = req.body;
  try {
    const dados = await Viagem.create({ id_autocarro, data, hora_partida, hora_chegada, preco,
    });
    res.status(201).json({
      status: "success",
      message: "Viagem criada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar a viagem.",
      details: error.message,
    });
  }
};

viagemController.getAllViagens = async (req, res) => {
  try {
    const dados = await Viagem.findAll({
      include: [
        { model: Autocarro, as: "autocarro" },
        { 
          model: Paragem, 
          as: "paragens",
          through: { attributes: ['hora'] } // Include 'hora' from ViagemParagem
        },
      ],
      order: [['data', 'ASC'], ['hora_partida', 'ASC']]
    });
    res.status(200).json({
      status: "success",
      message: "Lista de viagens obtida com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter as viagens.",
      details: error.message,
    });
  }
};

// Obter uma viagem por ID
viagemController.getViagemById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Viagem.findOne({ where: { id_viagem: id } }, 
      {
      include: [
        { model: Autocarro, as: "autocarro" },
        { 
          model: Paragem, 
          as: "paragens",
          through: { attributes: ['hora'] }
        },
        { 
          model: Utilizador,
          as: "utilizadoresReservados",
          attributes: { exclude: ['password'] },
          through: { attributes: ['mtd_pagamento', 'desconto', 'n_passageiros'] }
        }
      ],
    });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Viagem não encontrada.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Viagem encontrada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter a viagem.",
      details: error.message,
    });
  }
};

// Atualizar uma viagem
viagemController.updateViagem = async (req, res) => {
  const { id } = req.params;
  const { id_autocarro, data, hora_partida, hora_chegada, preco } = req.body;

  try {
    const dados = await Viagem.update(
      {
        id_autocarro: id_autocarro, 
        data: data,
        hora_partida: hora_partida,
        hora_chegada: hora_chegada,
        preco: preco
      },
      {
        where: { id_viagem: id }
      }
    );

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Viagem não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Viagem atualizada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar a viagem.",
      data: null,
    });
  }
};

// Apagar uma viagem
viagemController.deleteViagem = async (req, res) => {
  const { id } = req.params;
  try {

    await Condutor.destroy({ where: { id_viagem: id } });
    // Example: remove paragens associations for this viagem
    await ViagemParagem.destroy({ where: { id_viagem: id } });
    // ViagemUtilizador should be handled by ON DELETE CASCADE if DB is set up.

    const dados = await Viagem.destroy({ where: { id_viagem: id } });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Viagem não encontrada.",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Viagem eliminada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao eliminar viagem.",
      data: null,
    });
  }
};

viagemController.addUtilizadorToViagem = async (req, res) => {
    const { id_viagem, id_utilizador } = req.params;
    const { mtd_pagamento, desconto, n_passageiros } = req.body;

    try {
        const viagem = await Viagem.findByPk(id_viagem);
        if (!viagem) {
            return res.status(404).json({ message: "Viagem não encontrada." });
        }
        const utilizador = await Utilizador.findByPk(id_utilizador);
        if (!utilizador) {
            return res.status(404).json({ message: "Utilizador não encontrado." });
        }

        if (!mtd_pagamento || n_passageiros === undefined) {
             return res.status(400).json({ message: "Método de pagamento e número de passageiros são obrigatórios." });
        }
        
        // Check capacity?
        const autocarro = await viagem.getAutocarro();
        const currentReservations = await ViagemUtilizador.sum('n_passageiros', { where: { id_viagem: id_viagem } });
        if ( (currentReservations + n_passageiros) > autocarro.capacidade) {
            return res.status(409).json({ message: `Capacidade do autocarro (${autocarro.capacidade}) excedida. Disponíveis: ${autocarro.capacidade - currentReservations}` });
        }

        await viagem.addUtilizador(utilizador, {
            through: {
                mtd_pagamento,
                desconto: desconto || 0,
                n_passageiros,
            },
        });

        res.status(200).json({
            status: "success",
            message: "Utilizador (reserva) adicionado à viagem com sucesso.",
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') { 
             return res.status(409).json({ message: "Este utilizador já tem uma reserva para esta viagem." });
        }
        res.status(500).json({
            status: "error",
            message: "Erro ao adicionar utilizador (reserva) à viagem.",
            details: error.message,
        });
    }
};

module.exports = viagemController;