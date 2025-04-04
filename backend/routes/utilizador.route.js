const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const utilizadorController = require("../controllers/utilizador.controller");

//rotas(endpoints) da entidade 'utilizador'
router.post("/Utilizador", middleware.checkToken, utilizadorController.createUtilizador);
router.get("/Utilizador", middleware.checkToken, utilizadorController.getAllUtilizador);
router.put("/Utilizador/:id", middleware.checkToken, utilizadorController.updateUtilizador);
router.delete("/Utilizador/:id", middleware.checkToken, utilizadorController.deleteUtilizador);
router.get("/Utilizador/:id", middleware.checkToken, utilizadorController.getUtilizadorById);


module.exports = router;