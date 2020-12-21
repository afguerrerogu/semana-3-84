const config = require('../secret/config.js');
const userdb = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const tokenServ = require('../services/token');

exports.signin = async(req, res, next) => { //El next lo utilizamos para que no se nos pegue cumpla o no cumpla
    try{
        const user = await userdb.user.findOne({where: {email: req.body.email}})  //Ponemos una consulta que seria el where   en donde miramos si el usuario existe en la base de datos
                    // La consulta es, en la base de datos el campo se llama email, que me coincida con el el que viene en el body que tambien se llama email
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password , user.password);  // Validamos que el usuario al ingresar la contraseña sea igual a la almacenada encriptada
                                            // bcrypt.compareSync recibe primer argumento contraseña sin encriptar y el segundo contraseña encriptada
            if(passwordIsValid){
                const token = await tokenServ.encode(user);
                res.status(200).send({  // Respuesta 200 satisfactoria, enviamos lo que queramos para el front
                    accessToken: token,
                    auth: true,
                    //tokenReturn: token  //tokenReturn tiene el mismo nombre que le pusimos al front en donde tomamos el token
                    //user: user   // No seria necesario porque en el token ya lo tenemos pero en el front lo configuramos asi
                })
            }else{
                res.status(401).json({  // Error 401 ingreso mal la autenticación
                    error: 'Error en el usuario o contraseña A'  // Ponemos un error generico para no dar tips si el usuario ya existe
                })
            }
        }else{
            res.status(404).json({
                error: 'Error en el usuario o contraseña B'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->' + error  // Error 500 es que no se pudo conectar al servidor
        })
        next(error);  // Si no colocamos el next se bloquea si tiene error
    }
};

exports.register = async(req, res, next) => {
    try{
        const user = await userdb.user.findOne({where: {email: req.body.email}})
        if(user){
            res.status(409).send({
                message: 'Usuario existente'
            })
        }else{
            req.body.password = await bcrypt.hashSync(req.body.password, 10);
            const user = await userdb.user.create(req.body);
            res.status(200).json(user);
        }

    }catch (error){
        res.status(500).send({
            message: 'Error en el ingreso'
        })
        next(error);
    }
};

exports.list = async(req, res, next) => {
    try{
        const user = await userdb.user.findAll();
        res.status(200).json(user)
    }catch{
        res.status(500).send({
            message: 'Error en el ingreso'
        })
        next(error);
    }
};

exports.update = async(req, res, next) =>{
    try{
        const user = await userdb.user.findOne({where: {email: req.body.email}})
        if(user){
            const user = await userdb.user.update({username: req.body.username},
                {
                where: {
                    email: req.body.email
                },
            });
            res.status(200),json(user);
        }else{
            res.status(404).send({
                message: 'Usuario no encontrado'
            })
        }
    }catch (error){
        res.status(500).send({ 
            message: 'Error en el ingreso'
        })
        next(error);
    }
};