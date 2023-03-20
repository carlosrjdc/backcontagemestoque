const { Model } = require("sequelize");
const db = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const contagem = db.Contagem;

class EnderecoController {
  //CADASTRO DE USUARIO
  static cadastrarumacontagem = async (req, res) => {
    try {
      const registro = await contagem.create(req.body);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static atualizarRegistro = async (req, res) => {
    try {
      const registro = await contagem.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarContagemConferente = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        where: { demandaContagemId: req.params.id },
        attributes: { exclude: ["contagemId"] },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarContagemConferenteEmAberto = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        where: {
          [Op.and]: [
            { demandaContagemId: req.params.id },
            {
              Quantidade: {
                [Op.is]: null,
              },
            },
          ],
        },
        attributes: { exclude: ["contagemId"] },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarRegistros = async (req, res) => {
    try {
      const registro = await contagem.findAll({
        attributes: ["id"],
        include: [
          { model: db.User, as: "userContagem" },
          { model: db.Inventario, as: "inventarioContagem" },
          { model: db.DemandaConferente, as: "inventarioDemandaContagem" },
          { model: db.Material, as: "skuContagem" },
        ],
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static cadastrarContagem = async (req, res) => {
    try {
      const registro = await db.Endereco.findAll({
        where: req.body,
      });
      const registroNovo = [];
      registro.map((item) => {
        registroNovo.push({
          inventarioContagemId: req.params.id,
          demandaContagemId: req.params.demanda,
          userContagemId: req.params.conferente,
          enderecoId: item.id,
          Zona: item.zona,
          Corredor: item.corredor,
          Predio: item.predio,
          Nivel: item.nivel,
          Endereco: item.Enderecos,
        });
      });

      const criarRegistros = await contagem.bulkCreate(registroNovo);

      res.status(200).json(criarRegistros);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
