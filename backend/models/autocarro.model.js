const conexao = require("./conexao.db");

const Autocarro = function (dados) {
  (this.id_autocarro = dados.id_autocarro),
    (this.id_viagem = dados.id_viagem),    
    (this.matricula = dados.matricula),
    (this.condutor = dados.condutor);
};

Autocarro.create = (dados, result) => {
  conexao.query("INSERT INTO autocarro SET ?", dados, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - " + error.message);
      result(error, null);
      return;
    }

    result(null, { id: res.insertId, ...dados });
  });
};

Autocarro.getAll = (result) => {
  conexao.query("SELECT * FROM autocarro", (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    console.log("DEBUG > SUCCESS > Autocarro: ", res);
    result(null, res);
  });
};

Autocarro.findById = (id, result) => {
  conexao.query("SELECT * FROM autocarro WHERE id_autocarro = ?", id, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    if (res.length > 0) {
      console.log("Autocarro encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ result: "Autocarro não encontrado" }, null);
  });
};

Autocarro.update = (id, dados, result) => {
  conexao.query(
    "UPDATE autocarro SET id_viagem=?, matricula=?, condutor=? WHERE id_autocarro=?",
    [
      dados.id_viagem,
      dados.matricula,
      dados.condutor,
      dados.id_autocarro
    ],
    (error, res) => {
      if (error) {
        console.error("DEBUG > ERROR - ", error.message);
        result(error, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ result: "não encontrado" }, null);
        return;
      }

      console.log("DEBUG > SUCCESS > Autocarro atualizado: ", {
        id: id,
        ...dados,
      });
      result(null, { id: id, ...dados });
    }
  );
};

Autocarro.remove = (id, result) => {
  conexao.query("DELETE FROM autocarro WHERE id_autocarro=?", id, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ result: "não encontrado" }, null);
      return;
    }

    console.log(
      "DEBUG > SUCCESS > Autocarro removido com sucesso! [ID: ",
      id,
      "]"
    );
    result(null, res);
  });
};

module.exports = Autocarro;
