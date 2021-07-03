import app from './app';
const cors = require('cors');

// Conf
app.set('port', process.env.PORT || 3000);
app.use(cors());

// Rutas

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server activo en el puerto: ', app.get('port'));
});