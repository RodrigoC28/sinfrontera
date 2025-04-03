const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000

app.set("port", process.env.PORT || port);
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true }));

app.use("", require(""));
app.use("", require(""));
app.use("", require(""));

app.listen(app.get("port"), () => {
    console.log("Servidor a correr na porta "+app.get("port"));
});