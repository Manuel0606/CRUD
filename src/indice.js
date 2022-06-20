// se incluye el modulo body-parser
const bodyParser = require('body-parser');
// se incluye el modulo express
const express = require('express');
// se crea un objeto del modulo express
const puerto = express();
  
const exphbs = require('express-handlebars');
// se incluye el modulo path 
const path = require('path');
// llama el archivo database
require('./database');
// Vamos a configurar el puerto
puerto.set('escuchar', 6191);


puerto.use(express.json());
puerto.use(bodyParser.json());
puerto.use(bodyParser.urlencoded({extended:true}));
// LLama los archivos de la carpeta public
puerto.use(express.static('public')); 

// Aquí configurando el engine
puerto.set('views', path.join(__dirname, 'vistas')); 

// Configura el engine
puerto.engine(
    "hbs",
    exphbs.engine({
        extname: "hbs",
        defaultLayout: false,
        layoutsDir: "views/layouts/"
    })
);

puerto.set('view engine', '.hbs');
// son dos clases de puertos fisicos(de la maquina) y lógicos (de la red)
// => para definir una función
puerto.listen(puerto.get('escuchar'),() => {
    console.log('servidor conectado', puerto.get('escuchar'));
});

// llama el index
puerto.use(require('./rutas/index'));