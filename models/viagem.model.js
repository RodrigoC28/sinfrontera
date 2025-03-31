// aula 8 e 9

const conexao = require("./conexao.db");

const Viagem = function (dados) {
  (this.id_viagem = dados.id_viagem),
    (this.origem = dados.origem),
    (this.destino = dados.destino),
    (this.data = dados.data),
    (this.hora_partida = dados.hora_partida),
    (this.hora_chegada = dados.hora_chegada),
    (this.capacidade = dados.capacidade),
    (this.preco = dados.preco);
};

Viagem.create = (dados, result) => {
  conexao.query("INSERT INTO viagem SET ?", dados, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - " + error.message);
      result(error, null);
      return;
    }

    result(null, { id: res.insertId, ...dados });
  });
};

Viagem.getAll = (result) => {
  conexao.query("SELECT * FROM viagem", (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    console.log("DEBUG > SUCCESS > Viagem: ", res);
    result(null, res);
  });
};

Viagem.getAvailableTripsWithStops = (origem, destino, data, result) => {
    const query = `
      SELECT 
        v.id_viagem, v.origem, v.destino, v.data, v.hora_partida, v.hora_chegada, v.capacidade, v.preco,
        IFNULL(SUM(vu.n_passageiros), 0) AS passageiros_reservados,
        GROUP_CONCAT(DISTINCT p.paragem_nome ORDER BY p.hora_paragem ASC) AS paragens
      FROM viagem v
      LEFT JOIN viagem_utilizador vu ON v.id_viagem = vu.id_viagem
      LEFT JOIN viagem_paragem vp ON v.id_viagem = vp.id_viagem
      LEFT JOIN paragem p ON vp.id_paragem = p.id_paragem
      WHERE 
        v.origem = ? AND 
        v.destino = ? AND 
        DATE(v.data) = ?
      GROUP BY v.id_viagem
      HAVING (v.capacidade - passageiros_reservados) > 0;
    `;
  
    conexao.query(query, [origem, destino, data], (error, res) => {
      if (error) {
        console.error("DEBUG > ERROR - ", error.message);
        result(error, null);
        return;
      }

      console.log("DEBUG > SUCCESS > viagens: ", res)
      result(null, res);
    });
};

Viagem.findById = (id, result) => {
  conexao.query("SELECT * FROM viagem WHERE id_viagem = ?", id, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - ", error.message);
      result(error, null);
      return;
    }

    if (res.length > 0) {
      console.log("Viagem encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ result: "Viagem não encontrada" }, null);
  });
};

Viagem.update = (id, dados, result) => {
  conexao.query(
    "UPDATE viagem SET origem=?, destino=?, data=?, hora_partida=?, hora_chegada=?, capacidade=?, preco=? WHERE id_viagem=?",
    [
      dados.origem,
      dados.destino,
      dados.data,
      dados.hora_partida,
      dados.hora_chegada,
      dados.capacidade,
      dados.preco,
      dados.id_viagem
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

      console.log("DEBUG > SUCCESS > Viagem atualizada: ", {
        id: id,
        ...dados,
      });
      result(null, { id: id, ...dados });
    }
  );
};

Viagem.remove = (id, result) => {
  conexao.query("DELETE FROM viagem WHERE id_viagem=?", id, (error, res) => {
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
      "DEBUG > SUCCESS > Viagem removida com sucesso! [ID: ",
      id,
      "]"
    );
    result(null, res);
  });
};

module.exports = Viagem;