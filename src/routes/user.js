const express = require("express");
const autenticar = require("../../controllers/auth.js");
const userController = require("../../controllers/UserController.js");

const router = express.Router();

router.post("/user/newuser", userController.criarUsuario);
router.post("/user/auth", userController.autenticarUsuario);

module.exports = router;
