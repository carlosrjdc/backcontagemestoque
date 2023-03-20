const db = require("../models");
const excelToJson = require("convert-excel-to-json");
require("dotenv").config();
const { Op } = require("sequelize");

const material = db.Material;

class EnderecoController {
  //CADASTRO DE USUARIO
  static InputEmMassaSku = async (req, res) => {
    const result = excelToJson({
      source: req.file.buffer,
      columnToKey: {
        A: "Sku",
        B: "Descricao",
        C: "Familia1",
        D: "Familia2",
        E: "Familia",
        F: "UnidadesCaixa",
        G: "PesoCaixa",
        H: "AlturaCaixa",
        I: "ComprimentoCaixa",
        J: "CaixasPorCamada",
        K: "CamadaPorPallet",
        L: "DiasValidade",
        M: "PesoPallet",
        N: "AlturaPallet",
        O: "EAN14CX",
        P: "EAN13KG",
        Q: "Hierarquia",
      },
      sheets: "SKU",
    });

    result.SKU.shift();
    try {
      const registro = await material.bulkCreate(result.SKU);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
  static buscarItem = async (req, res) => {
    try {
      const registro = await material.findAll({
        where: {
          [Op.or]: [
            {
              Sku: req.params.id,
            },
            {
              EAN14CX: req.params.id,
            },
            {
              EAN13KG: req.params.id,
            },
          ],
        },
      });
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
