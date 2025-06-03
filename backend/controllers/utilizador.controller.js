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

    // Gerar o token JWT
    // Payload should ideally contain non-sensitive user identifiers like id and role
    const payload = {
        id: utilizador.id_utilizador,
        email: utilizador.email,
        tipo_utilizador: utilizador.tipo_utilizador // Include user type/role if needed for authorization
    };
    const token = jwt.sign(payload, config.secret, { // Use config.secret
      expiresIn: config.timer, // Use config.timer (e.g., '1h', '7d')
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

      // Generate new token with the same payload or updated if necessary
      const payload = {
        id: decoded.id, // Use id from the decoded token
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
    console.log("Utilizador deslogado com sucesso.");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro durante o processo de logout.",
      details: error.message,
    });
  }
};


// Obter todos os utilizadores (Protected - Admin only ideally)
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
      details: error.message,
    });
  }
};

// Obter um utilizador por ID
utilizadorController.getUtilizadorById = async (req, res) => {
  const { id } = req.params;
  try {
    const utilizador = await Utilizador.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    if (!utilizador) {
      return res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Utilizador encontrado com sucesso.",
      data: utilizador,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter o utilizador.",
      details: error.message,
    });
  }
};

// Atualizar um utilizador
utilizadorController.updateUtilizador = async (req, res) => {
  const { id } = req.params;
  const { tipo_utilizador, nome, sobrenome, email, telemovel, password } = req.body;
  
  const updateData = {};
  if (tipo_utilizador !== undefined) updateData.tipo_utilizador = tipo_utilizador;
  if (nome !== undefined) updateData.nome = nome;
  if (sobrenome !== undefined) updateData.sobrenome = sobrenome;
  if (email !== undefined) updateData.email = email;
  if (telemovel !== undefined) updateData.telemovel = telemovel;

  // If password is being updated, hash it
  if (password) {
    try {
        updateData.password = await bcrypt.hash(password, 10);
    } catch(hashError) {
        return res.status(500).json({
            status: "error",
            message: "Ocorreu um erro ao processar a nova senha.",
            details: hashError.message,
        });
    }
  }

  try {
    const [updatedRows] = await Utilizador.update(
      updateData,
      { where: { id_utilizador: id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado para atualização.",
      });
    }
    const updatedUtilizador = await Utilizador.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    res.status(200).json({
      status: "success",
      message: "Utilizador atualizado com sucesso.",
      data: updatedUtilizador,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            status: "error",
            message: "O email fornecido já está em uso por outro utilizador.",
            details: error.errors ? error.errors.map(e => e.message) : error.message,
        });
    }
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar o utilizador.",
      details: error.message,
    });
  }
};

// Apagar um utilizador
utilizadorController.deleteUtilizador = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Utilizador.destroy({
      where: { id_utilizador: id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado para apagar.",
      });
    }
    res.status(204).json(); // No content, standard for successful DELETE
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json({
            status: "error",
            message: "Não é possível apagar o utilizador pois existem dados associados (ex: reservas ativas).",
            details: error.message,
        });
    }
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao apagar o utilizador.",
      details: error.message,
    });
  }
};

module.exports = utilizadorController;
