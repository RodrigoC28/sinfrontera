// chamar as paragens

const express = require("express");
const router = express.Router();

const paragem = require("../controllers/paragem.controller");

router.get("/paragens", paragem.findAll);

router.post("/paragens/create", paragem.create);
router.get("/paragens/create", paragem.show);

router.get("/paragens/:id", paragem.findOne); 
router.post("/paragens/update", paragem.update);

router.get("/paragens/delete/:id", paragem.delete);

module.exports = router;