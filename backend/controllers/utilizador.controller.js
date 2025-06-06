// controllers/utilizador.controller.js
const Utilizador = require("../models/utilizador.model");
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const config = require('../config/config'); // Assuming your JWT secret and timer are here

const utilizadorController = {};

// Registar um novo utilizador
utilizadorController.register = async (req, res) => {
  const { nome, sobrenome, email, password, telemovel } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const dados = await Utilizador.create({ nome, sobrenome, email, password: hashedPassword, telemovel });

    res.status(201).json({
      success: true,
      message: "Utilizador criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro durante o processo de autenticação.",
    });
  }
};

// Login do utilizador
utilizadorController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilizador = await Utilizador.findOne({ where: { email } });

    if (!utilizador) {
      return res.status(403).json({ // Forbidden or 401 Unauthorized
        success: false,
        message: "Email ou senha inválidos.",
      });
    }

    // Comparar a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(password, utilizador.password);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Email ou senha inválidos.",
      });
    }

    const payload = {
      id: utilizador.id_utilizador,
      email: utilizador.email,
      tipo_utilizador: utilizador.tipo_utilizador
    };
    const token = jwt.sign(payload, config.secret, {
      expiresIn: config.timer,
    });

    res.status(200).json({
      success: true,
      message: "Autenticação realizada com sucesso.",
      AccessToken: token,
      user: {
        id: utilizador.id_utilizador,
        email: utilizador.email,
        tipo_utilizador: utilizador.tipo_utilizador,
        nome: utilizador.nome,
      }
    });
    console.log(`Utilizador ${utilizador.email} autenticado com sucesso.`);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro durante o processo de autenticação.",
    });
  }
};

// Renovar o token JWT
utilizadorController.refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token não fornecido.",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Token inválido ou expirado.",
        });
      }

      const payload = {
        id: decoded.id,
        email: decoded.email,
        tipo_utilizador: decoded.tipo_utilizador
      };
      const newToken = jwt.sign(payload, config.secret, {
        expiresIn: config.timer,
      });

      res.status(200).json({
        success: true,
        message: "Token renovado com sucesso.",
        AccessToken: newToken,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro durante o processo de renovação do token.",
    });
  }
};

// Logout do utilizador
utilizadorController.logout = async (req, res) => {
  try {
    // Invalida o token no lado do cliente (não há como invalidar um JWT no lado do servidor)
    res.status(200).json({
      success: true,
      message: "Logout realizado com sucesso.",
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro durante o processo de logout.",
      details: error.message,
    });
  }
};


// Obter todos os utilizadores
utilizadorController.getAllUtilizadores = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll({
      attributes: { exclude: ['password'] } // Exclude password from the result
    });
    res.status(200).json({
      status: "success", // Using 'status' for consistency with other methods
      message: "Lista de utilizadores obtida com sucesso.",
      data: utilizadores,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter os utilizadores.",
      data: null,
    });
  }
};

// Obter um utilizador por ID
utilizadorController.getUtilizadorById = async (req, res) => {
  const { id } = req.params;
  try {
    const utilizador = await Utilizador.findOne({
      attributes: { exclude: ['password'] },
      where: { id_utilizador: id },
    });
    res.status(200).json({
      status: "success",
      message: "Utilizador encontrado com sucesso.",
      data: utilizador,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter o utilizador.",
      data: null,
    });
  }
};

utilizadorController.updateUtilizador = async (req, res) => {
  const { id } = req.params;
  const { tipo_utilizador, nome, sobrenome, email, telemovel, password } = req.body;
  try {
    const dados = await Utilizador.update(
      {
        tipo_utilizador: tipo_utilizador,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telemovel: telemovel,
        password: password ? await bcrypt.hash(password, 10) : undefined
      },
      {
        where: { id_utilizador: id }
      }
    );

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Utilizador atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar utilizador.",
      data: null,
    });
  }
};

utilizadorController.deleteUtilizador = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Utilizador.destroy({
      where: { id_utilizador: id },
    });

    res.status(204).json({
      status: "success",
      message: "Utilizador apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao apagar utilizador.",
      data: null,
    });
  }
};

module.exports = utilizadorController;
