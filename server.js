/*en caso de  hacer uso con el directorio controlador se 
debe importar como se observa en la siguiente linea, con el nombre del archivo js
que contiene la logica */
//const controller = require('./controller/nombredelcontrollador.js');
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes');
//const db = require('./models');
const cors = require('cors');
const bodyPArser = require('body-parser');

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods: GTE, POST, PUT, DELETE')
    next();
});

//app.get('/api', (req,res) => {
//    res.send('hello');
//});
app.get('/api', apiRouter);

app.use(morgan('dev'))
app.use(bodyPArser.json())
app.use(bodyPArser.urlencoded({ extended: true }));

// API ENDPOINTS
/*se debe contar un una ruta por medio de método post para el inicio de sesión de la siguiente manera:
'/api/auth/signin'
*/
app.set('PORT', process.env.PORT || 3000);

app.get('/', function(req, res) {
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:3000`)
})

module.exports = app;