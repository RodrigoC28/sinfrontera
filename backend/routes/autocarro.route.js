const express = require("express");
const router = express.Router();

const autocarro = require("../controllers/autocarro.controller");

router.post("/autocarros/create", autocarro.create);
router.get("/autocarros/create", autocarro.show); //<--- rota de novo autocarro

router.get("/autocarros", autocarro.findAll);

router.get("/autocarros/:id", autocarro.findOne); //<--- rota antes da edição
router.post("/autocarros/update", autocarro.update);

router.get("/autocarros/delete/:id", autocarro.delete);

module.exports = router;
