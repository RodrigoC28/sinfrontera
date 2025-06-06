const Condutor = require("../models/condutor.model");
const Viagem = require("../models/viagem.model"); // To validate id_viagem

const condutorController = {};

// Criar um novo condutor
condutorController.createCondutor = async (req, res) => {
  const { id_viagem, nome, idade, genero } = req.body;
  try {
    const dados = await Condutor.create({ id_viagem, nome, idade, genero });
    res.status(201).json({
      status: "success",
      message: "Condutor criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar o condutor.",
      data: null,
    });
  }
};

// Obter todos los condutores
condutorController.getAllCondutores = async (req, res) => {
  try {
    const dados = await Condutor.findAll({
      include: [{ model: Viagem, as: 'viagem' }] // Inclui detalhes da Viagem
    });
    res.status(200).json({
      status: "success",
      message: "Lista de condutores obtida com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter os condutores.",
      data: null,
    });
  }
};

// Obter um condutor por ID
condutorController.getCondutorById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Condutor.findOne({ where: { id_condutor: id } },
      {
        include: [{ model: Viagem, as: 'viagem' }]
      });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Condutor não encontrado.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Condutor encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter o condutor.",
      data: null,
    });
  }
};

// Atualizar um condutor
condutorController.updateCondutor = async (req, res) => {
  const { id } = req.params;
  const { id_viagem, nome, idade, genero } = req.body;

  try {
    const dados = await Condutor.update(
      {
        id_viagem: id_viagem,
        nome: nome,
        idade: idade,
        genero: genero
      },
      {
        where: { id_condutor: id }
      }
    );
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Condutor não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Condutor atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar o condutor.",
      data: null,
    });
    console.log("Erro ao atualizar condutor:", error);
  }
};

// Apagar um condutor
condutorController.deleteCondutor = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Condutor.destroy({
      where: { id_condutor: id },
    });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Condutor não encontrada.",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Condutor eliminado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao eliminar condutor.",
      data: null,
    });
  }
};

module.exports = condutorController;