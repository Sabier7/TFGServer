import {createPool} from 'mysql2/promise'
// se pone mysql2/promise por que a la hora de ejecutarlo lo hicimos asincrono y necesita que sea una promesa el sigiuente codigo en erver.js

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'DBlutomavar1',
  database: 'mi_basededatos',
  port: 3306
});
//module.exports =pool;