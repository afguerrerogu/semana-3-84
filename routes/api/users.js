const router = require('express').Router();
const userController = require('../../controller/Controller.js');
//const auth = require('../../middlewares/auth')


//  api/auth
router.post('/signin', userController.signin); // Vamos a realizar utilizando los controllers


router.post('/register', userController.register); //,auth.verificarAdministrador
router.get('/list', userController.list); //
router.put('/update', userController.update); //

module.exports = router;