const db = require("../models");
require("dotenv").config();

const inventario = db.Inventario;

class EnderecoController {
  //CADASTRO DE USUARIO
  static cadastrarInventario = async (req, res) => {
    try {
      const registro = await inventario.create(req.body);
      res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  };
}

module.exports = EnderecoController;
