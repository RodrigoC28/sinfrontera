/* importar o módulo do EXPRESS */
const express = require("express");
const app = express(); //definir a nossa app em EXPRESS
const session = require("express-session");

//passamos por aqui...

//definir o motor de templating
app.set("view engine", "ejs");
app.set("views", "./views");

//definir a pasta assets como estática (um género de diretoria pública)
app.use(express.static("./assets"));

//configurações do SERVER
app.set("port", process.env.port || process.env.PORT || 5000);
app.use(express.urlencoded({ extended: true })); //permitir pedidos do exterior

app.use(
  session({
    secret: ")>S*g;#RMp|@UzT*eh<$Q>qB3'Amu&", // Replace with a secure key
    resave: true,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
res.locals.user = req.session.user || null; // atrivuir uma sessão utilizador ou não
next();
});

//rotas
app.use("/", require("./routes/main.route"));

app.use("/", require("./routes/utilizador.route"));
app.use("/", require("./routes/viagem.route"));
app.use("/", require("./routes/paragem.route"));
app.use("/", require("./routes/viagem_utilizador.route"));
app.use("/", require("./routes/viagem_paragem.route"));
app.use("/", require("./routes/autocarro.route"));

//instancia e inicia o servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado na porta: " + app.get("port"));
});
