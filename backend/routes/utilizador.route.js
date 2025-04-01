// rota do utilizador

const express = require("express");
const router = express.Router();

const utilizador = require("../controllers/utilizador.controller");

router.get("/utilizadores", utilizador.findAll); // listar utilizadores (rota principal

router.get('/login', utilizador.showLogin);
router.post('/login', utilizador.login);

router.get('/logout', utilizador.logout);

router.post("/utilizadores/create", utilizador.create);
router.get("/utilizadores/create", utilizador.show); //rota que mostra a página de novo utilizador

router.get("/utilizadores/:id", utilizador.findOne); //rota que vai buscar os dados antes de ir para a página de edição
router.post("/utilizadores/update", utilizador.update);

router.get("/utilizadores/delete/:id", utilizador.delete);

module.exports = router;