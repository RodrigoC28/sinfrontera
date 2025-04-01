//rota veagem / paragem

const express = require("express");
const router = express.Router();

const viagem_paragem = require("../controllers/viagem_paragem.controller");

router.get("/viagens-paragens", viagem_paragem.findAll);

router.get("/viagens-paragens/create", viagem_paragem.show);
router.post("/viagens-paragens/create", viagem_paragem.create);

router.get("/viagens-paragens/delete/:id_viagem/:id_paragem", viagem_paragem.delete);

module.exports = router;