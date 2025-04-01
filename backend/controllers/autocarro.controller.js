const Autocarro = require("../models/autocarro.model");
const Viagem = require("../models/viagem.model");

//create
exports.create = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador 
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }
  // Define um objeto 'Autocarro' com os dados recebidos             
  const autocarro = new Autocarro({
    id_viagem: req.body.id_viagem,
    matricula: req.body.matricula,
    condutor: req.body.condutor
  });
   //Efetua o pedido de criação do novo Utilizador ao model (com os dados recebidos)                     
  Autocarro.create(autocarro, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      //console.log(data);
      res.redirect("/autocarros");
    }
  });
};

//findAll
exports.findAll = (req, res) => {
  //Efetua o pedido de VIAGENS ao model                      
  let viagens;
  Viagem.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro a aceder aos dados das viagens. [" +
          error.message +
          "]",
      });
    } else {
      viagens = data;
    }
  });

  //Efetua o pedido dos AUTOCARROS ao model                        
  
  Autocarro.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      // Executa o render() do template e envia os respetivos parâmetros   
       
      data.viagens = viagens; // <--- adiciona as viagens ao resultado do autocarro
      res.render("pages/index", { op: 16, success: true, dados: data });
    }
  });
};

exports.findOne = (req, res) => {
 

    // Efetua o pedido das VIAGENS ao model                        
  
    let viagens;
    Viagem.getAll((error, data) => {
      if (error) {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro a aceder aos dados dos veículos. [" +
            error.message +
            "]",
        });
      } else {
        viagens = data;
      }
    });

  //Efetua o pedido dos dados ao model                          
  Autocarro.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(400).send({
          success: false,
          message: "Autocarro com o ID ${req.params.id_autocarro} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados do autocarro com o ID ${req.params.id_autocarro}",
        });
      }
    } else {
      //Executa o render() do template e envia os respetivos parâmetros 
      data.viagens = viagens;
      res.render("pages/index", { op: 18, success: true, dados: data });
    }
  });
};

//update
exports.update = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador       
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Efetua o pedido de atualização dos dados do Autocarro na BD    
  Autocarro.update(req.body.id, new Autocarro(req.body),(error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message:
            "Autocarro com o ID " +
            req.body.id +
            ", não encontrado. [" +
            error.message +
          "]",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar atualizar os dados do autocarro com o ID " +
            req.body.id +
            ". [" +
            error.message +
            "]",
        });
      }
    } else {
      res.redirect("/autocarros");
    }
  });
};

//delete
exports.delete = (req, res) => {
  Autocarro.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Autocarro com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados dos autocarros com o ID ${req.params.id}",
        });
      }
    } else {
      res.redirect("/autocarros");
    }
  });
};

/*mostra a UI de criado com sucesso*/
exports.show = (req, res) => {
  // Efetua o pedido de VIAGENS ao model      
  let viagens;
  Viagem.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro a aceder aos dados dos viagens. [" +
          error.message +
          "]",
      });
    } else {
      res.render("pages/index", { op: 17, success: true, dados: data });
    }
  });
};
