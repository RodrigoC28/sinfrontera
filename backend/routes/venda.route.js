const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const vendaController = require("../controllers/venda.controller");

//rotas(endpoints) da entidade 'venda'
router.post("/Venda", middleware.checkToken, vendaController.createVenda);
router.get("/Venda", middleware.checkToken, vendaController.getAllVenda);
router.put("/Venda/:id", middleware.checkToken, vendaController.updateVenda);
router.delete("/Venda/:id", middleware.checkToken, vendaController.deleteVenda);
router.get("/Venda/:id", middleware.checkToken, vendaController.getVendaById);


module.exports = router;