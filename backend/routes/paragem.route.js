const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const paragemController = require("../controllers/paragem.controller");

// Rotas para Paragem
router.post("/paragem", middleware.checkToken, paragemController.createParagem);
router.get("/paragens", paragemController.getAllParagens);
router.get("/paragem/:id", middleware.checkToken, paragemController.getParagemById);
router.put("/paragem/:id", middleware.checkToken, paragemController.updateParagem);
router.delete("/paragem/:id", middleware.checkToken, paragemController.deleteParagem);


module.exports = router;