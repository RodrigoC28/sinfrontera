const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const condutorController = require("../controllers/condutor.controller");

// Rotas para Condutor
router.post("/condutor", middleware.checkToken, condutorController.createCondutor);
router.get("/condutores", middleware.checkToken, condutorController.getAllCondutores);
router.get("/condutor/:id", middleware.checkToken, condutorController.getCondutorById);
router.put("/condutor/:id", middleware.checkToken, condutorController.updateCondutor);
router.delete("/condutor/:id", middleware.checkToken, condutorController.deleteCondutor);


module.exports = router;