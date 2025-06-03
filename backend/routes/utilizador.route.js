const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware");

//importação controller
const utilizadorController = require("../controllers/utilizador.controller");

// Rotas para Utilizador
// Registo é público, login também. Outras rotas podem ser protegidas.
router.post("/utilizador/registo", utilizadorController.register);
router.post("/utilizador/login", utilizadorController.login);
router.post("/utilizador/logout", utilizadorController.logout);

router.get("/utilizadores", middleware.checkToken, utilizadorController.getAllUtilizadores); // Protected
router.get("/utilizadores/:id", middleware.checkToken, utilizadorController.getUtilizadorById); // Protected
router.put("/utilizadores/:id", middleware.checkToken, utilizadorController.updateUtilizador); // Protected
router.delete("/utilizadores/:id", middleware.checkToken, utilizadorController.deleteUtilizador); // Protected


module.exports = router;