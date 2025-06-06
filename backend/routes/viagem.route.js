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
router.get('/procurar/', viagemController.procurarViagensDisponiveis);
router.post(
    "/viagens/:id_viagem/utilizadores/:id_utilizador",
    middleware.checkToken,
    viagemController.addUtilizadorToViagem
);
router.get("/minhas-viagens/:id", middleware.checkToken, viagemController.getMinhasReservas);

router.delete("/reserva/:id_viagem/:id_utilizador", middleware.checkToken, viagemController.deleteReserva);

module.exports = router;