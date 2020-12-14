const router = require('express').Router();
const userController = require('../../controllers/UserController.js');
const User = require('../../models');
const bcrypt = require('bcryptjs')

router.get('/', async(req, res)=>{
    const user = await User.findAll();
    res.status(200).json(user);
})

router.post('/signin', userController.signin); //El resto esta en un controlador

module.exports = router;