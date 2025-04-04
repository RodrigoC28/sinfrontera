const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const autocarroController = require("../controllers/autocarro.controller");

//rotas(endpoints) da entidade 'autocarro'
router.post("/Autocarro", middleware.checkToken, autocarroController.createAutocarro);
router.get("/Autocarro", middleware.checkToken, autocarroController.getAllAutocarro);
router.put("/Autocarro/:id", middleware.checkToken, autocarroController.updateAutocarro);
router.delete("/Autocarro/:id", middleware.checkToken, autocarroController.deleteAutocarro);
router.get("/Autocarro/:id", middleware.checkToken, autocarroController.getAutocarroById);


module.exports = router;