var jwt = require('jsonwebtoken');
const models = require('../models');

// Metodos que no necesitamos exportar sino seran consumidos internamente
const checkout = async (token) =>{  // tenemos que validar porque el token puede estar vencido
    let localID = null;
    try {
        const {id} = token.decode(token);
        localID = id
    } catch (error) {
        
    }
    const user = await models.Usuario.findOne({where:{
        id: id,
        estado: true
    }});
    if(user){
        const token = this.encode(user);
        return{
            token,
            rol: user.rol
        }
    }else{
        return false;
    }
}

// Metodos que necesitamos exportar
module.exports = {
    encode: async(user)=>{  // El token nos llega por el usuario eso es lo que necesitamos codificar
        const token = jwt.sign({  // La firma del token compuesto por todos los elementos que queramos que desde el front se conozcan del usuario
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol,
            estado: user.estado
        },"claveGrupo84",{ // La llave secreta, con esta es que el front va a poder decodificar el token. Sin el no podria entender el token dado que le llega
                                // codificado con letras y numeros
            expiresIn: 86400  // Le incluimos el tiempo en el que expira el token, va en segundo (86400 es todo el dia)
        }
        );

        return token;
    },
    decode: async(token)=>{  // Cuando queremos decodificar, decodificamos el token
        try{
            // const { id , name , email }    si necesitaramos mas información lo podemos hacer de esta manera
            const { id } = await jwt.verify(token, "claveGrupo84" )  // jwt.verify  requiere el token y la clase secreta dada para decodificar el token claveGrupo84
            const user = await models.Usuario.findOne({where:{
                id: id,
                estado: true
            }});
            if(user){
                return user;
            }else{
                return false;
            }
        }catch{

        }
    }
}
