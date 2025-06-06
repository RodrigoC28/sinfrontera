const Viagem = require("../models/viagem.model");
const Autocarro = require("../models/autocarro.model");
const Paragem = require("../models/paragem.model");
const Utilizador = require("../models/utilizador.model");
const Condutor = require("../models/condutor.model");
const ViagemParagem = require("../models/destinos.model");
const ViagemUtilizador = require("../models/venda.model");


const viagemController = {};

viagemController.createViagem = async (req, res) => {
  const { id_autocarro, data, hora_partida, hora_chegada, preco } = req.body;
  try {
    const dados = await Viagem.create({
      id_autocarro, data, hora_partida, hora_chegada, preco,
    });
    res.status(201).json({
      status: "success",
      message: "Viagem criada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar a viagem.",
      data: null,
    });
  }
};

viagemController.getAllViagens = async (req, res) => {
  try {
    const dados = await Viagem.findAll({
      include: [
        { model: Autocarro, as: "autocarro" },
        {
          model: Paragem,
          as: "paragens",
          through: { attributes: ['hora'] } // Include 'hora' from ViagemParagem
        },
      ],
      order: [['data', 'ASC'], ['hora_partida', 'ASC']]
    });
    res.status(200).json({
      status: "success",
      message: "Lista de viagens obtida com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter as viagens.",
      data: null,
    });
  }
};

// Obter uma viagem por ID
viagemController.getViagemById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Viagem.findOne({ where: { id_viagem: id } },
      {
        include: [
          { model: Autocarro, as: "autocarro" },
          {
            model: Paragem,
            as: "paragens",
            through: { attributes: ['hora'] }
          },
          {
            model: Utilizador,
            as: "utilizadoresReservados",
            attributes: { exclude: ['password'] },
            through: { attributes: ['mtd_pagamento', 'desconto', 'n_passageiros'] }
          }
        ],
      });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Viagem não encontrada.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Viagem encontrada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter a viagem.",
      data: null,
    });
  }
};

// Atualizar uma viagem
viagemController.updateViagem = async (req, res) => {
  const { id } = req.params;
  const { id_autocarro, data, hora_partida, hora_chegada, preco } = req.body;

  try {
    const dados = await Viagem.update(
      {
        id_autocarro: id_autocarro,
        data: data,
        hora_partida: hora_partida,
        hora_chegada: hora_chegada,
        preco: preco
      },
      {
        where: { id_viagem: id }
      }
    );

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Viagem não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Viagem atualizada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar a viagem.",
      data: null,
    });
  }
};

// Apagar uma viagem
viagemController.deleteViagem = async (req, res) => {
  const { id } = req.params;
  try {

    await Condutor.destroy({ where: { id_viagem: id } });
    await ViagemParagem.destroy({ where: { id_viagem: id } });

    const dados = await Viagem.destroy({ where: { id_viagem: id } });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Viagem não encontrada.",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Viagem eliminada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao eliminar viagem.",
      data: null,
    });
  }
};

