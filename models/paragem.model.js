//aula 8 e 9 

const conexao = require("./conexao.db");

const Paragem = function (dados) {
  (this.id_paragem  = dados.id_paragem ),
    (this.paragem_nome = dados.paragem_nome),
    (this.hora_paragem = dados.hora_paragem);
};

Paragem.create = (dados, result) => {
  conexao.query("INSERT INTO paragem SET ?", dados, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - " + error.message);
      result(error, null);
      return;
    }

    result(null, { id: res.insertId, ...dados });
  });
};

Paragem.getAll = (result) => {
  conexao.query("SELECT * FROM paragem", (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    console.log("DEBUG > SUCCESS > Paragens: ", res);
    result(null, res);
  });
};

Paragem.findById = (id, result) => {
  conexao.query("SELECT * FROM paragem WHERE id_paragem = ?", id, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    if (res.length > 0) {
      console.log("Paragem encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ result: "Paragem não encontrado" }, null);
  });
};

Paragem.update = (id, dados, result) => {
  conexao.query(
    "UPDATE paragem SET paragem_nome=?, hora_paragem=? WHERE id_paragem=?",
    [
      dados.paragem_nome,
      dados.hora_paragem,
      dados.id_paragem
    ],
    (error, res) => {
      if (error) {
        console.error("DEBUG > ERROR - ", error.message);
        result(error, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ result: "não encontrada" }, null);
        return;
      }

      console.log("DEBUG > SUCCESS > Paragem atualizada: ", {
        id: id,
        ...dados,
      });
      result(null, { id: id, ...dados });
    }
  );
};

Paragem.remove = (id, result) => {
  conexao.query("DELETE FROM paragem WHERE id_paragem=?", id, (error, res) => {
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
      "DEBUG > SUCCESS > Paragem removida com sucesso! [ID: ",
      id,
      "]"
    );
    result(null, res);
  });
};

module.exports = Paragem;