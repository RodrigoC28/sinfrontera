const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const paragemController = require("../controllers/paragem.controller");

//rotas(endpoints) da entidade 'paragem'
router.post("/Paragem", middleware.checkToken, paragemController.createParagem);
router.get("/Paragem", middleware.checkToken, paragemController.getAllParagem);
router.put("/Paragem/:id", middleware.checkToken, paragemController.updateParagem);
router.delete("/Paragem/:id", middleware.checkToken, paragemController.deleteParagem);
router.get("/Paragem/:id", middleware.checkToken, paragemController.getParagemById);


module.exports = router;