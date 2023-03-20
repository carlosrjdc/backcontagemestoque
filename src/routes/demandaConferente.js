const express = require("express");
const demandaConferenteController = require("../../controllers/DemandaConferenteController.js");

const router = express.Router();

router.post("/newdemanda", demandaConferenteController.cadastrarDemanda);
router.get(
  "/buscardemandas/:conferente/:status",
  demandaConferenteController.buscarDemandas
);

module.exports = router;