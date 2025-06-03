const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const destinoController = require("../controllers/destinos.controller");

//rotas(endpoints) da entidade 'destinos'
router.post("/destino", middleware.checkToken, destinoController.createDestino);
router.get("/destinos", destinoController.getAllDestinos);
router.delete("/destino/:id_viagem/:id_paragem", middleware.checkToken, destinoController.deleteDestino);

module.exports = router;