// aula 8 e 9

const conexao = require("./conexao.db");

const ViagemParagem = function (dados) {
    (this.id_viagem = dados.id_viagem),
    (this.id_paragem = dados.id_paragem);
};

ViagemParagem.create = (dados, result) => {
  conexao.query("INSERT INTO viagem_paragem SET ?", dados, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - " + error.message + dados);
      result(error, null);
      return;
    }

    result(null, { id: res.insertId, ...dados });
  });
};

ViagemParagem.getAll = (result) => {
    const query = `
        SELECT v.origem AS viagem_origem, v.destino AS viagem_destino,
               p.paragem_nome, vp.id_viagem, vp.id_paragem, vp.dta_registo, vp.dta_atualizacao
        FROM viagem_paragem vp
        JOIN viagem v ON vp.id_viagem = v.id_viagem
        JOIN paragem p ON vp.id_paragem = p.id_paragem
    `;
    conexao.query(query, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    console.log("DEBUG > SUCCESS > Viagem e Paragem: ", res);
    result(null, res);
  });
};

ViagemParagem.remove = (id_viagem, id_paragem, result) => {
  conexao.query("DELETE FROM viagem_paragem WHERE id_viagem = ? AND id_paragem = ?", [id_viagem, id_paragem], (error, res) => {
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
      "DEBUG > SUCCESS > Viagem e Paragem removidas com sucesso! [ID: ",
      [id_viagem, id_paragem],
      "]"
    );
    result(null, res);
  });
};

module.exports = ViagemParagem;