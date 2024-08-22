// Autor: Jonatan David Vargas Revollo
// Fecha:
// Copyrigh (c) 2023

import Express from 'express';

//import mysql from 'mysql';

//al tratarse de un archivo propio se pone delante ./ y el nombre del archivo
import { database } from './controllers/Database.js';
// puedo crear una variable clientes y pasarle una ruta para usar posteriormente 
import Clientes from './routes/action.routs.js';
import InfoDB from './routes/server.routes.js';

class Server
{ 
    async start(port)
  {
    // Deberías usar try-catch para manejar errores
    try {
      log.info("Connecting to database...");
      
      // Espera a que la conexión a la base de datos se complete antes de continuar
      await database.connect();

      log.info("Starting server...");
      await this.startServer(port);
    } 
    catch (error) {
      // Maneja cualquier error que ocurra durante la conexión o el inicio del servidor
      log.error("Error starting server:", error);
    }
  }

    async connectDatabase ()
    {
    }

    async startServer (port)
    {
        const app = Express();
        
        //esta linea declara lo que usare para acceder a emplados una ves indicada la ruta de donde esta clientes
        app.use (Clientes)

        app.use (InfoDB)

        app.listen(port, () => {
            log.info(`Server is running on port ${port}`);
          });

        app.use((err, req, res, next) => {
            log.error("Server error:", err);
            res.status(500).json({ error: 'Internal server error' });
          });
    }
}

export const server = new Server()
