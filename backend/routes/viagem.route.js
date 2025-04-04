const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const viagemController = require("../controllers/viagem.controller");

//rotas(endpoints) da entidade 'viagem'
router.post("/Viagem", middleware.checkToken, viagemController.createViagem);
router.get("/Viagem", middleware.checkToken, viagemController.getAllViagem);
router.put("/Viagem/:id", middleware.checkToken, viagemController.updateViagem);
router.delete("/Viagem/:id", middleware.checkToken, viagemController.deleteViagem);
router.get("/Viagem/:id", middleware.checkToken, viagemController.getViagemById);


module.exports = router;