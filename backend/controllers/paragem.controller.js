const Paragem = require("../models/paragem.model");

const paragemController = {};

// Criar uma nova paragem
paragemController.createParagem = async (req, res) => {
  const { nome, coordenadas } = req.body;
  try {
    const dados = await Paragem.create({ nome, coordenadas });

    res.status(201).json({
      status: "success",
      message: "Paragem criada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar a paragem.",
      data: null,
    });
  }
};

// Obter todas as paragens
paragemController.getAllParagens = async (req, res) => {
  try {
    const dados = await Paragem.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de paragens obtida com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter as paragens.",
      data: null,
    });
  }
};

// Obter uma paragem por ID
paragemController.getParagemById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Paragem.findOne({
      where: { id_paragem: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Paragem não encontrada.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Paragem encontrada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter a paragem.",
      data: null,
    });
  }
};

// Atualizar uma paragem
paragemController.updateParagem = async (req, res) => {
  const { id } = req.params;
  const { nome, coordenadas } = req.body;
  try {
    const dados = await Paragem.update(
      {
        nome: nome,
        coordenadas: coordenadas
      },
      {
        where: { id_paragem: id }
      }
    );
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Paragem não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Paragem atualizada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar paragem.",
      data: null,
    });
  }
};

// Apagar uma paragem
paragemController.deleteParagem = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Paragem.destroy({
      where: { id_paragem: id },
    });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Paragem não encontrada.",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Paragem apagada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao apagar paragem.",
      data: null,
    });
  }
};

module.exports = paragemController;