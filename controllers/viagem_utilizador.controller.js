const ViagemUtilizador = require("../models/viagem_utilizador.model");
const Viagem = require("../models/viagem.model");

//create
exports.create = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador            
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Define um objeto 'Utilizador' com os dados recebidos                  
   
  const reserva = new ViagemUtilizador({
    id_viagem: req.body.id_viagem,
    id_utilizador: req.body.id_utilizador,
    mtd_pagamento: req.body.mtd_pagamento,
    n_passageiros: req.body.n_passageiros
  });

  // Efetua o pedido de criação do novo Utilizador ao model (com os dados recebidos)                                         
   
    ViagemUtilizador.create(reserva, (error, data) => {
        if (error) {
        res.status(500).send({
            success: false,
            message:
            "Ocorreu um erro ao executar a operação. [" + error.message + "]",
        });
        } else {

          ViagemUtilizador.getTripsByUserIdAndTripId(reserva.id_viagem, req.session.user.id_utilizador, (error, data) => {
            if (error) {
              return res.status(500).send({
                success: false,
                message: "Erro ao carregar a viagem do utilizador.",
              });
            }
            console.log(data[0]);
            res.render("pages/index", { op: 19, success: true, dados: data[0]});
          });
        }
    });
};

exports.showUserTrips = (req, res) => {
    ViagemUtilizador.getTripsByUserId(req.session.user.id_utilizador, (error, data) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: "Erro ao carregar as viagens do utilizador.",
        });
      }
      res.render("pages/index", { op: 6, success: true, dados: data});
    });
};

exports.showResevar = (req, res) => {  
    Viagem.findById(req.params.id, (error, data) => {
      if (error) {
        if (error.result === "não encontrado") {
          return res.status(400).send({
            success: false,
            message: `Viagem com o ID ${id} não encontrada.`
          });
        } else {
          return res.status(500).send({
            success: false,
            message: `Ocorreu um erro ao tentar aceder aos dados da viagem com o ID ${id}.`
          });
        }
      } else {
        res.render("pages/index", { op: 5, success: true, dados: data});
      }
    });
};