viagemController.procurarViagensDisponiveis = async (req, res) => {
  const { origem, destino, data, passageiros } = req.query;
  try {
    const paragemOrigem = await Paragem.findOne({ where: { nome: origem } });
    const paragemDestino = await Paragem.findOne({ where: { nome: destino } });

    const viagensNaData = await Viagem.findAll({
      where: { data: data },
      include: [
        {
          model: Autocarro,
          as: 'autocarro',
          attributes: ['id_autocarro', 'matricula', 'capacidade'],
          required: true
        },
        {
          model: Paragem,
          as: 'paragens',
          attributes: ['id_paragem', 'nome'],
          through: {
            model: ViagemParagem,
            as: 'detalhesParagem',
            attributes: ['hora'],
          },
        }
      ],
      order: [['hora_partida', 'ASC']]
    });

    if (viagensNaData.length === 0) {
      return res.status(200).json({ status: "success", message: "Nenhuma viagem encontrada para esta data.", data: [] });
    }

    const dados = [];

    for (const viagem of viagensNaData) {
      if (!viagem.autocarro || !viagem.paragens || viagem.paragens.length < 2) continue;

      let indiceOrigem = -1;
      let indiceDestino = -1;
      let horaOrigem = null;
      let horaDestino = null;

      const paragensOrdenadas = [...viagem.paragens]
        .filter(p => p.detalhesParagem && p.detalhesParagem.hora)
        .sort((a, b) => {
          return a.detalhesParagem.hora.localeCompare(b.detalhesParagem.hora);
        });

      for (let i = 0; i < paragensOrdenadas.length; i++) {
        if (paragensOrdenadas[i].id_paragem === paragemOrigem.id_paragem) {
          indiceOrigem = i;
          horaOrigem = paragensOrdenadas[i].detalhesParagem.hora;
        }
        if (paragensOrdenadas[i].id_paragem === paragemDestino.id_paragem) {
          indiceDestino = i;
          horaDestino = paragensOrdenadas[i].detalhesParagem.hora;
        }
      }

      if (indiceOrigem !== -1 && indiceDestino !== -1 && indiceOrigem < indiceDestino) {
        const totalReservas = await ViagemUtilizador.sum('n_passageiros', {
          where: { id_viagem: viagem.id_viagem }
        });
        const lugaresOcupados = totalReservas || 0;
        const lugaresDisponiveisNoAutocarro = viagem.autocarro.capacidade - lugaresOcupados;

        if (lugaresDisponiveisNoAutocarro >= passageiros) {
          dados.push({
            id_viagem: viagem.id_viagem,
            data_viagem: viagem.data,
            hora_partida_efetiva: horaOrigem,
            hora_chegada_efetiva: horaDestino,
            preco_viagem: parseFloat(viagem.preco).toFixed(2),
            autocarro: {
              matricula: viagem.autocarro.matricula,
              capacidade_total: viagem.autocarro.capacidade,
            },
            lugares_disponiveis_na_viagem: lugaresDisponiveisNoAutocarro,
            paragens_da_rota_completa: paragensOrdenadas.map(p => ({
              nome: p.nome,
              hora: p.detalhesParagem.hora
            }))
          });
        }
      }
    }

    if (dados.length === 0) {
      return res.status(200).json({ status: "success", message: "Nenhuma viagem disponível para os critérios e rota selecionados.", data: [] });
    }

    res.status(200).json({
      status: "success",
      message: "Viagens disponíveis encontradas.",
      data: dados
    });

  } catch (error) {
    console.error("Erro ao procurar viagens disponíveis:", error);
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao procurar viagens.",
      data: null,
    });
  }
};

viagemController.addUtilizadorToViagem = async (req, res) => {
  const { id_viagem, id_utilizador } = req.params;
  const { mtd_pagamento, desconto, n_passageiros } = req.body;

  try {

    const dados = await ViagemUtilizador.create({ id_viagem, id_utilizador, mtd_pagamento, desconto, n_passageiros });
    res.status(201).json({
      status: "success",
      message: "Viagem comprada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao comprar viagem.",
      data: null,
    });
  }
};

viagemController.getMinhasReservas = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await ViagemUtilizador.findAll({
      where: { id_utilizador: id },
      include: [
        {
          model: Viagem,
          as: 'viagem',
          include: [
            { model: Autocarro, as: 'autocarro' },
            {
              model: Paragem,
              as: 'paragens',
              through: { model: ViagemParagem, as: 'detalhesParagem', attributes: ['hora'] }
            }
          ]
        }
      ],
      order: [
        [{ model: Viagem, as: 'viagem' }, 'data', 'DESC']
      ]
    });

    res.status(200).json({
      status: "success",
      message: "Lista de reservas obtida com sucesso.",
      data: dados,
    });
  } catch (error) {
    console.error("Erro ao obter as minhas reservas:", error);
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao obter as suas reservas.",
      data: null,
    });
  }
};

viagemController.deleteReserva = async (req, res) => {
    const { id_viagem, id_utilizador } = req.params;
    try {

        const dados = await ViagemUtilizador.destroy({ where: { id_viagem, id_utilizador } });

        res.status(204).json({
            status: "success",
            message: "Destino removido com sucesso.",
            data: dados,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Erro ao remover destino.",
            data: null,
        });
    }
};

module.exports = viagemController;