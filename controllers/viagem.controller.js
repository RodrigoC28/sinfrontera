const Viagem = require("../models/viagem.model");

//create
exports.create = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador            
   
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Define um objeto 'Utilizador' com os dados recebidos                  
   
  const viagem = new Viagem({
    //id: req.body.id,
    origem: req.body.origem,
    destino: req.body.destino,
    data: req.body.data,
    hora_partida: req.body.hora_partida,
    hora_chegada: req.body.hora_chegada,
    capacidade: req.body.capacidade,
    preco: req.body.preco
  });

  // Efetua o pedido de criação do novo Utilizador ao model (com os dados recebidos)                                         
  Viagem.create(viagem, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      //console.log(data);
      res.redirect("/viagens");
    }
  });
};

exports.findAll = (req, res) => {
  // Efetua o pedido dos dados ao model                           

  Viagem.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      // Executa o render() do template e envia os respetivos parâmetros   
      res.render("pages/index", { op: 8, success: true, dados: data });
    }
  });
};

exports.findOne = (req, res) => {
  // Efetua o pedido dos dados ao model                               
   
  Viagem.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(400).send({
          success: false,
          message: "Viagem com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados da viagem com o ID ${req.params.id}",
        });
      }
    } else {
      // Executa o render() do template e envia os respetivos parâmetros   
       
      res.render("pages/index", { op: 10, success: true, dados: data });
    }
  });
};

exports.update = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador            
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Efetua o pedido de atualização dos dados do Utilizador na BD          

  Viagem.update(req.body.id, new Viagem(req.body), (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message:
            "Viagem com o ID " +
            req.body.id +
            ", não encontrado. [" +
            error.message +
            "]",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar atualizar os dados da viagem com o ID " +
            req.body.id +
            ". [" +
            error.message +
            "]",
        });
      }
    } else {
      res.redirect("/viagens");
    }
  });
};

exports.findTrips = (req, res) => {
  //Efetua o pedido dos dados ao model                               
  Viagem.getAvailableTripsWithStops(req.query.origem, req.query.destino, req.query.data, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      // Executa o render() do template e envia os respetivos parâmetros   
      res.render("pages/index", { op: 4, success: true, dados: data });
    }
  });
};

exports.delete = (req, res) => {
  Viagem.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Viagem com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados das viagens com o ID ${req.params.id}",
        });
      }
    } else {
      res.redirect("/viagens");
    }
  });
};

exports.show = (req, res) => {
  res.render("pages/index", { op: 9, success: true });
};