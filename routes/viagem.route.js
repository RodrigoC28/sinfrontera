//rota viagens

const express = require("express");
const router = express.Router();

const viagem = require("../controllers/viagem.controller");

router.get('/viagens-reserva', viagem.findTrips);
router.get("/viagens", viagem.findAll);

router.post("/viagens/create", viagem.create);
router.get("/viagens/create", viagem.show);

router.get("/viagens/:id", viagem.findOne); 
router.post("/viagens/update", viagem.update);

router.get("/viagens/delete/:id", viagem.delete);

module.exports = router;