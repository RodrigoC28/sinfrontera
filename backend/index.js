const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require("./config/database");
const port = 5000

app.set("port", process.env.PORT || port);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true }));

sequelize.sync(); //verifica a base de dados

app.use("/api/v1", require("./routes/autocarro.route.js"));
app.use("/api/v1", require("./routes/condutor.route.js"));
app.use("/api/v1", require("./routes/paragem.route.js"));
app.use("/api/v1", require("./routes/viagem.route.js"));
app.use("/api/v1", require("./routes/utilizador.route.js"));
app.use("/api/v1", require("./routes/destinos.route.js"));

app.listen(app.get("port"), () => {
    console.log("Servidor a correr na porta "+app.get("port"));
});