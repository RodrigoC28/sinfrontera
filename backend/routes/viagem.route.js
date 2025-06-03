const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const viagemController = require("../controllers/viagem.controller");

// Rotas para Viagem
router.post("/viagem", middleware.checkToken, viagemController.createViagem);
router.get("/viagens", middleware.checkToken, viagemController.getAllViagens);
router.get("/viagem/:id", middleware.checkToken, viagemController.getViagemById);
router.put("/viagem/:id", middleware.checkToken, viagemController.updateViagem);
router.delete("/viagem/:id", middleware.checkToken, viagemController.deleteViagem);


// Viagem - Utilizadores (Reservas)
router.post(
    "/viagens/:id_viagem/utilizadores/:id_utilizador/reserva", // More descriptive path
    middleware.checkToken,
    viagemController.addUtilizadorToViagem
);


module.exports = router;