// aula 8 e 9

const conexao = require("./conexao.db");

const Utilizador = function (dados) {
  (this.id_utilizador = dados.id_utilizador),
    (this.nome = dados.nome),
    (this.sobrenome = dados.sobrenome),
    (this.email = dados.email),
    (this.password = dados.password),
    (this.telemovel = dados.telemovel),
    (this.tipo_utilizador = dados.tipo_utilizador || 'cliente');
};

Utilizador.create = (dados, result) => {
  conexao.query("INSERT INTO utilizador SET ?", dados, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - " + error.message);
      result(error, null);
      return;
    }

    result(null, { id: res.insertId, ...dados });
  });
};

Utilizador.getAll = (result) => {
  conexao.query("SELECT * FROM utilizador", (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    console.log("DEBUG > SUCCESS > Utilizadores: ", res);
    result(null, res);
  });
};

Utilizador.findById = (id, result) => {
  conexao.query("SELECT * FROM utilizador WHERE id_utilizador = ?", id, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    if (res.length > 0) {
      console.log("Utilizador encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ result: "Utilizador não encontrado" }, null);
  });
};

Utilizador.findIfUserExists = (email, password, result) => {
  conexao.query("SELECT * FROM utilizador WHERE email=? AND password=?", [email, password], (error, res) => {
      if (error) {
        console.error("DEBUG > ERROR - ", error.message);
        result(error, null);
        return;
      }

      if (res.length > 0) {
        console.log("Utilizador encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ result: "não encontrado" }, null);
    }
  );
};

Utilizador.update = (id, dados, result) => {
  conexao.query(
    "UPDATE utilizador SET nome=?, sobrenome=?, email=?, password=?, telemovel=?, tipo_utilizador=? WHERE id_utilizador=?",
    [
      dados.nome,
      dados.sobrenome,
      dados.email,
      dados.password,
      dados.telemovel,
      dados.tipo_utilizador,
      dados.id_utilizador
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

      console.log("DEBUG > SUCCESS > Utilizador atualizado: ", {
        id: id,
        ...dados,
      });
      result(null, { id: id, ...dados });
    }
  );
};

Utilizador.remove = (id, result) => {
  conexao.query("DELETE FROM utilizador WHERE id_utilizador=?", id, (error, res) => {
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
      "DEBUG > SUCCESS > Utilizador removido com sucesso! [ID: ",
      id,
      "]"
    );
    result(null, res);
  });
};

module.exports = Utilizador;
