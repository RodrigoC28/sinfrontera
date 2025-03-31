// aula 8 e 9

const conexao = require('./conexao.db');

const ViagemUtilizador = function (dados) {
  (this.id_viagem = dados.id_viagem),
    (this.id_utilizador = dados.id_utilizador),
    (this.mtd_pagamento = dados.mtd_pagamento),
    (this.n_passageiros = dados.n_passageiros);
};

ViagemUtilizador.create = (dados, result) => {
  conexao.query("INSERT INTO viagem_utilizador SET ?", dados, (error, res) => {
    if (error) {
      console.error("DEBUG > ERROR - " + error.message);
      result(error, null);
      return;
    }
    result(null, { id: res.insertId, ...dados });
  });
};

ViagemUtilizador.getTripsByUserId = (id, result) => {
  const query = `
    SELECT v.id_viagem, v.origem, v.destino, v.data, v.hora_partida, v.hora_chegada, v.preco, 
           vu.mtd_pagamento, vu.n_passageiros, vu.dta_registo,
           a.id_autocarro,
           GROUP_CONCAT(DISTINCT p.paragem_nome ORDER BY p.hora_paragem ASC) AS paragens
    FROM viagem_utilizador vu
    JOIN viagem v ON vu.id_viagem = v.id_viagem
    LEFT JOIN viagem_paragem vp ON v.id_viagem = vp.id_viagem
    LEFT JOIN paragem p ON vp.id_paragem = p.id_paragem
    LEFT JOIN autocarro a ON v.id_viagem = a.id_viagem
    WHERE vu.id_utilizador = ?
    GROUP BY v.id_viagem
    ORDER BY vu.dta_registo DESC
  `;

  conexao.query(query, id, (error, res) => {
    if (error) {
      console.error("Erro ao encontrar viagens do utilizador:", error.message);
      result(error, null);
      return;
    }

    result(null, res);
  });
};

ViagemUtilizador.getTripsByUserIdAndTripId = (id_viagem, id_utilizador, result) => {
  const query = `
    SELECT v.id_viagem, v.origem, v.destino, v.preco, 
           vu.mtd_pagamento, vu.n_passageiros, vu.dta_registo
    FROM viagem_utilizador vu
    JOIN viagem v ON vu.id_viagem = v.id_viagem
    WHERE vu.id_utilizador = ? AND vu.id_viagem = ?
  `;

  conexao.query(query, [id_utilizador, id_viagem], (error, res) => {
    if (error) {
      console.error("Erro ao encontrar viagens do utilizador:", error.message);
      result(error, null);
      return;
    }

    result(null, res);
  });
};

module.exports = ViagemUtilizador;