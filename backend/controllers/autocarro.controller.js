const Autocarro = require("../models/autocarro.model");

const autocarroController = {};

// Criar um novo autocarro
autocarroController.createAutocarro = async (req, res) => {
  const { matricula, capacidade } = req.body;

  try {
    const dados = await Autocarro.create({ matricula, capacidade });
    res.status(201).json({
      status: "success",
      message: "Autocarro criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar o autocarro.",
      data: null,
    });
  }
};

// Obter todos os autocarros
autocarroController.getAllAutocarros = async (req, res) => {
  try {
    const dados = await Autocarro.findAll();
    res.status(200).json({
      status: "success",
      message: "Lista de autocarros obtida com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter os autocarros.",
      data: null,
    });
  }
};

// Obter um autocarro por ID
autocarroController.getAutocarroById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Autocarro.findOne({
      where: { id_autocarro: id },
    });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Autocarro não encontrado.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Autocarro encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter o autocarro.",
      data: null,
    });
  }
};

// Atualizar um autocarro
autocarroController.updateAutocarro = async (req, res) => {
  const { id } = req.params;
  const { matricula, capacidade } = req.body;
  try {
    const dados = await Autocarro.update(
      {
        matricula: matricula,
        capacidade: capacidade
      },
      {
        where: { id_autocarro: id }
      }
    );

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Autocarro não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Autocarro atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar autocarro.",
      data: null,
    });
  }
};

// Apagar um autocarro
autocarroController.deleteAutocarro = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Autocarro.destroy({
      where: { id_autocarro: id },
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Autocarro não encontrado.",
      });
    }

    res.status(204).json({
      status: "success",
      message: "Autocarro apagado com sucesso.",
      data: dados,
    });
    console.log(`Autocarro com ID ${id} apagado com sucesso.`);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao apagar autocarro.",
      data: null,
    });
    console.error(`Erro ao apagar autocarro com ID ${id}:`, error);
  }
};

module.exports = autocarroController;