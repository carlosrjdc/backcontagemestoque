const db = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const demandaConferente = db.DemandaConferente;

class EnderecoController {
  //CADASTRO DE USUARIO
  static cadastrarDemanda = async (req, res) => {
    try {
      const registro = await demandaConferente.create(req.body);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };

  static buscarDemandas = async (req, res) => {
    const { conferente, status } = req.params;
    try {
      const registro = await demandaConferente.findAll({
        where: {
          [Op.and]: [{ conferenteId: conferente }, { Status: status }],
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
