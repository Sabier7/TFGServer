import Express from 'express';
//import mysql from 'mysql';

//al tratarse de un archivo propio se pone delante ./ y el nombre del archivo
import {pool} from './db.js';

const app = Express();
const port =  3000;

//const db = mysql.createConnection({
 // host: 'localhost',
  //user: 'root',
  //password: 'DBlutomavar1',
  //database: 'mi_basededatos',
//});

//db.connect((err) => {
 // if (err) throw err;
//  console.log('Conectado a la base de datos');
//});

// Configurar el servidor
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});
app.get('/ping', async (req, res) => {
 const [result] = await pool.query('SELECT 1 + 1 AS result')
  res.json(result[0])
});
// Iniciar el servidor
app.listen(port)

