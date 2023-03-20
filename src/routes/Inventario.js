const express = require("express");
const invntarioController = require("../../controllers/InventariosController.js");

const router = express.Router();

router.post("/newinventario", invntarioController.cadastrarInventario);

module.exports = router;
