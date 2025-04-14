const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const condutorController = require("../controllers/condutor.controller");

//rotas(endpoints) da entidade 'condutor'
router.post("/Condutor", middleware.checkToken, condutorController.createCondutor);
router.get("/Condutor", middleware.checkToken, condutorController.getAllCondutor);
router.put("/Condutor/:id", middleware.checkToken, condutorController.updateCondutor);
router.delete("/Condutor/:id", middleware.checkToken, condutorController.deleteCondutor);
router.get("/Condutor/:id", middleware.checkToken, condutorController.getCondutorById);


module.exports = router;