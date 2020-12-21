const express = require('express');
const corsP = require('cors');
const morgan = require('morgan');
const apiRouter = require('./routes');
const bodyParse = require('body-parser');


// Instancia de express en mi app
const app = express();
app.use(corsP());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods: GET, POST, PUT');
    next();
});


// Middleware morgan para detectar peticiones
app.use(morgan('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }))


// Primera ruta. Nuestro manejador. Todos los manejadores van con este formato y orden
app.use('/api', apiRouter)

app.get('/', (req, res) =>{
    console.log("Estructura base");
    res.send("Estructura base")
})

app.set('PORT', process.env.PORT || 3000);





// API ENDPOINTS

app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

module.exports = app;