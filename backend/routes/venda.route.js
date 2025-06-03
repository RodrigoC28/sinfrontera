const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const vendaController = require("../controllers/venda.controller");

//rotas(endpoints) da entidade 'venda'
router.post("/venda", middleware.checkToken, vendaController.createVenda);
router.get("/vendas", middleware.checkToken, vendaController.getAllVenda);
router.put("/venda/:id", middleware.checkToken, vendaController.updateVenda);
router.delete("/venda/:id", middleware.checkToken, vendaController.deleteVenda);
router.get("/venda/:id", middleware.checkToken, vendaController.getVendaById);


module.exports = router;