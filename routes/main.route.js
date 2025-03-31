//iniciar as rotas

const expres = require("express");
const router = expres.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = router;