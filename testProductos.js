import { database } from './src/controllers/Database.js'; // Asegúrate de que la ruta es correcta

(async () => {
    try {
        await database.connect();  // Conecta a la base de datos
        console.log('Conexión exitosa a la base de datos');
        
        // Prueba realizar una consulta para verificar la conexión
        const rows = await database.query('SELECT 1 + 1 AS resultado');
        console.log('Resultado de la consulta:', rows);
    } catch (error) {
        console.error('Error en la conexión o consulta:', error);
    }
})();
