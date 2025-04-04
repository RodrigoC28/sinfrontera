const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const destinosController = require("../controllers/destinos.controller");

//rotas(endpoints) da entidade 'destinos'
router.post("/Destinos", middleware.checkToken, destinosController.createDestinos);
router.get("/Destinos", middleware.checkToken, destinosController.getAllDestinos);
router.put("/Destinos/:id", middleware.checkToken, destinosController.updateDestinos);
router.delete("/Destinos/:id", middleware.checkToken, destinosController.deleteDestinos);
router.get("/Destinos/:id", middleware.checkToken, destinosController.getDestinosById);


module.exports = router;