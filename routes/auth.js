/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router(); 

//Crear usuario
router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 12 caracteres').isLength({ min: 12 }),
        validarCampos
    ],
    crearUsuario 
);

//Login usuario
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 12 }),
        validarCampos
    ],
    loginUsuario 
);

//Revalidar token
router.get('/renew', validarJWT ,revalidarToken );




module.exports = router;