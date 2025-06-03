const express = require("express");
const router = express.Router();
const middleware = require("../middleware"); 
const autocarroController = require("../controllers/autocarro.controller");

// Rotas para Autocarro
router.post("/autocarro", middleware.checkToken, autocarroController.createAutocarro);
router.get("/autocarros", middleware.checkToken, autocarroController.getAllAutocarros);
router.get("/autocarro/:id", middleware.checkToken, autocarroController.getAutocarroById);
router.put("/autocarro/:id", middleware.checkToken, autocarroController.updateAutocarro);
router.delete("/autocarro/:id", middleware.checkToken, autocarroController.deleteAutocarro);

module.exports = router;