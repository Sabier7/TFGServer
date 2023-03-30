import Express from 'express';

//import mysql from 'mysql';

//al tratarse de un archivo propio se pone delante ./ y el nombre del archivo
import {pool} from './db.js';
// puedo crear una variable clientes y pasarle una ruta para usar posteriormente 
import Clientes from './routes/action.routs.js';
import InfoDB from './routes/server.routes.js';

const app = Express();
const port =  3000;
//esta linea declara lo que usare para acceder a emplados una ves indicada la ruta de donde esta clientes
app.use(Clientes)

app.use(InfoDB)
// Iniciar el servidor
app.listen(port)

