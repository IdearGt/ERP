const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

const indexRoutes = require('./routes/index');
const busesRoutes = require('./routes/buses');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(cors());
app.use(express.json()); //Se incluye el body parser
app.use(express.urlencoded({extended:false})); //Para tener datos desde la URL

//rutas
app.use(indexRoutes);
app.use('/api',busesRoutes);

app.listen(app.get('port'), () => {
    console.log('Corriendo en el puerto ', app.get('port'))
})