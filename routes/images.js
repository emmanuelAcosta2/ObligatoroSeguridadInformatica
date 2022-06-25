/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getImageAdmin, getImageStudent,
} = require("../controllers/images");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/image-admin", validarJWT, getImageAdmin);
router.get("/image-student", validarJWT, getImageStudent);



module.exports = router;
