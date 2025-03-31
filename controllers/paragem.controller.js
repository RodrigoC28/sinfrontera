const Paragem = require("../models/paragem.model");

exports.create = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador

  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Define um objeto 'Utilizador' com os dados recebidos                  *

  const paragem = new Paragem({
    // OU ID vai requerir todos os dados do mesmo
    paragem_nome: req.body.paragem_nome,
    hora_paragem: req.body.hora_paragem,
  });

  // Efetua o pedido de criação do novo Utilizador ao model (com os dados recebidos)                                        

  Paragem.create(paragem, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      //redirecionar o utilizador para a rota /paragens
      res.redirect("/paragens");
    }
  });
};

//findAll
exports.findAll = (req, res) => {

  // Efetua o pedido dos dados ao model                               
   
  Paragem.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      // Executa o render() do template e envia os respetivos parâmetros 

      res.render("pages/index", { op: 11, success: true, dados: data });
    }
  });
};

exports.findOne = (req, res) => {  // Efetua o pedido dos dados ao model                               *
   
  Paragem.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(400).send({
          success: false,
          message: "Paragem com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados da paragem com o ID ${req.params.id}",
        });
      }
    } else {
      // Executa o render() do template e envia os respetivos parâmetros 

      res.render("pages/index", { op: 13, success: true, dados: data });
    }
  });
};


exports.update = (req, res) => { // Verifica se os dados foram recebidos pelo controlador            
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Efetua o pedido de atualização dos dados do Utilizador na BD       
   
  Paragem.update(req.body.id, new Paragem(req.body), (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message:
            "Paragem com o ID " +
            req.body.id +
            ", não encontrada. [" +
            error.message +
            "]",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar atualizar os dados da Paragem com o ID " +
            req.body.id +
            ". [" +
            error.message +
            "]",
        });
      }
    } else {
      res.redirect("/paragens");
    }
  });
};

//delete, sirve para remover uma paragem da base de dados
exports.delete = (req, res) => {
  Paragem.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Paragem com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados dos paragens com o ID ${req.params.id}",
        });
      }
    } else {
      res.redirect("/paragens");
    }
  });
};

//mostra a UI de criado com sucesso
exports.show = (req, res) => {
  res.render("pages/index", { op: 12, success: true });
};
