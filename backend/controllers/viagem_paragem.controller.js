const ViagemParagem = require("../models/viagem_paragem.model");
const Viagem = require("../models/viagem.model");
const Paragem = require("../models/paragem.model");

//create
exports.create = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador            

  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Define um objeto 'ViagemParagem' com os dados recebidos                  

  const viagemparagem = new ViagemParagem({
    id_viagem: req.body.id_viagem,
    id_paragem: req.body.id_paragem,
  });

  // Efetua o pedido de criação do novo ViagemParagem ao model (com os dados recebidos)                                         

  ViagemParagem.create(viagemparagem, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      //console.log(data);
      res.redirect("/viagens-paragens");
    }
  });
};

exports.findAll = (req, res) => {
  // Efetua o pedido dos dados ao model                               
  ViagemParagem.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      // Executa o render() do template e envia os respetivos parâmetros 
      res.render("pages/index", { op: 14, success: true, dados: data });
    }
  });
};

exports.delete = (req, res) => {
  ViagemParagem.remove(req.params.id_viagem, req.params.id_paragem, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Viagem com o ID ${id_viagem} e Paragem com o ID ${id_paragem} não encontrada.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados das vigens com o ID ${req.params.id_viagem} e paragens com o ID ${req.params.id_paragem}.",
        });
      }
    } else {
      res.redirect("/viagens-paragens");
    }
  });
};

exports.show = (req, res) => {
  Viagem.getAll((error, viagens) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Ocorreu um erro a aceder aos dados das viagens. [" + error.message + "]",
      });
    }

    Paragem.getAll((error, paragens) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Ocorreu um erro ao executar a operação. [" + error.message + "]",
        });
      }
      res.render("pages/index", { op: 15, success: true, dados: { viagens, paragens } });
    });
  });
};