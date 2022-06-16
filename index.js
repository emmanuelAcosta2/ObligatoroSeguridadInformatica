const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

// Create a new express application instance

const app = express();

    // Exprees will serve up production assets
    app.use(express.static('./ProyectoGestionGanadera/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    



//base de datos
dbConnection();

//app.get('/', (req, res) => {
//    res.json({
//        ok: true,
//    })
//});


app.use(cors());



//Lectura y parseo del body
app.use(express.json()); 

app.use('/api/auth',require('./routes/auth'));

//app.use('/api/unidadesGanaderas',require('./routes/unidadesGanaderas'));

//app.use('/api/lotesGanaderos',require('./routes/LoteGanadero')); 


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'obligatorio-seguridad-front', 'build', 'index.html'));
  });


// Listen for requests

app.listen(process.env.PORT, () => {
    console.log(  `Example app listening on port ${process.env.PORT}!`);
});

