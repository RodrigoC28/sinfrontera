//viagem utilizador

const express = require("express");
const router = express.Router();

const viagem_utilizador = require("../controllers/viagem_utilizador.controller");

router.get('/reservas/:id', viagem_utilizador.showResevar);
router.post("/reservas/create", viagem_utilizador.create);
router.get('/reservas', viagem_utilizador.showUserTrips);

module.exports = router;